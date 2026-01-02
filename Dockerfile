FROM debian:bullseye-slim AS build

ARG BUN_VERSION=latest

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

RUN apt-get update -qq \
    && apt-get install -qq --no-install-recommends \
      ca-certificates=20210119 \
      curl=7.74.0-1.3+deb11u15 \
      dirmngr=2.2.27-2+deb11u2 \
      gpg=2.2.27-2+deb11u2 \
      gpg-agent=2.2.27-2+deb11u2 \
      unzip=6.0-26+deb11u1 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && arch="$(dpkg --print-architecture)" \
    && case "${arch##*-}" in \
      amd64) build="x64-baseline";; \
      arm64) build="aarch64";; \
      *) echo "error: unsupported architecture: $arch"; exit 1 ;; \
    esac \
    && version="$BUN_VERSION" \
    && case "$version" in \
      latest | canary | bun-v*) tag="$version"; ;; \
      v*)                       tag="bun-$version"; ;; \
      *)                        tag="bun-v$version"; ;; \
    esac \
    && case "$tag" in \
      latest) release="latest/download"; ;; \
      *)      release="download/$tag"; ;; \
    esac \
    && curl "https://github.com/oven-sh/bun/releases/$release/bun-linux-$build.zip" \
      -fsSLO \
      --compressed \
      --retry 5 \
      || (echo "error: failed to download: $tag" && exit 1) \
    && gpg --batch --keyserver hkps://keys.openpgp.org --recv-keys "F3DCC08A8572C0749B3E18888EAB4D40A7B22B59" \
      || gpg --batch --keyserver keyserver.ubuntu.com --recv-keys "F3DCC08A8572C0749B3E18888EAB4D40A7B22B59" \
    && curl "https://github.com/oven-sh/bun/releases/$release/SHASUMS256.txt.asc" \
      -fsSLO \
      --compressed \
      --retry 5 \
    && gpg --batch --decrypt --output SHASUMS256.txt SHASUMS256.txt.asc \
      || (echo "error: failed to verify: $tag" && exit 1) \
    && grep " bun-linux-$build.zip\$" SHASUMS256.txt | sha256sum -c - \
      || (echo "error: failed to verify: $tag" && exit 1) \
    && unzip "bun-linux-$build.zip" \
    && mv "bun-linux-$build/bun" /usr/local/bin/bun \
    && rm -f "bun-linux-$build.zip" SHASUMS256.txt.asc SHASUMS256.txt \
    && chmod +x /usr/local/bin/bun \
    && which bun \
    && bun --version

FROM gcr.io/distroless/base-nossl-debian11:nonroot

ARG BUN_RUNTIME_TRANSPILER_CACHE_PATH=0
ENV BUN_RUNTIME_TRANSPILER_CACHE_PATH=${BUN_RUNTIME_TRANSPILER_CACHE_PATH}

ARG BUN_INSTALL_BIN=/usr/local/bin
ENV BUN_INSTALL_BIN=${BUN_INSTALL_BIN}

COPY --from=build /usr/local/bin/bun /usr/local/bin/

RUN --mount=type=bind,from=build,source=/usr/bin,target=/usr/bin \
    --mount=type=bind,from=build,source=/bin,target=/bin <<EOF
  ln -s /usr/local/bin/bun /usr/local/bin/bunx
  which bunx
EOF

ENTRYPOINT ["/usr/local/bin/bun"]
