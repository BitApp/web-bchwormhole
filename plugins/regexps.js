export default {
  //emailRegExp: /^[\.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
  emailRegExp: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
  mobileRegExp: /^1\d{10}$/,
  nickNameRegExp: /^[0-9a-zA-Z_\u4e00-\u9fa5]{1,20}$/,
  apiRemarkRegExp: /^[0-9a-zA-Z_\u4e00-\u9fa5]{1,20}$/,
  idCardNoRegExp: /(^\d{15}$)|(^\d{17}([0-9]|X)$)/i,
  ipRegExp: /^((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))$/
}

