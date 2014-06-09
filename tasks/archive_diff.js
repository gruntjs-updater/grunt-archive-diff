/*
 * grunt-archive-diff
 * https://github.com/WitteStier/grunt-archive-diff
 *
 * Copyright (c) 2014 WitteStier
 * Licensed under the MIT license.
 */

'use strict';

var async = require('async');

module.exports = function (grunt)
{
    // TODO Update title
    grunt.registerMultiTask('archive_diff', 'A Grunt plugin to export a git diff archive.', function ()
    {
        var options = this.options({
            diffFilter : 'ACMRTUXB',
            outputDir : '.',
            prefix : '',
            format : 'zip' // tar.gz
        });

        var done = this.async(),
            treeIsh,
            path;

        /**
         * Run git describe to get the last git tag.
         * 
         * @param {Function} callback
         * @return {Void}
         */
        function describe (callback)
        {
            grunt.log.debug('Find last Git tag.');

            grunt.util.spawn({
                cmd : 'git',
                args : [
                    'describe'
                ]
            },
            callback);

            // End.
        }

        /**
         * Run git diff to get the filename of the changed files.
         * 
         * @param {Object} result
         * @param {Number} code
         * @param {Function} callback
         * @return {Void}
         */
        function diff (result, code, callback)
        {
            grunt.log.debug('Find filnames of changed files.');

            treeIsh = result.toString();

            grunt.util.spawn({
                cmd : 'git',
                args : [
                    'diff',
                    '--diff-filter=' + options.diffFilter,
                    '--name-only',
                    treeIsh + '^'
                ]
            },
            callback);

            // End.
        }

        /**
         * Run git archive to archive the changed files.
         * 
         * @param {Object} error
         * @param {Object} result
         * @param {Number} code
         * @return {Number} Exit code.
         */
        function archive (error, result, code)
        {
            grunt.log.debug('Archive changed files.');

            if (error) {
                grunt.fail.fatal(error, code);
            }

            path = result.toString().split('\n');

            var args = [
                'archive',
                '--format=' + options.format,
                '--output=' + options.outputDir + '/' + options.prefix + treeIsh + '.' + options.format,
                treeIsh + '^'
            ].concat(path);

            grunt.util.spawn({
                cmd : 'git',
                args : args
            },
            done);

            return 1;
        }

        async.waterfall([
            describe,
            diff
        ], archive);

        // End.
    });

};