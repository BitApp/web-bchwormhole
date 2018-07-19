//金钱方法
var Decimal = require("decimal.js").default
Number.cashDecimal = 2
Number.longCoinDecimal = 8
Number.shortCoinDecimal = 4

String.prototype.formatMoney = function(c, charDec, charSep, noZero){
    var n = this || "0", prefix = ""
    if(n[0] === "-"){
        prefix= "-"
        n = n.replace(/\-/g,"")
    }
    var rounded = n.toString().round(c)
    var decimalArray = rounded.split(".")
    var integerString = ""
    charDec = charDec === undefined ? "." : charDec
    charSep = charSep === undefined ? "," : charSep
    //console.log(rounded)
    //三位加逗号
    //debugger
    for(var i=decimalArray[0].length-1;i>=0;i--){
        if((decimalArray[0].length-i)%3 === 0 && i>0){
            //加逗号
            integerString = charSep+decimalArray[0][i]+integerString
        }
        else{
            integerString = decimalArray[0][i]+integerString
        }
    }
    if(integerString === ""){
        integerString = "0"
    }

    var decimalString = decimalArray.length > 1 ? decimalArray[1].substring(0,c):""

    if(!noZero){
        //不足位数的补0
        if(decimalString.length < c){
            const len = c-decimalString.length
            for(let i=0;i<len;i++){
                decimalString+="0"
            }
        }
        return prefix + integerString + charDec+decimalString
    }
    else{
        return prefix + integerString + ((decimalString*1>0)?(charDec+decimalString):"")
    }
}


// String.prototype.formatMoney = function(c, d, t){
//     var n = this,
//     c = isNaN(c = Math.abs(parseInt(c))) ? 2 : c, 
//     d = d === undefined ? "." : d, 
//     t = t === undefined ? "," : t, 
//     s = n < 0 ? "-" : "", 
//     i = String(parseInt(n = Math.abs(Number(n) || 0).round(c))), 
//     j = (j = i.length) > 3 ? j % 3 : 0
//     return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? (Math.abs(n - i).round(c)*1?d:"") + (Math.abs(n - i).round(c)*1).toString().slice(2) : "")
// }

String.prototype.decimalCmp = function(b){
    var n = (this||"0").toString() || "0",
        b = (b||"0").toString() || "0"
        
    return new Decimal(n.toString()).cmp(new Decimal(b.toString()))
}
//创建Decimal
String.prototype.Decimal = function(){
   var n = (this||"0").toString() || "0"
   return new Decimal(n.toString())
}

//加
String.prototype.decimalAdd = function(c){
   var n = (this||"0").toString() || "0",
       m = (c||"0").toString() || "0"

   return new Decimal(n.toString()).add(new Decimal(m.toString())).toString()
}

//减
String.prototype.decimalMinus = function(c){
   var n = (this||"0").toString() || "0",
   m = (c||"0").toString() || "0"

   return new Decimal(n.toString()).minus(new Decimal(m.toString())).toString()
}

//乘
String.prototype.decimalMul = function(c){
   var n = (this||"0").toString() || "0",
   m = (c||"0").toString() || "0"

   return new Decimal(n.toString()).mul(new Decimal(m.toString())).toString()
}

//除
String.prototype.decimalDiv = function(c){
   var n = (this||"0").toString() || "0",
   m = (c||"0").toString() || "0"

   return new Decimal(n.toString()).div(new Decimal(m.toString())).toString()
}

//小数位数
String.prototype.round = function(c){
    var n = (this||"0").toString() || "0",
    m = 1
    for(var i =0;i<c;i++){
        m=m*10
    }
    return Decimal(n.toString()).times(m).floor().div(new Decimal(m.toString())).toString()
}

//银行卡
String.prototype.formatCard = function(){
    let cardString = "",
    s = this

    for(let i = 0;i<s.length;i++){
        if((i+1)%4 === 0) {
            cardString += s[i]+" "
        }
        else{
            cardString += s[i]
        }
    }

    return cardString
}
