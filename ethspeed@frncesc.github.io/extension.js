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

const ADAPTOR_NAME = 'enx00e04c680031';
const REFRESH_TIME = 3;

const Indicator = GObject.registerClass(
    class Indicator extends PanelMenu.Button {
        _init() {
            super._init(0.0, _('LAN speed Indicator'));

            this.lanSpeed = new St.Label({
                text: '---',
                y_align: Clutter.ActorAlign.CENTER,
                style_class: 'lanspeed-label'
            });

            this.add_child(this.lanSpeed);
        }

        parseSpeed() {
            try {
                const SYS_PATH = `/sys/class/net/${ADAPTOR_NAME}/speed`;
                const inputFile = Gio.file_new_for_path(SYS_PATH);
                const [, contents] = inputFile.load_contents(null);
                const status = new TextDecoder().decode(contents).trim();
                if (status === '10' || status === '100' || status === '1000') {
                    this.lanSpeed.set_text(` ${status} `);
                    if (status !== '1000')
                        this.lanSpeed.set_style_class_name('lanspeed-low-detected');
                    else
                        this.lanSpeed.set_style_class_name('lanspeed-ok-detected');
                }
                else {
                    this.lanSpeed.set_text(' ERROR ');
                    this.lanSpeed.set_style_class_name('lanspeed-error');
                }
            } catch (err) {
                this.lanSpeed.set_text(' ERROR ');
                this.lanSpeed.set_style_class_name('lanspeed-error');
            }
            return GLib.SOURCE_CONTINUE;
        }
    }
);

export default class IndicatorLANSpeedExtension extends Extension {

    indicator = null;
    running = false;

    enable() {
        this.indicator = new Indicator();
        Main.panel.addToStatusArea(this.uuid, this.indicator);

        this.running = true;
        this.timeout = GLib.timeout_add_seconds(GLib.PRIORITY_DEFAULT, REFRESH_TIME, () => {
            return this.running ? this.indicator.parseSpeed() : GLib.SOURCE_REMOVE;
        });
    }

    disable() {
        if (this.indicator) {
            this.indicator.destroy();
            this.indicator = null;
        }
        this.running = false;
    }
}
