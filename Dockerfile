FROM httpd:2.4
VOLUME /usr/local/apache2/htdocs

WORKDIR /presos

COPY entrypoint.sh /presos/
COPY httpd-presos.conf /presos/
ADD https://code.jquery.com/jquery-3.2.0.min.js /presos/jquery.js
ADD https://raw.githubusercontent.com/impress/impress.js/master/js/impress.js /presos/impress.js
ADD https://git.daplie.com/coolaj86/yaml2json/raw/master/index.js /presos/yamltojson.js

RUN chmod a+r /presos/*.js
RUN chmod a+rx /presos/*.sh

COPY htdocs/index.pl /presos/
COPY htdocs/*.yml /presos/
RUN /bin/bash -c './index.pl > index.html'

RUN /bin/bash -c 'cat /presos/httpd-presos.conf >> /usr/local/apache2/conf/httpd.conf'

#COPY ./ /usr/local/apache2/htdocs # use a volume mount to . instead

CMD ["/presos/entrypoint.sh"]
