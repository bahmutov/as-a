const test = require('ava');
const loadUserIni = require('../src/load-user-ini')

test('has ini sections', t => {
  const ini = loadUserIni()
  t.true(ini.hasSection('demo'), 'has demo section')
  t.true(ini.hasSection('as-a'), 'has as-a section')
  t.false(ini.hasSection('does not exist'), 'does not have unknown section')
})
