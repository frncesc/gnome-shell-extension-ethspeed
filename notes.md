## Gnome Shell extensions API docs

### GJS
- [GJS docs site](https://gjs-docs.gnome.org/)
- [GJS docs (GitLab)](https://gitlab.gnome.org/GNOME/gjs/-/tree/master/doc)
- [GJS overrides](https://gitlab.gnome.org/GNOME/gjs/-/blob/master/doc/Overrides.md)
- [GObject Introspection](https://gitlab.gnome.org/GNOME/gjs/-/tree/master/doc)

## Test Gnome extensions in Wayland sessions
Wayland sessions support running GNOME Shell in window, so an extension can be tested without disrupting the current session.

Start a nested GNOME Shell session:
```sh
$ dbus-run-session -- gnome-shell --nested --wayland
```

Open a terminal inside the new session and enable the extension:
```sh
$ gnome-extensions enable ethspeed@frncesc.github.io
```

Disable with:
```sh
$ gnome-extensions disable ethspeed@frncesc.github.io
```

## Check LAN speed

For the lan device 'enx00e04c680031':

```sh
cat /sys/class/net/enx00e04c680031/speed
```

This will return "10", "100", "1000" or error (_file does not exist_)

## See

https://github.com/biji/simplenetspeed/
https://github.com/eliapasquali/power-profile-switcher/

## Gettext

Update POT file:
```sh
$ cd ethspeed@frncesc.github.io
$ xgettext --from-code=UTF-8 --output=po/ethspeed@frncesc.github.io.pot *.js
```


## Pack extension
Pack with translations:
```sh
$ gnome-extensions pack --podir=po ethspeed@frncesc.github.io
```
