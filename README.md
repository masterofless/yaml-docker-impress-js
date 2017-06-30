Docker YAML Presentations
=========================

I like writing in vim and plain text.  I love markdown, for example.
But, I wanted to be able to write visually interesting presentations.

So, I wired together some javascript to create HTML markup from YAML files (via JSON) to give to [Impress.js](https://github.com/impress/impress.js/blob/master/index.html)

Prequisites
-----------

- Docker
- Internet

Build and Run
-------------

    ./build_run.sh

That should do several things:

1. start a web server 
2. map it to port 8888 on your machine
3. open http://locahost:8888/

Index Generation
----------------

Purely to support what I do, I've set this up so it mounts the htdocs directory so edits to .yml and .css files are immediately servable by the web server.
The index.html and json files are generated and stored at image build time.
