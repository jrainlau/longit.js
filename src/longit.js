import { isNumeric } from './utils.js'
import { digitMove, percentage } from './formatter.js'

class Long {
  constructor (numStr) {
    this.numStr = numStr
    this.enabled = true
    this._init()
  }

  _init () {
    if (!isNumeric(this.numStr)) {
      console.error(`"${this.numStr}" is not a number!`)
      this.enabled = false
    }
  }

  digitMove (digits = 0) {
    if (this.enabled) {
      return digitMove(this.numStr, digits)
    } else {
      return this.numStr
    }
  }

  format (type) {
    if (this.enabled) {
      switch (type) {
        case '0%':
          this.numStr = percentage(this.numStr, '0%')
          break
        case '0.00%':
          this.numStr = percentage(this.numStr, '0.00%')
          break
        default:
          break
      }
    }
    return this.numStr
  }
}

export default function longNum (str) {
  return new Long(str)
}
