<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Course list block settings
 *
 * @package    atto_orphaned
 * @copyright  2022 Andreas Schenkel <Andreas.Schenkel@schulportal.hessen.de>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die;

if ($ADMIN->fulltree) {
    $settings->add(
        new admin_setting_configcheckbox(
            'atto_orphaned/enableplugin',
            get_string('enableplugin', 'atto_orphaned'),
            get_string('enableplugin_desc', 'atto_orphaned'),
            0
        )
    );
    $settings->add(new admin_setting_configcheckbox(
        'atto_orphaned/isactiveforsiteadmin',
        get_string('isactiveforsiteadmin', 'atto_orphaned'),
        get_string('isactiveforsiteadmin_desc', 'atto_orphaned'),
        1
    ));
    $settings->add(
        new admin_setting_heading(
            'atto_orphaned/headingshoworphanedfilestable',
            get_string('heading:showorphanedfiles', 'atto_orphaned'),
            ''
        )
    );
    $settings->add(
        new admin_setting_configcheckbox(
            'atto_orphaned/showorphanedfilescounter',
            get_string('showorphanedfilescounter', 'atto_orphaned'),
            get_string('showorphanedfilescounter_desc', 'atto_orphaned'),
            1
        )
    );
    $settings->add(
        new admin_setting_configcheckbox(
            'atto_orphaned/showorphanedfilestable',
            get_string('showorphanedfilestable', 'atto_orphaned'),
            get_string('showorphanedfilestable_desc', 'atto_orphaned'),
            1
        )
    );
    $settings->add(
        new admin_setting_heading(
            'atto_orphaned/headingshowallfiles',
            get_string('heading:showallfiles', 'atto_orphaned'),
            ''
        )
    );
    $settings->add(
        new admin_setting_configcheckbox(
            'atto_orphaned/showallfilescounter',
            get_string('showallfilescounter', 'atto_orphaned'),
            get_string('showallfilescounter_desc', 'atto_orphaned'),
            1
        )
    );
    $settings->add(
        new admin_setting_configcheckbox(
            'atto_orphaned/showallfilestable',
            get_string('showallfilestable', 'atto_orphaned'),
            get_string('showallfilestable_desc', 'atto_orphaned'),
            0
        )
    );
    $settings->add(
        new admin_setting_heading(
            'atto_orphaned/headingpreviews',
            get_string('heading:previews', 'atto_orphaned'),
            ''
        )
    );
    $settings->add(
        new admin_setting_configcheckbox(
            'atto_orphaned/showpreviewofimage',
            get_string('showpreviewofimage', 'atto_orphaned'),
            get_string('showpreviewofimage_desc', 'atto_orphaned'),
            1
        )
    );
    $settings->add(
        new admin_setting_configcheckbox(
            'atto_orphaned/showpreviewofaudio',
            get_string('showpreviewofaudio', 'atto_orphaned'),
            get_string('showpreviewofaudio_desc', 'atto_orphaned'),
            0
        )
    );
    $settings->add(
        new admin_setting_configcheckbox(
            'atto_orphaned/showpreviewofvideo',
            get_string('showpreviewofvideo', 'atto_orphaned'),
            get_string('showpreviewofvideo_desc', 'atto_orphaned'),
            0
        )
    );
    $settings->add(
        new admin_setting_heading(
            'atto_orphaned/headingdetails',
            get_string('heading:details', 'atto_orphaned'),
            ''
        )
    );
    $settings->add(
        new admin_setting_configcheckbox(
            'atto_orphaned/showisreferenz',
            get_string('showisreferenz', 'atto_orphaned'),
            get_string('showisreferenz_desc', 'atto_orphaned'),
            1
        )
    );
    $settings->add(
        new admin_setting_configcheckbox(
            'atto_orphaned/showreferencecount',
            get_string('showreferencecount', 'atto_orphaned'),
            get_string('showreferencecount_desc', 'atto_orphaned'),
            1
        )
    );
    $settings->add(
        new admin_setting_configcheckbox(
            'atto_orphaned/showmimetype',
            get_string('showmimetype', 'atto_orphaned'),
            get_string('showmimetype_desc', 'atto_orphaned'),
            0
        )
    );
    $settings->add(
        new admin_setting_heading(
            'atto_orphaned/headingmaxfilescounter',
            get_string('heading:maxfilescounter', 'atto_orphaned'),
            ''
        )
    );
    $options = array(
        0  => '0',
        1  => '1',
        2  => '2',
        3  => '3',
        4  => '4',
        5  => '5',
        6  => '6',
        7  => '7',
        8  => '8',
        9  => '9',
        10 => '10',
        20 => '20',
        30 => '30',
        40 => '40',
        50 => '50',
        100 => '100',
        150 => '150',
        200 => '200',
        300 => '300',
        400 => '400',
        500 => '500',
        1000 => '1000'
    );
    $settings->add(
        new admin_setting_configselect(
            'atto_orphaned/maxorphanedfilescounter',
            get_string('maxorphanedfilescounter', 'atto_orphaned'),
            get_string('maxorphanedfilescounter_desc', 'atto_orphaned'),
            100,
            $options
        )
    );
    $options = array(
        0  => '0',
        1  => '1',
        2  => '2',
        3  => '3',
        4  => '4',
        5  => '5',
        6  => '6',
        7  => '7',
        8  => '8',
        9  => '9',
        10 => '10',
        20 => '20',
        30 => '30',
        40 => '40',
        50 => '50',
        100 => '100',
        150 => '150',
        200 => '200',
        300 => '300',
        400 => '400',
        500 => '500',
        1000 => '1000'
    );
    $settings->add(
        new admin_setting_configselect(
            'atto_orphaned/maxallfilescounter',
            get_string('maxallfilescounter', 'atto_orphaned'),
            get_string('maxallfilescounter_desc', 'atto_orphaned'),
            100,
            $options
        )
    );
    $settings->add(
        new admin_setting_heading(
            'atto_orphaned/headingadditonal',
            get_string('heading:additonal', 'atto_orphaned'),
            ''
        )
    );
    $settings->add(
        new admin_setting_configtext(
            "atto_orphaned/folderfornotorphandfiles",
            get_string('folderfornotorphandfiles', 'atto_orphaned'),
            get_string('folderfornotorphandfiles_desc', 'atto_orphaned'),
            'notOrphaned'
        )
    );
    $settings->add(
        new admin_setting_configcheckbox(
            'atto_orphaned/loadsorttablejs',
            get_string('loadsorttablejs', 'atto_orphaned'),
            get_string('loadsorttablejs_desc', 'atto_orphaned'),
            0
        )
    );
}
