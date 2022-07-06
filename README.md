# ATTO Orphaned files indicator

You can see examples in the screenshots bellow.
This plugin adds a table below the editor and while editing the text each image or file that is deleted and not referenced any more will be added to the table.
Thus the user can see which files are still stored in the textfield but not referenced and if needed the user can delete orphaned files.
Attention. The deletion will be finished bei clicking on the Save-button. The cancel-button will discard the deletions and the files will still be stored.


## Requirements
- Moodle 3.9 or later.

## Installation
1. Add the plugin to /lib/editor/atto/plugins
2. Run the Moodle upgrade.
3. In the browser go to /admin/category.php?category=editoratto in Your moodle domain
4. In the editor_atto | toolbar field add the orphaned (You can add it right after the html button for example: other = html,orphaned)
5. Save the settings

## Records
Plugin was developed for SchulportalHessen

## Author
Andreas Schenkel (andreas.schenkel@schulportal.hessen.de)


# Changelog #
## [[v1.1.3]] ##

- fixed issue #1: is the requires version correct?
- fixed issue #2: styles.css not specific enough
- fixed issue #3: missing thirdpartylibs.xml file 
- fixed issue #4: german string in english lang pack
- fixed issue #5: consider adding github actions support

## [[v1.1.2]] ##
- fixed issue #5: plugin does not work in context where no files can be uploaded


## License ##

2022

This program is free software: you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software
Foundation, either version 3 of the License, or (at your option) any later
version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with
this program.  If not, see <http://www.gnu.org/licenses/>.
