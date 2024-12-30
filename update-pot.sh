#!/bin/bash

# Update the Gettext ".pot" schema

EXT_NAME="ethspeed@frncesc.github.io"

cd $EXT_NAME
mkdir -p po
xgettext --from-code=UTF-8 -o po/$EXT_NAME.pot *.js
cd ..

