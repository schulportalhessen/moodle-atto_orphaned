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

$string['pluginname'] = 'Atto verwaiste Dateien';

$string['orphaned:view'] = 'Berechtigung unterhalb des Atto-Editors einen Bereich anzuzeigen, der über vorhandene verwaisten Dateien während der Bearbeitung des Textes informiert.';

$string['enableplugin'] = 'Aktiviere Plugin "Verwaiste Dateien" im Atto-Editor ';
$string['enableplugin_desc'] = 'Wenn aktiviert, dann werden Nutzenden mit der Berechtigung orphaned:view während der Nutzung des Atto-Editors unterhalb ein Bereich mit verwaisten Dateien angezeigt. Zusätzlich muss showorphanedfilescounter oder showallfilescounter aktiviert sein.';

$string['isactiveforsiteadmin'] = 'Aktiviere Plugin für Siteadmin';
$string['isactiveforsiteadmin_desc'] = 'Wenn aktiviert, dann wird auch bei deaktivertem Plugin (enableplugin=false) das Plugin dennoch für Siteadmins aktiviert.';

$string['label:dropdownorphanedfilescount'] = 'Anzahl verwaister Dateien:';
$string['label:dropdownallfilescount'] = 'Anzahl aller Dateien:';

$string['label:filescountermaxpre'] = '(max.';
$string['label:filescountermaxpost'] = 'Dateien werden angezeigt)';

$string['label:trashicon'] = 'Lösche diese Datei ohne Rückfrage???';

$string['orphanedFilesTable:caption'] = 'Verwaiste Dateien';
$string['allFilesTable:caption'] = 'Alle Dateien';

$string['tableheadersortorder:referencecount'] = 'Anzahl Verknüpfungen';
$string['tableheader:preview'] = 'Vorschau';
$string['tableheadersortorder:mimetype'] = 'Mimetype';

$string['tableheader:filesize'] = 'Dateigröße';
$string['tableheader:filename'] = 'Dateiname';
$string['tableheader:path'] = 'Pfad';
$string['tableheader:creationdate'] = 'Erstellungsdatum';

$string['dimensions'] = 'Breite/Höhe: ';
$string['isreferenz'] = 'Ist Alias/Verknüpfung: ja';
$string['isnotreferenz'] = 'Ist Alias/Verknüpfung: nein';
$string['referencecount'] = 'Hat Alias/Verknüpfungen: ';

$string['heading:previews'] = 'Vorschau';
$string['showpreviewofimage'] = 'Zeige Vorschau bei Bildern';
$string['showpreviewofimage_desc'] = 'Wenn aktiviert, dann werden Vorschauen der Bilder (thumbs) angezeigt.';
$string['showpreviewofaudio'] = 'Zeige Vorschau bei Audio-Dateien';
$string['showpreviewofaudio_desc'] = 'Wenn aktiviert, dann wird für Audio-Dateien eine Abspielmöglichkeit angezeigt.';
$string['showpreviewofvideo'] = 'Zeige Vorschau bei Film-Dateien';
$string['showpreviewofvideo_desc'] = 'Wenn aktiviert, dann wird für Film-Dateien eine Abspielmöglichkeit angezeigt.';

$string['heading:details'] = 'Details';
$string['showisreferenz'] = 'Referenzstatus anzeigen';
$string['showisreferenz_desc'] = 'Anzeigen, wenn es sich bei einer Datei um ein Alias/Verknüpfung handelt.';
$string['showreferencecount'] = 'Anzahl Referenzen';
$string['showreferencecount_desc'] = 'Anzeigen, wie viele Alias/Verknüpfungen auf eine Datei existieren (wie oft eine Datei an anderer Stelle also referenziert ist.';
$string['showmimetype'] = 'Mimetype';
$string['showmimetype_desc'] = 'Zeige den Mimetype auf Basis der Dateiendung an.';

$string['heading:showorphanedfiles'] = 'Verwaiste Dateien';
$string['showorphanedfilescounter'] = 'Zeige Anzahl verwaister Dateien an';
$string['showorphanedfilescounter_desc'] = '("enableplugin" needs to be activated) Wenn aktiviert, dann wird die Anzahl an verwaisten Dateien die im Textfeld dennoch gespeichert sind, unterhalb des Atto angezeigt.';
$string['showorphanedfilestable'] = 'Ergänze zusätzlich Tabellenanzeige "verwaiste Dateien"';
$string['showorphanedfilestable_desc'] = 'Wenn aktiviert, dann wird zusätzlich zur Anzahl der verwaisten Dateien eine Tabelle angezeigt, in der die verwaisten Dateien mit Zusatzinformationen und falls aktiviert mit Vorschau enthalten sind.';

$string['heading:showallfiles'] = 'Alle Dateien';
$string['showallfilescounter'] = 'Zeige Anzahl aller Dateien an';
$string['showallfilescounter_desc'] = '("enableplugin" needs to be activated)  Wenn aktiviert, dann wird die Anzahl aller Dateien die im Textfeld  gespeichert sind, unterhalb des Atto angezeigt.';
$string['showallfilestable'] = 'Ergänze zusätzlich Tabellenanzeige "Verwaiste Dateien"';
$string['showallfilestable_desc'] = 'Wenn aktiviert, dann wird zusätzlich zur Anzahl aller Dateien eine Tabelle angezeigt, in der alle Dateien mit Zusatzinformationen und falls aktiviert mit Vorschau enthalten sind.';

$string['heading:maxfilescounter'] = 'Maximale Dateienanzahl in der Anzeige';
$string['maxorphanedfilescounter'] = 'max. verwaiste Dateien';
$string['maxorphanedfilescounter_desc'] = 'Damit die Tabellen nicht zu viele Einträge haben kann hier die maximale Anzahl an verwaisten Dateien angegeben werden, die in der Tabelle angezeigt werden sollen. Vermeidet in Sonderfällen mit z.B. 1 Millionen verwaister Dateien, dass Tabelle zu groß wird.';
$string['maxallfilescounter'] = 'max. Alle Dateien';
$string['maxallfilescounter_desc'] = 'Damit die Tabellen nicht zu viele Einträge haben kann hier die maximale Anzahl allen Dateien angegeben werden, die in der Tabelle angezeigt werden sollen. Vermeidet in Sonderfällen mit z.B. 1 Millionen Dateien, dass Tabelle zu groß wird.';

$string['heading:additonal'] = 'Weitere Einstellungen';
$string['folderfornotorphandfiles'] = 'Name eines Ordners mit nicht verwaisten Dateien';
$string['folderfornotorphandfiles_desc'] = 'In manchen Fällen kann es Dateien geben, die nicht als verwaist angesehen werden sollen, obwohl sie nicht direkt im Textfeld verlinkt sind. Dateien in einem Orner mit diesem Namen oder in dessen Unterordner werden nicht als verwaist angezeigt. (Keine Leerzeichen, Punkte oder / nutzen)';
$string['loadsorttablejs'] = 'Sortierbare Tabelle aktivieren (sorttable.js)';
$string['loadsorttablejs_desc'] = 'Wenn im Moodle nicht bereits ein CDN integriert ist, der die Datei sorttable.js bereitstelt, so kann die im plugin integrierte sorttable.j-Datei aktiviert werden.';
