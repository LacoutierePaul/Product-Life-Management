FROM postgres:16-alpine

RUN mkdir -p /data && chown -R postgres:postgres /data

USER postgres
COPY create-tables.sql /docker-entrypoint-initdb.d
COPY data /data/

EXPOSE 5432
