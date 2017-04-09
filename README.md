Docker YAML Presentations
=========================

I like writing in vim and plain text.  I love markdown, for example.
But, I wanted to be able to write visually interesting presentations.

So, I wired together some javascript to read YAML files and create markup to give to [Impress.js](https://github.com/impress/impress.js/blob/master/index.html)

To use this, install docker and try:

    build_and_run.sh

or perhaps later on:

    docker kill yaml-presents; and ./build_run.sh

That should do several things:

start a web server on map it to port 8888 on your machine.  Mac users can then

Then you should be able to:

    open http://locahost:8888/

to see an index of existing presentations to go step through.

Index Generation
----------------

Until I expand the web server to do a decent dynamic index from the existing YAML files, I have a perl script to do that:

    htdocs/index.pl > htdocs/index.html

