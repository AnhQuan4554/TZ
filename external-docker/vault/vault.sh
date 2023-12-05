
sealed="true"

while [ "$sealed" = "true" ]
do
    
    sealed=$(curl http://vault:8200/v1/sys/health?standbyok=true | jq -r .sealed)
    
    if test "$sealed" = 'true'; then
        echo "server is sealed $sealed, unseal with token"
        # $variable has (z)ero size
        curl 'http://vault:8200/v1/sys/unseal' \
        -X 'PUT' \
        -H 'content-type: application/json; charset=UTF-8' \
        --data-raw '{"key":"'"$VAULT_KEY"'"}'
    fi
    
    curl http://vault:8200/v1/sys/health?standbyok=true | jq .
    
done

echo "vault is sealed: $sealed"
