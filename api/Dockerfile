FROM node:20.10.0
RUN apt update && apt install -y vim

# Set timezone to est
RUN ln -fs /usr/share/zoneinfo/America/New_York /etc/localtime
RUN dpkg-reconfigure --frontend noninteractive tzdata

# Copy API
RUN mkdir /usr/share/api
COPY ./api /usr/share/api
WORKDIR /usr/share/api

ARG NODE_ENV
ARG RATELIMITS_DB_NAME
ARG RATELIMITS_DB_USER
ARG RATELIMITS_DB_PASSWORD
ARG RATELIMITS_IP_LIMIT
ARG DELAY_MAX
RUN echo "RATELIMITS_DB_USER=$RATELIMITS_DB_USER\n" > ./.env
RUN echo "RATELIMITS_DB_PASSWORD=$RATELIMITS_DB_PASSWORD\n" >> ./.env
RUN echo "RATELIMITS_DB_NAME=$RATELIMITS_DB_NAME\n" >> ./.env
RUN echo "RATELIMITS_DB_PORT=27017\n" >> ./.env
RUN echo "RATELIMITS_IP_LIMIT=$RATELIMITS_IP_LIMIT\n" >> ./.env
RUN echo "DELAY_MAX=$DELAY_MAX\n" >> ./.env
RUN echo "NODE_ENV=$NODE_ENV\n" >> .env

# Use non-root user
RUN chown -R node:node /usr/share/api
USER node
WORKDIR /usr/share/api

# Bun
RUN curl -fsSL https://bun.sh/install | bash
RUN ~/.bun/bin/bun install
RUN rm -rf node_modules
RUN ~/.bun/bin/bun install --$NODE_ENV

ENV NODE_ENV $NODE_ENV
ENTRYPOINT [ "/home/node/.bun/bin/bun", "run", "/usr/share/api/index.ts" ]


