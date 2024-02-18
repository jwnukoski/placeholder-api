FROM mongo:latest

RUN apt update && apt install -y \
    vim \
    gosu

# Set timezone to est
RUN ln -fs /usr/share/zoneinfo/America/New_York /etc/localtime
RUN dpkg-reconfigure --frontend noninteractive tzdata

# Set permission on database and log directories
RUN chown -R mongodb:mongodb /var/log /data/db 

# Set build-time variables
ARG RATELIMITS_DB_USER
ARG RATELIMITS_DB_PASSWORD

# Initiate database
COPY ./mongo-init.js /docker-entrypoint-initdb.d/mongo-init.js
RUN echo "\ndb.createUser({user: \"$RATELIMITS_DB_USER\", pwd: \"$RATELIMITS_DB_PASSWORD\", roles: [{role: \"readWrite\", db: \"ratelimits\"}]});" >> /docker-entrypoint-initdb.d/mongo-init.js

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]