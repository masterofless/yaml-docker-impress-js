import sys
import yaml
import json
import glob

for infile in glob.glob('*.yml'):
    i = open(infile, 'r')
    outfile = infile.replace('.yml', '.json');
    o = open(outfile, 'w')
    json.dump(yaml.load(i, Loader=yaml.FullLoader), o, indent=4)
    i.close()
    o.close()
