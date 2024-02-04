FROM mongo:5.0.24

RUN apt update && apt install -y \
    vim \
    gosu

# Set timezone to est
RUN ln -fs /usr/share/zoneinfo/America/New_York /etc/localtime
RUN dpkg-reconfigure --frontend noninteractive tzdata

# Set permission on database and log directories
RUN chown -R mongodb:mongodb /var/log /data/db 

# Set build-time variables
ARG RATELIMIT_DB_NAME
ARG RATELIMIT_DB_USER
ARG RATELIMIT_DB_PASSWORD

# Initiate database
RUN echo "db.createCollection(\"$RATELIMIT_DB_NAME\");" >> /docker-entrypoint-initdb.d/init.js
RUN echo "db.${RATELIMIT_DB_NAME}.insert({address: \"TEST\"})" >> /docker-entrypoint-initdb.d/init.js
RUN echo "db.createUser({user: \"$RATELIMIT_DB_USER\", pwd: \"$RATELIMIT_DB_PASSWORD\", roles: [{role: \"readWrite\", db: \"$RATELIMIT_DB_NAME\"}]});" >> /docker-entrypoint-initdb.d/init.js

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]