FROM mysql:8.0

ENV MYSQL_ROOT_PASSWORD=rootpassword
ENV MYSQL_DATABASE=portfolio
ENV MYSQL_USER=user
ENV MYSQL_PASSWORD=password

COPY my.cnf /etc/mysql/conf.d/my.cnf

COPY init.sql /docker-entrypoint-initdb.d/init.sql

EXPOSE 3306

HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD mysqladmin ping -h localhost -u root -p${MYSQL_ROOT_PASSWORD} || exit 1
