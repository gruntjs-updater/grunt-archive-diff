# grunt-archive-diff

> A Grunt plugin to export a git diff archive.  
  Differences are calculated between the last two tags.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-archive-diff --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-archive-diff');
```

## The "archive_diff" task

### Overview
In your project's Gruntfile, add a section named `archive_diff` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  archive_diff: {
    options: {
      // Task-specific options go here.
    }
  }
});
```

### Options

#### options.diffFilter
Type: `String`
Default value: `'ACMRTUXB'`

Select only files that are Added (A), Copied (C), Deleted (D), Modified (M), Renamed (R), have their type (i.e. regular file, symlink, submodule, …) changed (T), are Unmerged (U), are Unknown (X), or have had their pairing Broken (B).

`$ git diff --diff-filter`

#### options.outputDir
Type: `String`
Default value: `'.'`

Archive export destination directory.

#### options.prefix
Type: `String`
Default value: `''`

Archive filename prefix.  
_(Notice: The tag name will be used an suffix.)_

#### options.format
Type: `String`
Default value: `'zip'`

Format of the resulting archive: tar or zip.

`$ git archive --format`

### Usage Examples

#### Default Options

```js
grunt.initConfig({
    archive : {
        options: {
            diffFilter : 'ACMRTUXB',
            outputDir : '.',
            prefix : 'update',
            format : 'zip'
        }
    }
});
```

#### Custom Options

```js
grunt.initConfig({
    archive : {
        options: {
            diffFilter : 'A',
            outputDir : './new',
            prefix : 'new-in-',
            format : 'tar.gz'
        }
    }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
