FROM node:20.10.0
RUN apt update && apt install -y vim

# Set timezone to est
RUN ln -fs /usr/share/zoneinfo/America/New_York /etc/localtime
RUN dpkg-reconfigure --frontend noninteractive tzdata

# Copy API
RUN mkdir /usr/share/api
COPY ./ /usr/share/api

# Grab higher .env variables
RUN cat ../.env | grep RATELIMIT_DB_USER > ./.env
RUN echo "\n" >> ./.env
RUN cat ../.env | grep RATELIMIT_DB_PASSWORD >> ./.env
RUN echo "\n" >> ./.env
RUN cat ../.env | grep RATELIMIT_DB_NAME >> ratelimit-db
RUN echo "\nRATELIMIT_DB_PORT=27017"

# Cleanup development files
WORKDIR /usr/share/api
RUN rm -rf node_modules
RUN rm Dockerfile 
RUN rm package-lock.json
RUN rm bun.lockb

# Use non-root user
RUN chown -R node:node /usr/share/api
USER node
WORKDIR /usr/share/api

# Bun
RUN curl -fsSL https://bun.sh/install | bash
RUN ~/.bun/bin/bun install
RUN rm -rf node_modules
RUN ~/.bun/bin/bun install --production

ENTRYPOINT [ "/home/node/.bun/bin/bun", "run", "/usr/share/api/index.ts" ]
