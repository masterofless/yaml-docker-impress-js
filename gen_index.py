import glob
import re

text = """
<html>
    <head>
        <title>Presentations with Docker, YAML and Impress.js</title>
        <link href="yaml_presents.css" rel="stylesheet" type="text/css" >
    </head>
    <body>
        <h1>Presentations with Docker, YAML and Impress.js</h1>
        <div id="main">
            <ul>
"""
print(text)

for file in glob.glob('*.yml'):
    base = file.replace('.yml', '');
    label = re.sub(r'[_-]', " ", base)
    print("<li><a href=\"preso.html?preso=" + base + "\">" + label + "</a></li>\n")
    text = """
            </ul>
        </div>
    </body>
</html> """

print(text)
