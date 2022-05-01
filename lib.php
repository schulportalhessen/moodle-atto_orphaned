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
 * atto_orphaned lib file.
 *
 * @package    atto_orphaned
 * @copyright  2022 Andreas Schenkel <Andreas.Schenkel@schulportal.hessen.de>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

/**
 * Initialise the js strings required for this module.
 */
function atto_orphaned_strings_for_js() {
    global $PAGE;
    $PAGE->requires->strings_for_js(
        [
            'label:dropdownorphanedfilescount',
            'label:dropdownallfilescount',
            'label:filescountermaxpre',
            'label:filescountermaxpost',
            'label:trashicon',
            'orphanedFilesTable:caption',
            'allFilesTable:caption',
            'tableheadersortorder:referencecount',
            'tableheader:preview',
            'tableheadersortorder:mimetype',
            'tableheader:filesize',
            'tableheader:filename',
            'tableheader:path',
            'tableheader:creationdate',
            'isreferenz',
            'isnotreferenz',
            'referencecount',
            'dimensions'
        ],
        'atto_orphaned'
    );
    if (get_config('atto_orphaned', 'loadsorttablejs') == '1') {
        $PAGE->requires->js('/lib/editor/atto/plugins/orphaned/sorttable.js');
    }
}

// Config
function atto_orphaned_params_for_js() {
    GLOBAL $USER, $COURSE;
    // to check capabilitys to use the plugin get the context
    $context = context_course::instance($COURSE->id);
    // check capabilitys
    $hascapability = has_capability('atto/orphaned:view', $context);
    // make plugin enabled for siteadmin even if the plugin is not activated for other users
    $isactiveforsiteadmin = get_config('atto_orphaned', 'isactiveforsiteadmin');
    $isenabled = get_config('atto_orphaned', 'enableplugin') || ( $isactiveforsiteadmin && is_siteadmin());
    $toremove = ['.', ' ', '/', ';'];
    $folderfornotorphandfiles = str_replace($toremove, '', stripslashes(get_config('atto_orphaned', 'folderfornotorphandfiles')));
    return [
        'courseId' => $COURSE->id,
        'hascapability' => "$hascapability",
        'usercontext' => context_user::instance($USER->id)->id,
        'showPreviewOfImage' => get_config('atto_orphaned', 'showpreviewofimage'),
        'showPreviewOfAudio' => get_config('atto_orphaned', 'showpreviewofaudio'),
        'showPreviewOfVideo' => get_config('atto_orphaned', 'showpreviewofvideo'),
        'showIsReferenz' => get_config('atto_orphaned', 'showisreferenz'),
        'showReferenceCount' => get_config('atto_orphaned', 'showreferencecount'),
        'showMimetype' => get_config('atto_orphaned', 'showmimetype'),
        'showOrphanedFilesCounter' => get_config('atto_orphaned', 'showorphanedfilescounter'),
        'showOrphanedFilesTable' => get_config('atto_orphaned', 'showorphanedfilestable'),
        'showAllFilesCounter' => get_config('atto_orphaned', 'showallfilescounter'),
        'showAllFilesTable' => get_config('atto_orphaned', 'showallfilestable'),
        'maxAllFilesCounter' => get_config('atto_orphaned', 'maxallfilescounter'),
        'maxOrphanedFilesCounter' => get_config('atto_orphaned', 'maxorphanedfilescounter'),
        'folderForNotOrphandFiles' => $folderfornotorphandfiles,
        'enablePlugin' => $isenabled
    ];
}
