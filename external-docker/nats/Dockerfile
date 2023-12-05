FROM nats:alpine3.15
COPY ./nats-server.conf /nats-server.conf
RUN pwd
ENTRYPOINT [ "nats-server", "-c","/nats-server.conf" ] 