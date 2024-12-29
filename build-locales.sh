#!/bin/bash

# Compile ".mo" files and copy it to to "/locale"

EXT_NAME="ethspeed@frncesc.github.io"

for LANG in "ca" "es"
do
  msgfmt -o $EXT_NAME/po/$LANG.mo $EXT_NAME/po/$LANG.po
  mkdir -p $EXT_NAME/locale/$LANG/LC_MESSAGES
  cp $EXT_NAME/po/$LANG.mo $EXT_NAME/locale/$LANG/LC_MESSAGES/$EXT_NAME.mo
done
