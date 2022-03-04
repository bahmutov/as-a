'use strict'

const debug = require('debug')('as-a')
const SimpleIni = require('simple-ini')
const read = require('fs').readFileSync
const exists = require('fs').existsSync
const join = require('path').join
const userHome = require('user-home')

const PROFILE_FOLDER = '.as-a'
const PROFILE_FILENAME = '.as-a.ini'

function readFiles (first, second) {
  const firstSource = read(first, 'utf-8')
  if (!second) {
    return firstSource
  }
  const secondSource = read(second, 'utf-8')

  return secondSource + '\n' + firstSource
}

function hasAliases (name) {
  return name.includes(',')
}

function loadIniFiles (filename1, filename2) {
  const readIni = readFiles.bind(null, filename1, filename2)
  const ini = new SimpleIni(readIni, { throwOnDuplicate: false })
  if (filename1) {
    debug('loaded ini file "%s"', filename1)
  }
  if (filename2) {
    debug('loaded ini file "%s"', filename2)
  }

  // some sections might have multiple names (aliases)
  // let's split them into separate sections
  Object.keys(ini).forEach(function (sectionName) {
    if (hasAliases(sectionName)) {
      debug('splitting section "%s" into multiple sections', sectionName)
      const aliases = sectionName.split(',').filter(Boolean).map(s => s.trim())
      aliases.forEach(function (alias) {
        ini[alias] = ini[sectionName]
      })
      delete ini[sectionName]
    }
  })

  return ini
}

function loadUserIni () {
  const localFile = join(process.cwd(), PROFILE_FILENAME)
  const localIniFilename = exists(localFile) ? localFile : undefined

  const fullProfileFilename = join(userHome, PROFILE_FILENAME)
  if (exists(fullProfileFilename)) {
    return loadIniFiles(fullProfileFilename, localIniFilename)
  }

  const profileInFolder = join(userHome, PROFILE_FOLDER, PROFILE_FILENAME)
  if (exists(profileInFolder)) {
    return loadIniFiles(profileInFolder, localIniFilename)
  }

  if (localIniFilename) {
    debug('returning just local ini file')
    return loadIniFiles(localIniFilename)
  }

  console.error('Cannot find file with env setting')
  console.error(fullProfileFilename, 'or', profileInFolder)
  console.error('Find help at https://github.com/bahmutov/as-a#readme')
  process.exit(-1)
}

module.exports = loadUserIni
