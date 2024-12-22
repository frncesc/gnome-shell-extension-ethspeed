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

For adapter named 'enx00e04c680031':

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


