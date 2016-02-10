const debug = require('debug')('as-a')
const la = require('lazy-ass')
const is = require('check-more-types')
const join = require('path').join
const SimpleIni = require('simple-ini')
const read = require('fs').readFileSync
const exists = require('fs').existsSync

const PROFILE_FILENAME = '.as-a.ini'

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
}

module.exports = asA
