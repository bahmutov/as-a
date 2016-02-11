# as-a
> Runs a given command with additional environment settings for simple local development

[![NPM][as-a-icon] ][as-a-url]

[![Build status][as-a-ci-image] ][as-a-ci-url]
[![semantic-release][semantic-image] ][semantic-url]

`as-a` = run "as a" ...

## Install

    npm install --global as-a

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

## Use case

Read how to run a Redis server inside the Docker container using `as-a` in this
[gist](https://gist.github.com/bahmutov/f09b5895f5bb0f2a13f5).

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

[as-a-icon]: https://nodei.co/npm/as-a.png?downloads=true
[as-a-url]: https://npmjs.org/package/as-a
[as-a-ci-image]: https://travis-ci.org/bahmutov/as-a.png?branch=master
[as-a-ci-url]: https://travis-ci.org/bahmutov/as-a
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
