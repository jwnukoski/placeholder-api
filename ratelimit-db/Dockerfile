FROM mongo:5.0.24
COPY entrypoint.sh /root/entrypoint.sh
RUN chown -R mongodb:mongodb /var/log /data/db 
USER mongodb
ENTRYPOINT ["/root/entrypoint.sh"]