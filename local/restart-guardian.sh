docker restart guardian-policy-service
sleep 10

docker restart guardian-guardian-service

docker logs guardian-policy-service -f --tail 10
