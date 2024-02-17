FROM node:20.10.0
RUN apt update && apt install -y vim

# Set timezone to est
RUN ln -fs /usr/share/zoneinfo/America/New_York /etc/localtime
RUN dpkg-reconfigure --frontend noninteractive tzdata

# Copy API
RUN mkdir /usr/share/www
COPY ./ /usr/share/www

# Cleanup development files
WORKDIR /usr/share/www
RUN rm -rf node_modules
RUN rm Dockerfile 
RUN rm package-lock.json
RUN rm bun.lockb

# Use non-root user
RUN chown -R node:node /usr/share/www
USER node
WORKDIR /usr/share/www

# Bun
RUN curl -fsSL https://bun.sh/install | bash
RUN ~/.bun/bin/bun install
RUN rm -rf node_modules
RUN ~/.bun/bin/bun install --production

ENTRYPOINT [ "/home/node/.bun/bin/bun", "run", "/usr/share/www/index.ts" ]
