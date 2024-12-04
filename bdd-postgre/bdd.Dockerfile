FROM postgres:16-alpine

ENV PGDATA /data

RUN mkdir -p /data && chown -R postgres:postgres /data
USER postgres

COPY create-tables.sql /docker-entrypoint-initdb.d

EXPOSE 5432