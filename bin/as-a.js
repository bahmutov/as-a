#!/usr/bin/env node

const debug = require('debug')('as-a')
const la = require('lazy-ass')
const is = require('check-more-types')
const join = require('path').join

require('simple-bin-help')({
  minArguments: 3,
  packagePath: join(__dirname, '..', 'package.json'),
  help: 'use: as-a <env settings name> [command with options]'
})

const name = process.argv[2]
const command = process.argv.slice(3)
debug(name, '-', command)

const asA = require('..')
la(is.fn(asA), 'expected function', asA)
asA(name, command)
