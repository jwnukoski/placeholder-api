#!/bin/bash
chown -R mongodb:mongodb /data/db
gosu mongodb mongod --bind_ip_all
su mongodb
tail -f /dev/null