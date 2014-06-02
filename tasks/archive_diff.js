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
        
        var done = this.async();
        
        var foo = grunt.util.spawn({
            cmd : 'git',
            args : [
                'describe'
            ]
        }, done);
        
//        console.log(foo);


//        grunt.util.spawn({
//            
//        },
//        function (error, result, code)
//        {
//            console.log(arguments);
//            done();
//
//        });

//        /**
//         * Helper used to find all changes between the last 2 git tags.
//         *
//         * @param {Object} grunt
//         * @param {Function} callback
//         * @return Void.
//         */
//        function archivePahs (callback) {
//            console.log('test');
//
//            grunt.util.spawn({
//                cmd : 'git',
//                args : [
//                    'describe'
//                ]
//            },
//            function (error, result) {
//                var treeIsh = result.stdout;
//                console.log('bla');
////                grunt.config.set('archiveOptions.treeIsh', treeIsh);
//                grunt.util.spawn({
//                    cmd : 'git',
//                    args : [
//                        'diff',
//                        '--diff-filter=' + diffFilter,
//                        '--name-only',
//                        treeIsh + '^'
//                    ]
//                },
//                callback);
//            });
//
//
//        }
//
//        archivePahs(function (error, result, code)
//        {
//            console.log('f');
//            var paths = result.stdout.split('\n');
//
//            console.log(paths);
//
//            return 0;
//        });




        // Run git describe and check if there is a tag name.
        // Run git diff to get all file names with source changes in the last tag
        // and his previous tag.
        // If there are no 2 tags, explain why you cant have a diff.
        // Run Git archive with the diff filenames as paths.

    });

};
