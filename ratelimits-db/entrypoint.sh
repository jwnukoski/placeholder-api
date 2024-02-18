#!/bin/bash
# Make sure database files belong to mongodb user
chown -R mongodb:mongodb /data/db

# Run mongod as mongodb user. Wait. Make sure database is initialized. Seems like a bug that this isn't done automatically.
gosu mongodb mongod --bind_ip_all &
sleep 30 && gosu mongodb mongo /docker-entrypoint-initdb.d/mongo-init.js