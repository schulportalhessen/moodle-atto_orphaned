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

    /*
    * @package    atto_orphaned
    * @copyright  2022 Andreas Schenkel, SchulportalHessen
    * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
    */

    /**
     * @module moodle-atto_orphaned-button
     */

    /**
     * Atto text editor orphand files plugin.
     *
     * @namespace M.atto_orphaned
     * @class button
     * @extends M.editor_atto.EditorPlugin
     */

    // draftId is same as itemid
    var draftIds = {};
    var client_ids = {};
    var scope = {};
    /**
     * On first access counted links do not change. Indicator is used to show already existing orphaned files on first access.
     */
    var firstAccess = {};
    var force = {};
    /**
     *  Use of linkCounter to indicate changes in the textfield that depends on changes that can create orhaned files.
     */
    var linkCounter = {};
    var baseUrl = {};
    /**
     *  Boolean to store information wether the WYSIWYG or html codeeditor is active
     */
    var codeMirrorIsActive = {};
    var allFiles = {};
    var deleted = {};
    var buttons = {};

    Y.namespace('M.atto_orphaned').Button = Y.Base.create('button', Y.M.editor_atto.EditorPlugin, [], {
        // To store area where the information about orphaned files will be rendered. Area will be appended below the attoeditor.
        orpanedArea: null,
        // In config all the parameters that should be usable in js will are stored.
        config: null,
        elementId: null,

        initializer: function (config) {
            // Make the parematers stored in config accessible in all scope.
            this.config = config;
            // In some cases the plugin should not be usable.
            if ((this.config.enablePlugin == '0') ||
                (this.config.hascapability != '1') ||
                ((this.config.showAllFilesCounter == '0') && (this.config.showOrphanedFilesCounter == '0'))) {
                return;
            }

            var host = this.get('host');
            var wrapper = host._wrapper;
            var elementId = host.get('elementid');
            this.elementId = elementId;
            var options = this.get('host').get('filepickeroptions');
            if (options.length == 0) {
                // should not be any files because there is no repository allowed to upload and store files in this context
                return;
            }
            var optionsImage = this.get('host').get('filepickeroptions').image;

            // Set some variables for each editor that is visible in the page.
            client_ids[elementId] = optionsImage.client_id;
            firstAccess[elementId] = 1;
            force[elementId] = false;
            linkCounter[elementId] = 0;
            codeMirrorIsActive[elementId] = false;
            allFiles[elementId] = {};
            deleted[elementId] = 0;

            for (var optiontype in options) {
                if (typeof options[optiontype].itemid !== "undefined") {
                    draftIds[elementId] = options[optiontype].itemid;
                }
            }

            var _usercontext = this.config.usercontext;
            baseUrl[elementId] = M.cfg.wwwroot + '/draftfile.php/' + _usercontext + '/user/draft/' + draftIds[elementId];

            this.orpanedArea = Y.Node.create(
                '<div id="js-orphaned-wrapper-' + elementId + '" class="js-orphaned-wrapper">' +
                this.renderOrphanedFilesArea(elementId) +
                this.renderAllFilesArea(elementId) +
                '</div>'
            );
            wrapper.appendChild(this.orpanedArea);

            // Store "this" global in 'scope' to be able to delete orphaned files from different scope
            scope[elementId] = this;

            this.get('host').on('pluginsloaded', function () {
                setTimeout(function () {
                    force[elementId] = false;
                    scope[elementId]._onChangeParser();
                }, 500);
                // Listener to recognize every default editor changes
                // Hack is needed in _onChangeParser because I do not know how to submit parameter "force"
                force[elementId] = false;
                this.get('host').on('atto:selectionchanged', this._onChangeParser, this);

                // Get the editor that belongs to the elementId, then find the atto_html_button and ad an onclick event-listener to the button.
                // Do some work in _toggleCodeMirrorStatus when toggeling the codemirror-editor on or off.
                var editor = document.getElementById(elementId);
                buttons[elementId] = editor.previousSibling.getElementsByClassName("atto_html_button")[0];
                buttons[elementId].onclick = function () {
                    setTimeout(function () {
                        scope[elementId]._toggleCodeMirrorStatus(elementId);
                    }, 500);

                };
            }, this);
        },

        renderOrphanedFilesArea: function (elementId) {
            // console.log("renderOrphanedFilesArea " + elementId);
            var showorphandefileshtml = '';
            if (this.config.showOrphanedFilesCounter == '1') {
                if (this.config.showOrphanedFilesTable == '1') {
                    showorphandefileshtml =
                        '<details class="orphaned-files-details" id="orphaned-files-details-' + elementId + '" open>' +
                        '<summary>' +
                        '<span class="orphaned-label align-middle">' +
                        M.util.get_string('label:dropdownorphanedfilescount', 'atto_orphaned') +
                        '<span class="orphanedFilesCount" id="orphanedFilesCount-' + elementId +
                        '">substitute orphanedFilesCount</span>' +
                        M.util.get_string('label:filescountermaxpre', 'atto_orphaned') +
                        '<span class="maxcounter">' + this.config.maxOrphanedFilesCounter +
                        ' ' + M.util.get_string('label:filescountermaxpost', 'atto_orphaned') +
                        '</span>' +
                        '</span>' +
                        '</summary>' +
                        '<span id="orphanedFilesArea-' + elementId + '" class="align-middle shadow"></span>' +
                        '</details>';
                } else {
                    showorphandefileshtml =
                        '<div class="orphaned-files-details" id="orphaned-files-details-' + elementId + '">' +
                        '<span class="orphaned-label align-middle">' +
                        M.util.get_string('label:dropdownorphanedfilescount', 'atto_orphaned') +
                        '<span class="orphanedFilesCount" id="orphanedFilesCount-' + elementId +
                        '">substitute orphanedFilesCount</span>' +
                        '</span>' +
                        '</div>';
                }
            }
            return showorphandefileshtml;
        },

        renderAllFilesArea: function (elementId) {
            var showallfileshtml = '';
            if (this.config.showAllFilesCounter == '1') {
                if (this.config.showAllFilesTable == '1') {
                    showallfileshtml =
                        '<details class="all-files-details" id="all-files-details-' + elementId + '">' +
                        '<summary>' +
                        '<span class="orphaned-label align-middle">' +
                        M.util.get_string('label:dropdownallfilescount', 'atto_orphaned') +
                        '<span class="allFilesCount" id="allFilesCount-' + elementId + '">x</span>' +
                        M.util.get_string('label:filescountermaxpre', 'atto_orphaned') +
                        '<span class="maxcounter">' + this.config.maxAllFilesCounter +
                        ' ' + M.util.get_string('label:filescountermaxpost', 'atto_orphaned') +
                        '</span>' +
                        '</span>' +
                        '</summary>' +
                        '<span id="allFilesTableArea-' + elementId + '" class="align-middle">x</span>' +
                        '</details>';
                } else {
                    showallfileshtml =
                        '<div  class="all-files-details" id="all-files-details-' + elementId + '">' +
                        '<span class="orphaned-label align-middle">' +
                        M.util.get_string('label:dropdownallfilescount', 'atto_orphaned') +
                        '<span class="allFilesCount" id="allFilesCount-' + elementId + '">x</span>' +
                        '</span>' +
                        '</div>';
                }

            }
            return showallfileshtml;
        },

        /**
         * @param {string} elementId textarea in an each editor has an id like page_id, introeditor_id, ...
         */
        _toggleCodeMirrorStatus: function (elementId) {
            var observer = null;

            var editor = document.getElementById(elementId);
            var nextSibling = editor.nextSibling;
            var codeMirrorExists = false;
            if (typeof nextSibling.classList !== "undefined") {
                codeMirrorExists = nextSibling.classList.contains("CodeMirror");
            }

            if (codeMirrorExists) {
                var CodeMirror = Y.one("#" + nextSibling.id);
                codeMirrorIsActive[elementId] = true;
                // Move orpaned-wrapper ato the bottom by removing and inserting
                Y.one('#js-orphaned-wrapper-' + elementId).remove();
                setTimeout(function () {
                    CodeMirror.insert(scope[elementId].orpanedArea, 'after');
                }, 500);
                // Search CodeMirror in dom, then find the corosponding CodeMirror-code as target
                var codemirror = document.querySelector("#" + nextSibling.id);
                var target = codemirror.querySelector('.CodeMirror-code');
                // Create an observer instance.
                observer = new MutationObserver(function () {
                    force[elementId] = true;
                    scope[elementId]._onChangeParser();
                });
                // Pass in the target node, as well as the observer options.
                observer.observe(target, {
                    subtree: true,
                    childList: true,
                    attributes: true
                });
            } else {
                codeMirrorIsActive[elementId] = false;
                Y.one('#js-orphaned-wrapper-' + elementId).remove();
                setTimeout(function () {
                    var host = scope[elementId].get('host');
                    var wrapper = host._wrapper;
                    wrapper.appendChild(scope[elementId].orpanedArea);
                }, 500);

                if (null !== observer) {
                    observer.disconnect();
                }
            }
        },

        /**
         * This function is called when there are changes in the editor.
         */
        _onChangeParser: function () {
            var oldLinkCounter = linkCounter[this.elementId];
            linkCounter[this.elementId] = Object.keys(this._getUsedFiles(this.elementId)).length;
            // On first access the initial creation of the tables have to be done and the inital _showOrphanedFiles has to be done.
            // Also creat the actual tables when the counted links to files changes in comparison to the previous count because then there might
            // be newly generated orphaned files.
            if (firstAccess[this.elementId] == 1 || force[this.elementId] == true || (linkCounter[this.elementId] != oldLinkCounter)) {
                firstAccess[this.elementId] = 0;
                scope[this.elementId]._showOrphanedFiles(this.elementId);
            }
        },

        /**
         * Todo ... das modale fenster schließen, nachdem man gelöscht hat ... dabei muss der button aktualisiert werden.
         * @param {string} elementId textarea in an each editor has an id like page_id, introeditor_id, ...
         */
        _showOrphanedFiles: function (elementId) {
            // console.log("_showOrphanedFiles " + elementId);
            if (codeMirrorIsActive[elementId]) {
                if (deleted[elementId] === 1) {
                    // If a file is deleted during codemirror is activ then the list of all files has to be updated.
                    allFiles[elementId] = scope[elementId]._getAllFilesAjax('/', null, elementId);
                    deleted[elementId] = 0;
                }
            } else {
                allFiles[elementId] = scope[elementId]._getAllFilesAjax('/', null, elementId);
                // Set force to false to prevent ajax-request on every keystroke.
                force[elementId] = false;
                deleted[elementId] = 0;
            }

            // Now show information about orphaned files if activated by showOrphanedFiles = true
            if (this.config.showOrphanedFilesCounter == '1') {
                var usedFiles = this._getUsedFiles(elementId);
                var orphanedFiles = this._getUnusedFiles(allFiles[elementId], usedFiles);
                orphanedFiles = orphanedFiles.slice(0, this.config.maxOrphanedFilesCounter);
                Y.one('#orphanedFilesCount-' + elementId).empty();
                Y.one('#orphanedFilesCount-' + elementId).insert(Y.Node.create(orphanedFiles.length));
                // Table
                if (this.config.showOrphanedFilesTable == '1') {
                    Y.one('#orphanedFilesArea-' + elementId).empty();
                    // Only if orphaned files exists add the table.
                    if (orphanedFiles.length > 0) {
                        var node = Y.Node.create(this.renderTable(true, "orphanedFilesTable", orphanedFiles, elementId));
                        Y.one('#orphanedFilesArea-' + elementId).insert(node);
                        if (typeof sorttable !== "undefined") {
                            sorttable.makeSortable(Y.one('#orphanedFilesTable-' + elementId).getDOMNode());
                        }
                    }
                }
            }
            // Now show information about allfiles if activated by showAllFiles = true
            if (this.config.showAllFilesCounter == '1') {
                var allFilesTmp = allFiles[elementId];
                allFilesTmp = Object.fromEntries(Object.entries(allFilesTmp).slice(0, this.config.maxAllFilesCounter));
                // Update the view.
                Y.one('#allFilesCount-' + elementId).empty();
                Y.one('#allFilesCount-' + elementId).insert(Y.Node.create(Object.keys(allFiles[elementId]).length));
                // Table
                if (this.config.showAllFilesTable == '1') {
                    Y.one('#allFilesTableArea-' + elementId).empty();
                    // Only if orphaned files exists add the table.
                    if (Object.keys(allFiles[elementId]).length > 0) {
                        Y.one('#allFilesTableArea-' + elementId).insert(Y.Node.create(this.renderTable(false, "allFilesTable", allFilesTmp, elementId)));
                        if (typeof sorttable !== "undefined") {
                            sorttable.makeSortable(Y.one('#allFilesTable-' + elementId).getDOMNode());
                        }
                    }
                }
            }
        },

        /**
         * Render for each type the allFilesTable or orphanedFilesTable.
         * @param {boolean} showTrashIcon wether or not to show a trashicon to be able to delete an orphaned file
         * @param {*} type allFilesTable or orphanedTable
         * @param {string} files
         * @param {boolean} elementId textarea in an each editor has an id like page_id, introeditor_id, ...
         * @returns {string} String containing the html-code for a table with all rows for the relevant files
         */
        renderTable: function (showTrashIcon, type, files, elementId) {
            var tableBeginning = '<table id="' + type + '-' + elementId + '" class="sortable table table-sm table-hover table-bordered">' +
                '<caption>' + M.util.get_string('' + type + ':caption', 'atto_orphaned') + '</caption>' +
                '<thead>' +
                '<tr>' +
                '<th scope="col" title="' + M.util.get_string('tableheadersortorder:referencecount', 'atto_orphaned')
                + '" style="width:25px;" ></th>' +
                '<th scope="col" title="' + M.util.get_string('tableheadersortorder:mimetype', 'atto_orphaned') + '">'
                + M.util.get_string('tableheader:preview', 'atto_orphaned') + '</th>' +
                '<th scope="col" title="' + M.util.get_string('tableheader:filesize', 'atto_orphaned') + '">'
                + M.util.get_string('tableheader:filesize', 'atto_orphaned') + '</th>' +
                '<th scope="col" title="' + M.util.get_string('tableheader:filename', 'atto_orphaned') + '">'
                + M.util.get_string('tableheader:filename', 'atto_orphaned') + '</th>' +
                '<th scope="col" title="' + M.util.get_string('tableheader:path', 'atto_orphaned') + '">'
                + M.util.get_string('tableheader:path', 'atto_orphaned') + '</th>' +
                '<th scope="col" title="' + M.util.get_string('tableheader:creationdate', 'atto_orphaned') + '">'
                + M.util.get_string('tableheader:creationdate', 'atto_orphaned') + '</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>';
            var allTablerows = '';
            for (var file in files) {
                allTablerows = allTablerows + this.renderTableRow(showTrashIcon, files, file, elementId);
            }
            return tableBeginning + allTablerows + '</tbody></table>';
        },

        /**
         * Renders a row in the table for each file.
         * @param {boolean} showTrashIcon
         * @param {string} files
         * @param {string} filesKey
         * @param {string} elementId textarea in an each editor has an id like page_id, introeditor_id, ...
         * @returns {string} String containing the html-code for a row in the table
         */
        renderTableRow: function (showTrashIcon, files, filesKey, elementId) {
            return '<tr>' +
                this.renderTdTrashIcon(files[filesKey], showTrashIcon, elementId) +
                this.renderTdPreview(files[filesKey], elementId) +
                this.renderTdFilesize(files[filesKey]) +
                this.renderTdFilename(files[filesKey], elementId) +
                this.renderTdFilepath(files[filesKey]) +
                this.renderTdDate(files[filesKey]) +
                '</tr>';
        },

        isImage: function (filename) {
            return filename.match(/.(jpg|jpeg|png|gif)$/i);
        },
        isAudio: function (filename) {
            return filename.match(/.(mp3|aac|flac|m4a|oga|ogg|wav)$/i);
        },
        isVideo: function (filename) {
            return filename.match(/.(mp4|m4v|ogv|webm|fmp4|mov)$/i);
        },

        renderTdTrashIcon: function (file, showTrashIcon, elementId) {
            var trash = '';
            if (showTrashIcon) {
                trash = '<button aria-label="Delete" type="button" '
                    + 'class="singledeletion" onclick="Y.M.atto_orphaned.Button.prototype._deleteFile(\''
                    + file.filepath + '\', \'' + file.filename + '\', \'' + elementId + '\')">' +
                    '<i class="fa fa-trash" aria-hidden="true" title="' + M.util.get_string('label:trashicon', 'atto_orphaned')
                    + '"></i></button>' +
                    '<span class="sr-only">' + M.util.get_string('label:trashicon', 'atto_orphaned') + '</span>';
            }
            return '<td sorttable_customkey="' + file.refcount + '">' +
                '' + trash +
                '</td>';
        },
        renderTdPreview: function (file, elementId) {
            var linkcontent = file.filename;
            if (this.isImage(file.filename) && (this.config.showPreviewOfImage == '1')) {
                linkcontent = ' <img class="atto-orphaned-img" src="' + baseUrl[elementId] + file.filepath + file.filename + '?preview=thumb"' + ' alt="'
                    + file.filepath + file.filename + '" class="atto-orphaned-preview-image">';
            }
            if (this.isAudio(file.filename) && (this.config.showPreviewOfAudio == '1')) {
                linkcontent = '<audio controls preload="none">' +
                    '<source src="' +
                    baseUrl[elementId] + file.filepath + file.filename +
                    '" type="audio/ogg">' +
                    '</audio>';
            }
            if (this.isVideo(file.filename) && (this.config.showPreviewOfVideo == '1')) {
                linkcontent = '<video class="atto-orphaned-preview-video" controls preload="none" title="' + file.filename + '">' +
                    '<source src="' +
                    baseUrl[elementId] + file.filepath + file.filename +
                    '" type="video/mp4">' +
                    '   ' +
                    '</video><br>';
            }
            return '<td sorttable_customkey="' + file.mimetype + '">' +
                ' <a target="_blank" href="' + baseUrl[elementId] + file.filepath + file.filename + '">' +
                '' + linkcontent +
                '</a>' +
                '</td>';
        },
        renderTdFilesize: function (file) {
            return '<td sorttable_customkey="' + file.size + '">' +
                '' + file.filesize +
                '</td>';
        },
        renderFileDetails: function (file) {
            var details = '';
            // Appened details like referenz-status, mimetype, ...
            if (this.isImage(file.filename)) {
                details = M.util.get_string('dimensions', 'atto_orphaned') + file.dimensions;
            }
            var showIsReferenz = this.config.showIsReferenz;
            var showReferenceCount = this.config.showReferenceCount;
            var showMimetype = this.config.showMimetype;

            if (showReferenceCount == '1' && !file.isref && file.refcount > 0) {
                details = details + '<br><i class="fa fa-chain" aria-hidden="true"></i> ' +
                    M.util.get_string('referencecount', 'atto_orphaned') +
                    (typeof file.refcount != 'undefined' ? file.refcount : '...');
            }

            var stringIsReferenz = M.util.get_string('isreferenz', 'atto_orphaned');
            // var stringIsNotReferenz = M.util.get_string('isnotreferenz', 'atto_orphaned');
            if (showIsReferenz == '1' && file.isref) {
                details = details + (file.isref ? '<br><i class="fa fa-reply fa-flip-horizontal" aria-hidden="true"></i> ' + stringIsReferenz : '');
            }

            if (showMimetype == '1') {
                details = details + '<br>' + file.mimetype;
            }
            return details;
        },
        renderTdFilename: function (file, elementId) {
            var details = this.renderFileDetails(file);
            return '<td>' +
                '<a target="_blank" href="' + baseUrl[elementId] + file.filepath + file.filename + '">' + file.filename + '</a>' +
                '<br>' + details +
                '</td>';
        },
        renderTdFilepath: function (file) {
            return '<td>' +
                '' + file.filepath +
                '</td>';
        },
        renderTdDate: function (file) {
            return '<td>' +
                '' + file.datecreated_f +
                '</td>';
        },
        _fetchDraftFiles: function (filepath, elementId) {
            // 1. post-parameter
            var params = {
                sesskey: M.cfg.sesskey,
                client_id: client_ids[elementId],
                filepath: filepath,
                itemid: draftIds[elementId]
            };
            // 2. Create URL including ?action=list
            var url = M.cfg.wwwroot + '/repository/draftfiles_ajax.php?action=list';
            // 3. Do ajax-request with paramters params and url
            var response = Y.io(url, {
                sync: true,
                data: params,
                method: 'POST'
            });
            if (response.status === 200) {
                return JSON.parse(response.responseText);
            } else {
                return null;
            }
        },
        /**
         * Recursiv search for all the files that are stored in folders and subfolders
         *
         * @param {string} dirPath
         * @param {Object} allFilesStore
         * @param {string} elementId textarea in an each editor has an id like page_id, introeditor_id, ...
         * @returns {Object} of all draft files with key containing path AND filname (obj.filepath.substring(1) + obj.filename)
         */
        _getAllFilesAjax: function (dirPath, allFilesStore, elementId) {
            // console.log("_getAllFilesAjax");
            allFilesStore = allFilesStore || {};
            var responseObject = this._fetchDraftFiles(dirPath, elementId);
            if (null !== responseObject && responseObject.filecount > 0) {
                responseObject.list.forEach(function (obj) {
                    if (obj.filename === '.') {
                        allFilesStore = scope[elementId]._getAllFilesAjax(obj.filepath, allFilesStore, elementId);
                    } else {
                        allFilesStore[obj.filepath.substring(1) + obj.filename] =
                        {
                            filepath: obj.filepath,
                            filename: obj.filename,
                            datecreated: obj.datecreated,
                            datecreated_f: obj.datecreated_f,
                            dimensions: obj.dimensions,
                            size: obj.size,
                            filesize: obj.filesize,
                            isref: obj.isref,
                            refcount: obj.refcount,
                            mimetype: obj.mimetype
                        };
                    }
                });
            }
            return allFilesStore;
        },
        /**
         * Return the list of files used in the area.
         *
         * @method _getUsedFiles
         * @param {string} elementId textarea in an each editor has an id like page_id, introeditor_id, ...
         * @return {Object} List of files used where the keys are the name including the pathname of the files, the value is true.
         * @private
         */
        _getUsedFiles: function (elementId) {
            var content;
            if (codeMirrorIsActive[elementId]) {
                content = document.getElementById(elementId).value;
            } else {
                content = this.get('host').getCleanHTML();
            }

            var baseUrlTmp = baseUrl[elementId] + '/';
            var pattern = new RegExp(baseUrlTmp.replace(/[\-\/\\\^$*+?.()|\[\]{}]/g, '\\$&') + "(.+?)[\\?\"']", 'gm'),
                match = '',
                usedFiles = {};

            while ((match = pattern.exec(content)) !== null) {
                usedFiles[decodeURIComponent(match[1])] = true;
            }
            return usedFiles;
        },

        /**
         * @method _deleteFile
         * @param {*} filepath
         * @param {*} filename
         * @param {string} elementId textarea in an each editor has an id like page_id, introeditor_id, ...
         */
        _deleteFile: function (filepath, filename, elementId) {
            // 1. post-parameter
            var params = {
                sesskey: M.cfg.sesskey,
                client_id: client_ids[elementId],
                filepath: filepath,
                filename: filename,
                itemid: draftIds[elementId]
            };
            // 2. Create URL including ?action=delete
            var url = M.cfg.wwwroot + '/repository/draftfiles_ajax.php?action=delete';
            // 3. Do ajax-request with paramters params and url
            var response = Y.io(url, {
                sync: true,
                data: params,
                method: 'POST'
            });
            if (response.status === 200) {
                deleted[elementId] = 1;
                force[elementId] = true;
                scope[elementId]._onChangeParser();
            }
        },

        /**
         * Return an array of unused files.
         *
         * @param {Object} allFiles Where the keys are the file names including the filepath.
         * @param {Object} usedFiles Where the keys are the file names including the filepath.
         * @return {Array} Of file names.
         */
        _getUnusedFiles: function (allFiles, usedFiles) {
            var key,
                list = [];
            for (key in allFiles) {
                // Files, that are stored in a folder eg "notOrphaned" or a subfolder should not be marked as orphaned
                var firstfoldername = "notOrphaned";
                firstfoldername = this.config.folderForNotOrphandFiles;
                var firstfolder = key.substring(0, firstfoldername.length);
                // If firstfolder != firstfoldername then the file is not stored in a folder that should not be checked.
                // All files in folder firstfoldername will not be interpredet as orphaned.
                if (!usedFiles[key] && firstfolder != firstfoldername) {
                    list.push(allFiles[key]);
                }
            }
            /**
             * Sorting
             * @param {*} x
             * @param {*} y
             * @returns {Array}
             */
            function SortArray(x, y) {
                if (x.datecreated < y.datecreated) { return 1; }
                if (x.datecreated > y.datecreated) { return -1; }
                return 0;
            }
            list = list.sort(SortArray);
            return list;
        },
    });