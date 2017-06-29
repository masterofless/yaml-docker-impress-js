#!/bin/bash -eu

tag=yaml-presents
hostport=8888

set -x

docker kill $tag || true
docker rm $tag || true

docker build -t $tag .

docker run --detach --rm --name $tag -p ${hostport}:80 $tag && sleep 1

open -a Firefox http://localhost:$hostport/presos/ || true

docker logs $tag
