'use strict'

const debug = require('debug')('as-a')
const SimpleIni = require('simple-ini')
const read = require('fs').readFileSync
const exists = require('fs').existsSync
const join = require('path').join
const userHome = require('user-home')

const PROFILE_FOLDER = '.as-a'
const PROFILE_FILENAME = '.as-a.ini'

function readFile (filename) {
  return read(filename, 'utf-8')
}

function loadIniFile (filename) {
  const readIni = readFile.bind(null, filename)
  const ini = new SimpleIni(readIni)
  debug('loaded ini file', filename)
  return ini
}

function loadUserIni () {
  const fullProfileFilename = join(userHome, PROFILE_FILENAME)
  if (exists(fullProfileFilename)) {
    return loadIniFile(fullProfileFilename)
  }

  const profileInFolder = join(userHome, PROFILE_FOLDER, PROFILE_FILENAME)
  if (exists(profileInFolder)) {
    return loadIniFile(profileInFolder)
  }

  console.error('Cannot find file with env setting')
  console.error(fullProfileFilename, 'or', profileInFolder)
  console.error('Find help at https://github.com/bahmutov/as-a#readme')
  process.exit(-1)
}

module.exports = loadUserIni
