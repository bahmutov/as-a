#!/usr/bin/env node

const debug = require('debug')('as-a')
const la = require('lazy-ass')
const is = require('check-more-types')

require('simple-bin-help')({
  minArguments: 3,
  packagePath: __dirname + '/../package.json',
  help: 'use: as-a <env settings name> [command with options]'
});

const name = process.argv[2]
const command = process.argv.slice(3)
console.log(name, '-', command)
