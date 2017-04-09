#!/bin/bash -x

# this depends on a copy of all the yml files into WORKDIR
./index.pl > /usr/local/apache2/htdocs/index.html

cd /usr/local/apache2
httpd-foreground
