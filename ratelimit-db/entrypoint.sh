#!/bin/bash
chown -R mongodb:mongodb /data/db
gosu mongodb mongod
su mongodb
tail -f /dev/null