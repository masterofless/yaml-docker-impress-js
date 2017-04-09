#!/usr/bin/perl

print '<html><head></head><body>';
print '<div id="main">';

# file list
print "<ul>\n";
for $file (glob('*.yml')) {
  $base = $file;
  $base =~ s/\.yml//;
  $label = $base;
  $label =~ s/[_-]/ /g;
  $label =~ s/([\w']+)/\u\L$1/g;
  print "<li><a href=\"preso.html?preso=$base\">$label</a></li>\n";
}
print "\n</ul>\n";

print '</div>';
print '</body></html>';
