FROM mysql:8.0

LABEL maintainer="portfolio-dev"
LABEL description="MySQL 8.0 database container for Portfolio project development"
LABEL version="1.0.0"

ENV MYSQL_ROOT_PASSWORD=rootpassword \
    MYSQL_DATABASE=portfolio \
    MYSQL_USER=user \
    MYSQL_PASSWORD=password \
    MYSQL_CHARSET=utf8mb4 \
    MYSQL_COLLATION=utf8mb4_unicode_ci \
    TZ=UTC

RUN mkdir -p /var/log/mysql && \
    chown -R mysql:mysql /var/log/mysql && \
    chmod 755 /var/log/mysql

COPY my.cnf /etc/mysql/conf.d/my.cnf
RUN chmod 644 /etc/mysql/conf.d/my.cnf

COPY init.sql /docker-entrypoint-initdb.d/01-init.sql
RUN chmod 644 /docker-entrypoint-initdb.d/01-init.sql

EXPOSE 3306

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD mysqladmin ping -h localhost -u root -p${MYSQL_ROOT_PASSWORD} --silent || exit 1
