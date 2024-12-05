FROM postgres:16-alpine

ENV PGDATA /var/lib/postgresql/data
ENV POSTGRES_USER admin          
ENV POSTGRES_PASSWORD mypassword
ENV POSTGRES_DB PLM


RUN mkdir -p /data && chown -R postgres:postgres /data
USER postgres
COPY create-tables.sql /docker-entrypoint-initdb.d
COPY data /data/

EXPOSE 5432
