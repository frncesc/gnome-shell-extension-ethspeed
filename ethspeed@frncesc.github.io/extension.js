/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

import GObject from 'gi://GObject';
import St from 'gi://St';
import Gio from 'gi://Gio';
import Clutter from 'gi://Clutter';
import GLib from 'gi://GLib';

import { Extension, gettext as _ } from 'resource:///org/gnome/shell/extensions/extension.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';

const DEFAULT_DEVICE_ID = 'eth0';
// const DEFAULT_DEVICE_ID = 'enx00e04c680031';

const DEFAULT_REFRESH_TIME = 3;

const SpeedIndicator = GObject.registerClass(
    class SpeedIndicator extends PanelMenu.Button {

        device = DEFAULT_DEVICE_ID;

        _init() {
            super._init(0.0, _('Ethernet speed indicator'));

            this.device = DEFAULT_DEVICE_ID;

            this.lanSpeed = new St.Label({
                text: '---',
                y_align: Clutter.ActorAlign.CENTER,
                style_class: 'ethspeed-label'
            });

            this.add_child(this.lanSpeed);
        }

        parseSpeed() {
            try {
                const SYS_PATH = `/sys/class/net/${this.device}/speed`;
                const inputFile = Gio.file_new_for_path(SYS_PATH);
                const [, contents] = inputFile.load_contents(null);
                const status = new TextDecoder().decode(contents).trim();
                if (status === '10' || status === '100' || status === '1000') {
                    this.lanSpeed.set_text(` ${status} `);
                    if (status !== '1000')
                        this.lanSpeed.set_style_class_name('ethspeed-low');
                    else
                        this.lanSpeed.set_style_class_name('ethspeed-ok');
                }
                else {
                    this.lanSpeed.set_text(' ERROR ');
                    this.lanSpeed.set_style_class_name('ethspeed-error');
                }
            } catch (err) {
                this.lanSpeed.set_text(' ERROR ');
                this.lanSpeed.set_style_class_name('ethspeed-error');
            }
            return GLib.SOURCE_CONTINUE;
        }
    }
);

export default class EthSpeedExtension extends Extension {

    indicator = null;
    refreshTime = DEFAULT_REFRESH_TIME;
    running = false;
    settings = null;

    enable() {
        // Create a new instance of SpeedIndicator class and add it to the status area
        this.indicator = new SpeedIndicator();
        Main.panel.addToStatusArea(this.uuid, this.indicator);

        // Add a menu item to open the preferences window
        this.indicator.menu.addAction(_('Preferences'),
            () => this.openPreferences());

        // Create a new GSettings object and read 'device-id'
        this._settings = this.getSettings();
        // Binding comented because of error:
        // g_settings_bind: no property 'device' on class 'Gjs_ethspeed_frncesc_github_io_extension_SpeedIndicator'
        //
        // this._settings.bind('device-id', this.indicator, 'device', Gio.SettingsBindFlags.DEFAULT);
        //

        // Manual binding:
        const device = this._settings.get_value('device-id').print(false).replaceAll("'", '').trim();
        if (device) {
            globalThis.log(`Initial value of device-id in ethSpeed extension is: ${device}`)
            this.indicator.device = device;
        }

        // Watch for changes to a specific setting
        this._settings.connect('changed::device-id', (settings, key) => {
            const value = settings.get_value(key).print(false).replaceAll("'", '');
            globalThis.log(`Changed settings in ethSpeed extension: "${key}" = "${value}"`);
            this.indicator.device = value;
        });

        // Start the timer to update the indicator
        this.running = true;
        this.timeout = GLib.timeout_add_seconds(GLib.PRIORITY_DEFAULT, this.refreshTime, () => {
            return this.running ? this.indicator.parseSpeed() : GLib.SOURCE_REMOVE;
        });
    }

    disable() {
        if (this.indicator) {
            this.indicator.destroy();
            this.indicator = null;
            this.settings = null;
        }
        this.running = false;
    }
}
