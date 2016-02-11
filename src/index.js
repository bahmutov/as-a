'use strict'

const debug = require('debug')('as-a')
const la = require('lazy-ass')
const is = require('check-more-types')
const join = require('path').join
const SimpleIni = require('simple-ini')
const read = require('fs').readFileSync
const exists = require('fs').existsSync
const spawn = require('cross-spawn-async')
const _ = require('lodash')

const PROFILE_FILENAME = '.as-a.ini'

function runCommand (command, extraEnv) {
  la(is.array(command), 'expected command and args array', command)
  la(command.length > 0, 'missing command, needs at least something', command)
  la(is.object(extraEnv), 'expected env object', extraEnv)

  return new Promise(function (resolve, reject) {
    const customEnv = _.assign({}, process.env, extraEnv)

    const spawnOptions = {
      env: customEnv,
      stdio: 'inherit'
    }
    const prog = command[0]
    const args = command.slice(1)
    debug(`running "${prog}" with extra env keys`, Object.keys(extraEnv))

    const proc = spawn(prog, args, spawnOptions)

    proc.on('error', (err) => {
      console.error('prog error')
      console.error(err)
      reject(err)
    })

    proc.on('close', (code) => {
      debug(`${prog} exit code ${code}`)
      if (code) {
        let msg = `${prog} exit code ${code}`
        console.error(msg)
        return reject(new Error(msg))
      }
      resolve()
    })
  })
}

function asA (name, command) {
  la(is.unemptyString(name), 'expected env name', name)
  la(is.array(command), 'expected command to run', command)

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
  if (!ini.hasSection(name)) {
    console.error('Cannot find section named', name)
    console.error('In the env settings file', fullProfileFilename)
    process.exit(-1)
  }
  const settings = ini[name]
  la(is.object(settings),
    'expected settings for section', name, 'not', settings)

  runCommand(command, settings)
    .catch(function (error) {
      console.error(error)
      process.exit(-1)
    })
}

module.exports = asA
