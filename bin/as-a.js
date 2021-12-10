#!/usr/bin/env node

const debug = require('debug')('as-a')
const la = require('lazy-ass')
const is = require('check-more-types')
const join = require('path').join

require('simple-bin-help')({
  minArguments: 4,
  packagePath: join(__dirname, '..', 'package.json'),
  help: 'use    : as-a <env settings name> [command with options]\n' +
    'example: as-a DEV node client.js --request foo'
})

const name = process.argv[2]
const command = process.argv.slice(3)
debug('name and command: %s - %o', name, command)

const asA = require('..').asA
la(is.fn(asA), 'expected function', asA)
asA(name, command)
