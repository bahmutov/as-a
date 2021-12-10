'use strict'

const path = require('path')
const debug = require('debug')('as-a')
const la = require('lazy-ass')
const is = require('check-more-types')
const _ = require('lodash')
const runCommand = require('./run-command')
const loadUserIni = require('./load-user-ini')

/**
 * Collects all the settings from the user's .as-a.ini file(s)
 * and returns as a list of objects
 * @param {String} name
 * @returns {Object} All merged settings together
 */
function getSettings (name) {
  la(is.unemptyString(name), 'expected env name', name)

  if (name === '.') {
    name = path.basename(process.cwd())
    debug('using the current folder name "%s" as section', name)
  }

  const ini = loadUserIni()

  const envNames = name.split(',')
    .map(_.trim)
    .filter(is.unemptyString)
  debug('loading sections', envNames)

  const settings = envNames.map(function (envName) {
    if (!ini.hasSection(envName)) {
      console.error('Cannot find section named', envName)
      process.exit(-1)
    }
    const settings = ini[envName]
    la(is.object(settings),
      'expected settings for section', envName, 'not', settings)
    return settings
  })

  const combined = _.assign.apply(null, [{}].concat(settings))
  return combined
}

function asA (name, command) {
  la(is.unemptyString(name), 'expected env name', name)
  la(is.array(command), 'expected command to run', command)

  const combined = getSettings(name)

  runCommand(command, combined)
    .catch(function (error) {
      console.error(error)
      process.exit(-1)
    })
}

module.exports = { asA, getSettings }
