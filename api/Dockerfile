FROM node:20.10.0
RUN apt update && apt install -y vim

# Set timezone to est
RUN ln -fs /usr/share/zoneinfo/America/New_York /etc/localtime
RUN dpkg-reconfigure --frontend noninteractive tzdata

# Copy API
RUN mkdir /usr/share/api
COPY ./api /usr/share/api
WORKDIR /usr/share/api

# Grab higher .env variables
RUN cat ./.env | grep RATELIMITS_DB_USER > ./.env
RUN echo "\n" >> ./.env
RUN cat ./.env | grep RATELIMITS_DB_PASSWORD >> ./.env
RUN echo "\nRATELIMITS_DB_NAME=ratelimits-db\nRATELIMITS_DB_PORT=27017\n" >> ./.env
RUN cat ./.env | grep RATELIMITS_IP_LIMIT >> ./.env
RUN echo "\n" >> ./.env
RUN cat ./.env | grep DELAY_MAX >> ./.env

# Use non-root user
RUN chown -R node:node /usr/share/api
USER node

# Bun
RUN curl -fsSL https://bun.sh/install | bash
RUN ~/.bun/bin/bun install
RUN rm -rf node_modules
RUN ~/.bun/bin/bun install --production

ENTRYPOINT [ "/home/node/.bun/bin/bun", "run", "/usr/share/api/index.ts" ]
