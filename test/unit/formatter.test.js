import { digitMove, percentage } from '../../src/formatter.js'

test('Test for digitMove()', () => {
  expect(digitMove('1234.56', -5)).toBe('0.0123456')
  expect(digitMove('1234.56', -4)).toBe('0.123456')
  expect(digitMove('1234.56', -3)).toBe('1.23456')
  expect(digitMove('1234.56', -2)).toBe('12.3456')
  expect(digitMove('1234.56', -1)).toBe('123.456')
  expect(digitMove('1234.56')).toBe('1234.56')
  expect(digitMove('1234.56', 1)).toBe('12345.6')
  expect(digitMove('1234.56', 2)).toBe('123456')
  expect(digitMove('1234.56', 3)).toBe('1234560')

  expect(digitMove('0.000123456', 2)).toBe('0.0123456')
  expect(digitMove('0.000123456', 3)).toBe('0.123456')
  expect(digitMove('0.000123456', 4)).toBe('1.23456')
})

test('Test for percentage()', () => {
  expect(percentage('1234.56')).toBe('123456%')
  expect(percentage('1234.56', '0.00%')).toBe('123456.00%')
  expect(percentage('12345.6')).toBe('1234560%')
  expect(percentage('12345.6', '0.00%')).toBe('1234560.00%')
  expect(percentage('0.123456')).toBe('12.3456%')
  expect(percentage('0.123456', '0.00%')).toBe('12.3456%')
  expect(percentage('0.000123456')).toBe('0.0123456%')
  expect(percentage('0.000123456', '0.00%')).toBe('0.0123456%')
})
