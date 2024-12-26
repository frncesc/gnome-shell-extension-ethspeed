/* prefs.js
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

import Gio from 'gi://Gio';
import Adw from 'gi://Adw';

import { ExtensionPreferences, gettext as _ } from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

const DEFAULT_DEVICE_ID = 'eth0';
// const DEFAULT_DEVICE_ID = 'enx00e04c680031';

export default class EthSpeedPreferences extends ExtensionPreferences {
  fillPreferencesWindow(window) {
    // Create a preferences page, with a single group
    const page = new Adw.PreferencesPage({
      title: _('General'),
      icon_name: 'dialog-information-symbolic',
    });
    window.add(page);

    const group = new Adw.PreferencesGroup({
      title: _('Device'),
      description: _('Set the ethernet device to be monitored by the extension'),
    });
    page.add(group);

    // Create a new preferences row of type EntryRow
    const deviceRow = new Adw.EntryRow({
      title: _('Device ID'),
      text: DEFAULT_DEVICE_ID,
    });
    group.add(deviceRow);

    // Create a settings object and bind the row to the `show-indicator` key
    window._settings = this.getSettings();
    window._settings.bind('device-id', deviceRow, 'text', Gio.SettingsBindFlags.DEFAULT);
  }
}
