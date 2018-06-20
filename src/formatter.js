import { repeat } from './utils.js'

export const digitMove = (numStr, digits = 0) => {
  let numStrArr = numStr.replace(/^0/, '').replace(/\.+$/, '').split('')
  const decimalIndex = numStrArr.indexOf('.') !== -1 ? numStrArr.indexOf('.') : numStrArr.length
  numStrArr.splice(decimalIndex, 1)
  if (digits > 0) {
    if (decimalIndex + digits <= numStrArr.length) {
      numStrArr.splice(decimalIndex + digits, 0, '.')
    } else {
      numStrArr.splice(decimalIndex + digits, 0, repeat('0', decimalIndex + digits - numStrArr.length))
    }
  } else if (digits < 0) {
    if (decimalIndex + digits > 0) {
      numStrArr.splice(decimalIndex + digits, 0, '.')
    } else {
      numStrArr.splice(0, 0, '0.' + repeat('0', Math.abs(decimalIndex + digits)))
    }
  } else {
    numStrArr = numStr.replace(/^0/, '').replace(/\.+$/, '').split('')
  }
  return numStrArr.join('').replace(/^(0+)/, '').replace(/\.+$/, '').replace(/^\./, '0.')
}

export const percentage = (numStr, type = '0%') => {
  let percentageStr = digitMove(numStr, 2)
  if (type === '0%') {
    percentageStr += '%'
  } else if (type === '0.00%') {
    const decimalIndex = percentageStr.indexOf('.') !== -1 ? percentageStr.indexOf('.') : percentageStr.length
    if (percentageStr.length - decimalIndex === 0) {
      percentageStr += '.00%'
    } else if (percentageStr.length - decimalIndex === 2) {
      percentageStr += '0%'
    } else {
      percentageStr += '%'
    }
  }
  return percentageStr
}
