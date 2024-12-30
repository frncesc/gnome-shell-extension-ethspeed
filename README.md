# gnome-shell-extension-ethspeed
Gnome shell extension to display the current speed of the main ethernet adapter

## Set-up

1 - Copy or symlink the directory `ethspeed@frncesc.github.io` into `~/.local/share/gnome-shell/extensions`

2 - Restart your Gnome session

3 - Enable the extension with:
```sh
$ gnome-extensions enable ethspeed@frncesc.github.io
```

4 - Click on the indicator to open the preferences dialog and set the ID of the ethernet device to be monitorized: eth0, eth1, enxxx, etc. (use `ifconfig` from a console to see the current device IDs on your system)

