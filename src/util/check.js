class Check {
  // 校验手机号
  static phone(p) {
    const reg = new RegExp("^((13[0-9])|(14[5,7,9])|(15[^4])|(16[0-9])|(18[0-9])|(19[0-9])|(17[0,1,3,5,6,7,8]))\\d{8}$")
    return reg.test(p)
  }

  // 校验密码
  static pass(pass) {
    if (pass.length >=6 && pass.length <= 20) {
      const allReg = /^[0-9a-zA-Z~#^$@%&!?%*]*$/
      if (allReg.test(pass)) {
        const numReg = /[0-9]/
        const letterReg = /[a-zA-Z]/
        const symbolReg = /[~#^$@%&!?%*]/
        const numR = numReg.test(pass) ? 1 : 0
        const letterR = letterReg.test(pass) ? 1 : 0
        const symbol = symbolReg.test(pass) ? 1 : 0
        const allR = numR + letterR + symbol
        return allR >= 2
      } else {
        return false
      }
    } else {
      return false
    }
  }

}

export default Check
