'use strict'

const debug = require('debug')('as-a')
const SimpleIni = require('simple-ini')
const read = require('fs').readFileSync
const exists = require('fs').existsSync
const join = require('path').join

const PROFILE_FILENAME = '.as-a.ini'

function loadUserIni () {
  const userHome = require('user-home')
  const fullProfileFilename = join(userHome, PROFILE_FILENAME)

  if (!exists(fullProfileFilename)) {
    console.error('Cannot find file with env setting')
    console.error(fullProfileFilename)
    process.exit(-1)
  }

  const ini = new SimpleIni(function () {
    return read(fullProfileFilename, 'utf-8')
  })
  debug('loaded ini file', fullProfileFilename)
  return ini
}

module.exports = loadUserIni
