# as-a
> Runs a given command with additional environment settings for simple local development

[![NPM][as-a-icon] ][as-a-url]

[![Build status][as-a-ci-image] ][as-a-ci-url]
[![semantic-release][semantic-image] ][semantic-url]

`as-a` = run "as a" ...

## Install

    npm install --global as-a

You can run this tool without installing it

    npx as-a [section name] [command ...]

You can also install this tool locally as a dev dependency. In that case, it will start faster than using `npx as-a ...` without an install.

    npm i -D as-a
    npx as-a [section name] [command ...]

## Use

Create a file in your user's home directory `.as-a.ini`

    touch ~/.as-a.ini

Create separate sections for groups of environment settings. For example

```ini
; this is a test section
[test]
name=test
why=just because
```

Now you can run any command (with arguments) and add the section as environment variables.

    $ npm run env | grep why
    --- nothing ----
    $ as-a test npm run env | grep why
    why=just because

Recommended to keep private settings for DEV urls, secrets, etc.

## Multiple profiles

You can even use settings from multiple groups of settings using comma-separated list

```ini
[DEV]
username=tester
password=pass1234
[redis]
REDIST_HOST=localhost:4534
```

    as-a DEV,redis node index.js

## Use case

Read how to run a Redis server inside the Docker container using `as-a` in this
[gist](https://gist.github.com/bahmutov/f09b5895f5bb0f2a13f5).

## Secret folder

To better separate secrets from user home folder, you can place the `.as-a.ini` file
into subfolder `~/.as-a/.as-a.ini`.

## Local file

Sometimes it makes sense to have a local file `.as-a.ini` in the project's
folder (current working directory) with settings that should override
any section from the home folder's `.as-a.ini`. Just create such file and use
it.

Resolution

- local `.as-a.ini` + `~/.as-a.ini` => combination, local file wins
- local `.as-a.ini` + `~/.as-a/.as-a.ini` => combination, local file wins
- local `.as-a.ini` => just this file
- otherwise an error is thrown

### Small print

Author: Gleb Bahmutov &copy; 2016

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://glebbahmutov.com/blog/)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/as-a/issues) on Github

## MIT License

Copyright (c) 2016 Gleb Bahmutov

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[as-a-icon]: https://nodei.co/npm/as-a.svg?downloads=true
[as-a-url]: https://npmjs.org/package/as-a
[as-a-ci-image]: https://travis-ci.org/bahmutov/as-a.svg?branch=master
[as-a-ci-url]: https://travis-ci.org/bahmutov/as-a
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
