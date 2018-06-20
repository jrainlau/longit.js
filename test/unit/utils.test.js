import { isNumeric, repeat } from '../../src/utils.js'

test('Test for isNumeric()', () => {
  expect(isNumeric('12345')).toBe(true)
  expect(isNumeric('.12345')).toBe(true)
  expect(isNumeric('..12345')).toBe(false)
  expect(isNumeric('00.12345')).toBe(true)
  expect(isNumeric('0.0.12345')).toBe(false)
  expect(isNumeric('a345')).toBe(false)
  expect(isNumeric('12345a')).toBe(false)
})

test('Test for repeat()', () => {
  expect(repeat('0', 2)).toBe('00')
  expect(repeat('0', 0)).toBe('')
})
