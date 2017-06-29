import glob
import re

text = """
<html>
    <head>
        <title>YAML Presentations with Impress.js and Docker</title>
        <link href="css/yaml-presents.css" rel="stylesheet" type="text/css" >
    </head>
    <body>
        <h1>YAML Presentations with Impress.js and Docker</h1>
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
