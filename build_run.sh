#!/bin/bash -eu

tag=yaml-presents
port=8888

set -x

docker build -t $tag .

bash -c "cd htdocs; ./index.pl > ./index.html"

docker run --detach --rm --name $tag -p ${port}:80 -v ${PWD}/htdocs:/usr/local/apache2/htdocs $tag

sleep 3

open http://localhost:$port/
