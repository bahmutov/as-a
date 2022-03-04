# as-a
> Runs a given command with additional environment settings for simple local development

[![NPM][as-a-icon] ][as-a-url]

[![ci status][ci image]][ci url]
[![semantic-release][semantic-image] ][semantic-url]

`as-a` = run "as a" ...

Watch [Use Utility as-a To Load Multiple Secrets And Pass To Cypress](https://youtu.be/GyjCGKzFjWA) to see how I pass multiple values via environment variables when launching Cypress test runner.

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

## Current folder

A good practice for me was naming a section after the folder name. For example, if the INI file has the following:

```ini
[my-server-repo]
DB_USERNAME=user1234
```

Then we can inject the variables by running in the folder "my-server-repo" using "."

```
/my/folders/my-server-repo: $ as-a . node ./start
# injects section "my-server-repo"
```

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

**Tip:** when using a local `.as-a.ini` file make sure to `git ignore .as-a.ini` to avoid accidentally committing this file to the repository.

Resolution

- local `.as-a.ini` + `~/.as-a.ini` => combination, local file wins
- local `.as-a.ini` + `~/.as-a/.as-a.ini` => combination, local file wins
- local `.as-a.ini` => just this file
- otherwise an error is thrown


## Section aliases

Just like you can use multiple sections, the INI sections themselves can have multiple aliases. For example, you can have the same section under two or more names to avoid duplication:

```ini
; you can use these environment variables by using name "user" or "personal"
[user, personal]
NAME=...
ID=...
```

These two commands are equivalent

```shell
$ as-a user ...
$ as-a personal ...
```

## Version

To see the version of the installed `as-a` run it without arguments

```
$ as-a
as-a@2.1.0
 > Runs a given command with additional environment settings
 > for simple local development
use    : as-a <env settings name> [command with options]
example: as-a DEV node client.js --request foo
```

## NPM module API

### getSettings

Loads the specified settings sections and returns merged object

```js
const {getSettings} = require('as-a')
// load sections [db] and [app]
getSettings('db,app') // {DB_HOST:...,USERNAME:...}
```

## Read

- watch [Use Utility as-a To Load Multiple Secrets And Pass To Cypress](https://youtu.be/GyjCGKzFjWA)
- [Keep passwords secret in E2E tests](https://glebbahmutov.com/blog/keep-passwords-secret-in-e2e-tests/)
- recommended to watch [Passing the environment variables to Cypress](https://youtu.be/jAiYePsxPl4)

## Small print

Author: Gleb Bahmutov &copy; 2016

- [@bahmutov](https://twitter.com/bahmutov)
- [glebbahmutov.com](https://glebbahmutov.com)
- [blog](https://glebbahmutov.com/blog/)
- [videos](https://www.youtube.com/glebbahmutov)
- [presentations](https://slides.com/bahmutov)
- [cypress.tips](https://cypress.tips)

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
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release

[ci image]: https://github.com/bahmutov/as-a/workflows/ci/badge.svg?branch=master
[ci url]: https://github.com/bahmutov/as-a/actions
