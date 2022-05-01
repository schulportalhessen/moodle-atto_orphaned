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
 * atto_orphaned English language file.
 *
 * @package    atto_orphaned
 * @copyright  2022 Andreas Schenkel <Andreas.Schenkel@schulportal.hessen.de>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

$string['pluginname'] = 'Atto orphaned files';

$string['orphaned:view'] = 'Capability to be able to view the orphaned files area below the attoeditor.';

$string['enableplugin'] = 'Enable atto orphaned plugin';
$string['enableplugin_desc'] = 'If true, then an additional area below the editor is shown, where orphaned files are shown during the usage of the editor. (showorphanedfilescounter or showallfilescounter needs to be activated)';

$string['isactiveforsiteadmin'] = 'Enable atto orphaned plugin for siteadmin';
$string['isactiveforsiteadmin_desc'] = 'If true, then the plugin is enabled for siteadmin although "enableplugin" is deactivated';

$string['label:dropdownorphanedfilescount'] = 'Orphaned files count:';
$string['label:dropdownallfilescount'] = 'All files count:';

$string['label:filescountermaxpre'] = '(max.';
$string['label:filescountermaxpost'] = 'files will be shown)';

$string['label:trashicon'] = 'Delete this file???';

$string['orphanedFilesTable:caption'] = 'Orphaned Files';
$string['allFilesTable:caption'] = 'All Files';

$string['tableheadersortorder:referencecount'] = 'referencecount';
$string['tableheader:preview'] = 'Preview';
$string['tableheadersortorder:mimetype'] = 'mimetype';

$string['tableheader:filesize'] = 'Filesize';
$string['tableheader:filename'] = 'Filename';
$string['tableheader:path'] = 'Path';
$string['tableheader:creationdate'] = 'Creationdate';

$string['dimensions'] = 'dimensions: ';
$string['isreferenz'] = 'is referenz: yes';
$string['isnotreferenz'] = 'is referenz: no';
$string['referencecount'] = 'has references: ';

$string['heading:previews'] = 'Previews of orphaned files';
$string['showpreviewofimage'] = 'Show preview of image';
$string['showpreviewofimage_desc'] = 'If activated a preview of an orpaned image is shown.';
$string['showpreviewofaudio'] = 'Show preview of audio';
$string['showpreviewofaudio_desc'] = 'If activated an audio-player as preview of an orpaned audiofile is shown.';
$string['showpreviewofvideo'] = 'Show preview of video';
$string['showpreviewofvideo_desc'] = 'If activated an video-player as preview of an orpaned videoofile is shown.';

$string['heading:details'] = 'Details';
$string['showisreferenz'] = 'Show is reference';
$string['showisreferenz_desc'] = 'Include information, if a file is just a reference.';
$string['showreferencecount'] = 'Show reference count';
$string['showreferencecount_desc'] = 'Include information, how many references exists to a file.';
$string['showmimetype'] = 'Show mimetype';
$string['showmimetype_desc'] = 'Include information about the mimetype of a file based on file extension.';

$string['heading:showorphanedfiles'] = 'Orphaned files';
$string['showorphanedfilescounter'] = 'Show counter with orphaned files';
$string['showorphanedfilescounter_desc'] = '("enableplugin" needs to be activated) If activated a counter indicated orphaned files stored in the textfield.';
$string['showorphanedfilestable'] = 'Add table with orphaned files';
$string['showorphanedfilestable_desc'] = 'If activated in addition to the counter also a table containing a list of orphaned files that are stored on context of the text is shown.';

$string['heading:showallfiles'] = 'All files';
$string['showallfilescounter'] = 'Show counter with all files';
$string['showallfilescounter_desc'] = '("enableplugin" needs to be activated) If activated a counter indicated all files stored in the textfield.';
$string['showallfilestable'] = 'Add table with all files';
$string['showallfilestable_desc'] = 'If activated in addition to the counter also a table containing a list of all files that are stored on context of the text is shown.';

$string['heading:maxfilescounter'] = 'Maximum numbers of files to show in "orphaned files table"';
$string['maxorphanedfilescounter'] = 'max. orphaned files';
$string['maxorphanedfilescounter_desc'] = 'To be able to have not to large tables showing to much files this is the maximum number of orphaned files that will be shown in the "orphaned files table".';
$string['maxallfilescounter'] = 'max. all files to show in "all files table".';
$string['maxallfilescounter_desc'] = 'To be able to have not to large tables showing to much files this is the maximum number of files that will be shown in the "all files table".';

$string['heading:additonal'] = 'Additional settings';
$string['folderfornotorphandfiles'] = 'Name of folder with not orphaned files';
$string['folderfornotorphandfiles_desc'] = 'In some cases it might be usefull to store files that are not directly be linked but th files should not be indicated as orphaned. Files in a folder with this name or its subfolder are not indicated as orphaned. Do not use space or dots or slashs.';
$string['loadsorttablejs'] = 'Sortierbare Tabelle aktivieren (sorttable.js)';
$string['loadsorttablejs_desc'] = 'Wenn im Moodle nicht bereits ein CDN integriert ist, der die Datei sorttable.js bereitstelt, so kann die im plugin integrierte sorttable.j-Datei aktiviert werden.';
