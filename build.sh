#!/bin/bash

# Builds the extension ZIP file

EXT_NAME="ethspeed@frncesc.github.io"

mkdir -p dist
gnome-extensions pack -o dist $EXT_NAME

