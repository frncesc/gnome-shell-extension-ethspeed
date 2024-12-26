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

## Inspired on

https://github.com/biji/simplenetspeed/

## Mac address

```sh
cat /sys/class/net/devicename/address
```

Adapters starting with "02:42:" are virtual (usually Docker virtual devices)
Loopback (lo) always has address: "00:00:00:00:00:00"

List all adapters:
```sh
$ for d in `ls /sys/class/net/`; do echo "$d"; done
```

List all adapter MAC addresses:
```sh
$ for d in `ls /sys/class/net/`; do echo "$d - `cat /sys/class/net/$d/address`"; done
```

Check name_assign_type === 4


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

## Binding error
(gnome-shell:10702): GLib-GIO-CRITICAL **: 17:56:15.669: g_settings_bind: no property 'device' on class 'Gjs_ethspeed_frncesc_github_io_extension_SpeedIndicator'
