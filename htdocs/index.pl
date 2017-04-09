#!/usr/bin/perl

print <<"EOF";
<html>
    <head>
        <title>YAML Presentations with Impress.js and Docker</title>
        <link href="css/yaml-presents.css" rel="stylesheet" type="text/css" >
    </head>
    <body>
        <h1>YAML Presentations with Impress.js and Docker</h1>
        <div id="main">
            <ul>
EOF

# YAML file list with proper presentation links and labels
for $file (glob('*.yml')) {
  $base = $file;
  $base =~ s/\.yml//;
  $label = $base;
  $label =~ s/[_-]/ /g;
  $label =~ s/([\w']+)/\u\L$1/g;
  print "<li><a href=\"preso.html?preso=$base\">$label</a></li>\n";
}

print <<"EOF";
            </ul>
        </div>
    </body>
</html>
EOF
