import Vue from "vue" 

const cookies = {
  getItem: function (context, sKey) {
    if (!context || !context.cookie) { return null; }
    return decodeURIComponent(context.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  },
  setItem: function (context, sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!context || context.cookie === undefined || context.cookie === null || !sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }
    context.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
  },
  removeItem: function(context, sKey, sPath, sDomain) {
    if (!context || context.cookie === undefined || context.cookie === null  || !sKey || !this.hasItem(context,sKey)) { return false; }
    context.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( sDomain ? "; domain=" + sDomain : "") + ( sPath ? "; path=" + sPath : "");
    return true;
  },
  hasItem: function(context, sKey) {
    if (!context || !context.cookie) { return null; }
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(context.cookie);
  },
  keys: function(context) {
    if (!context || !context.cookie) { return null; }
    var aKeys = context.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
    return aKeys;
  },
  parse(str, options) {
    var pairSplitRegExp = /; */;
    if (typeof str !== "string") {
      throw new TypeError("argument str must be a string");
    }

    var obj = {}
    var opt = options || {};
    var pairs = str.split(pairSplitRegExp);
    var dec = opt.decode || decodeURIComponent;

    function tryDecode(str, decode) {
      try {
        return decode(str);
      } catch (e) {
        return str;
      }
    }

    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i];
      var eq_idx = pair.indexOf("=");

      // skip things that don"t look like key=value
      if (eq_idx < 0) {
        continue;
      }

      var key = pair.substr(0, eq_idx).trim()
      var val = pair.substr(++eq_idx, pair.length).trim();

      // quoted values
      if ("\"" === val[0]) {
        val = val.slice(1, -1);
      }

      // only assign once
      if (undefined === obj[key] || undefined === obj[key]) {
        obj[key] = tryDecode(val, dec);
      }
    }

    return obj;
  }
};  

export default cookies
