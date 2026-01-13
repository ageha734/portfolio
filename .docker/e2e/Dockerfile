FROM mcr.microsoft.com/playwright:v1.57.0-noble

ARG BUN_VERSION=1.1.43

RUN apt-get update -qq \
    && apt-get install -qq --no-install-recommends \
      ca-certificates=20210119 \
      curl=7.74.0-1.3+deb11u15 \
      unzip=6.0-26+deb11u1 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && arch="$(dpkg --print-architecture)" \
    && case "${arch##*-}" in \
      amd64) build="x64-baseline";; \
      arm64) build="aarch64";; \
      *) echo "error: unsupported architecture: $arch"; exit 1 ;; \
    esac \
    && curl "https://github.com/oven-sh/bun/releases/download/bun-v${BUN_VERSION}/bun-linux-${build}.zip" \
      -fsSLO \
      --compressed \
      --retry 5 \
      || (echo "error: failed to download bun-v${BUN_VERSION}" && exit 1) \
    && unzip "bun-linux-${build}.zip" \
    && mv "bun-linux-${build}/bun" /usr/local/bin/bun \
    && rm -f "bun-linux-${build}.zip" \
    && chmod +x /usr/local/bin/bun \
    && bun --version

WORKDIR /work

ENV CI=true
ENV PORT=3000
ENV NODE_ENV=test

CMD ["bun", "run", "e2e:docker"]
