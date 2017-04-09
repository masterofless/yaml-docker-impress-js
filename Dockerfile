FROM httpd:2.4
#COPY ./ /usr/local/apache2/htdocs
ADD https://code.jquery.com/jquery-3.2.0.min.js /usr/local/apache2/htdocs/js/jquery.js
ADD https://raw.githubusercontent.com/impress/impress.js/master/js/impress.js /usr/local/apache2/htdocs/js/impress.js
ADD https://git.daplie.com/coolaj86/yaml2json/raw/master/index.js /usr/local/apache2/htdocs/js/yamltojson.js
VOLUME /usr/local/apache2/htdocs
