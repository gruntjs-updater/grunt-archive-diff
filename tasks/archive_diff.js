/*
 * grunt-archive-diff
 * https://github.com/WitteStier/grunt-archive-diff
 * 
 * TODO
 * 
 * Get the diff between two tags and calculate the differences
 * and use git archive to export all files with the differences.
 * 
 * options
 * 
 * OutputDir
 * diffFilter
 * 
 * 
 * 
 * 
 *       gitarchive: {
 *           update: {
 *               options: {
 *                   treeIsh: '<%= archiveOptions.treeIsh %>',
 *                   output: '../build/update-<%= archiveOptions.treeIsh %>.zip',
 *                   path: '<%= archiveOptions.paths %>'
 *               }
 *           }
 *       }
 *       
 *       
 *       
 * ----> TODO
 * 1. Make git describe a single method and check the outcome.
 * 2. Make git diff a single method and check the outcome.
 * 3. Archive the diff outcome.
 *
 * Copyright (c) 2014 WitteStier
 * Licensed under the MIT license.
 */

'use strict';

var async = require('async');

module.exports = function (grunt)
{
    // TODO Update title
    grunt.registerMultiTask('archive_diff', 'The best Grunt plugin ever.', function ()
    {
        var options = this.options({
            diffFilter : 'ACMRTUXB',
            outputDir : '/',
            prefix : 'update',
            format : 'zip' // tar.gz
        });
        var treeIsh;
        var path;

        var done = this.async();

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
                '--output=./update-' + treeIsh + '.zip',
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