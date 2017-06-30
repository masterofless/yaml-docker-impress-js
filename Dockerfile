FROM centos
RUN yum install -y httpd python

WORKDIR /python

ADD http://pyyaml.org/download/pyyaml/PyYAML-3.12.tar.gz /python/pyyaml.tar.gz
WORKDIR /python/pyyaml.tar.gz/PyYAML-3.12/
RUN python setup.py install

WORKDIR /presos

ADD https://code.jquery.com/jquery-3.2.0.min.js /presos/jquery.js
ADD https://raw.githubusercontent.com/impress/impress.js/master/js/impress.js /presos/impress.js

COPY *.sh /presos/
COPY *.py /presos/

COPY httpd-presos.conf /etc/httpd/conf.d/
COPY htdocs/*.html /presos/
COPY htdocs/*.css /presos/
COPY htdocs/*.js /presos/
RUN chmod a+r /presos/*.js

COPY htdocs/*.yml /presos/
RUN python /presos/gen_index.py > index.html
RUN python /presos/convert_yaml_to_json.py

CMD ["/presos/entrypoint.sh"]
