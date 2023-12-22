const test = require('ava')
const loadUserIni = require('../src/load-user-ini')
const { getSettingsFrom } = require('../src/index')

test('has ini sections', (t) => {
  const ini = loadUserIni()
  t.true(ini.hasSection('demo'), 'has demo section')
  t.true(ini.hasSection('as-a'), 'has as-a section')
  t.false(ini.hasSection('does not exist'), 'does not have unknown section')
})

test('has section under an alias', (t) => {
  const ini = loadUserIni()
  t.true(ini.hasSection('name-one'), 'has section name-one')
  t.true(ini.hasSection('name-two'), 'has section name-two')
  t.true(ini.hasSection('name-three'), 'has section name-three')
  t.false(
    ini.hasSection('name-one, name-two, name-three'),
    'initial section was removed',
  )
})

test('ignores empty aliases', (t) => {
  const ini = loadUserIni()
  t.true(ini.hasSection('alias1'), 'has section alias1')
  t.true(ini.hasSection('alias2'), 'has section alias2')
})

test('trims trailing spaces', (t) => {
  const ini = loadUserIni(true)
  t.true(
    ini.hasSection('section-with-trailing-spaces'),
    'has section with trailing spaces',
  )
  const settings = ini['section-with-trailing-spaces']
  // the loaded ini has the trailing spaces
  t.deepEqual(settings, {
    MY_VAR_WITH_SPACES: 'Hello    ',
  })

  const section = getSettingsFrom('section-with-trailing-spaces', ini)
  // the setting should have its trailing spaces removed
  t.deepEqual(section, {
    MY_VAR_WITH_SPACES: 'Hello',
  })
})
