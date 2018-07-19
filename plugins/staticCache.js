
var path = require("path")

module.exports = function staticCache(dir, options, files) {
  if (typeof dir === "object") {
    files = options
    options = dir
    dir = null
  }

  options = options || {}
  // prefix must be ASCII code
  options.prefix = (options.prefix || "").replace(/\/*$/, "/")
  files = new FileManager(files || options.files)
  dir = dir || options.dir || process.cwd()
  dir = path.normalize(dir)
  var filePrefix = path.normalize(options.prefix.replace(/^\//, ""))

  // option.filter
  var fileFilter = function () { return true }
  if (Array.isArray(options.filter)) fileFilter = function (file) { return ~options.filter.indexOf(file) }
  if (typeof options.filter === "function") fileFilter = options.filter

  return async (ctx, next) => {
    // only accept HEAD and GET
    if (ctx.method !== "HEAD" && ctx.method !== "GET") return await next()
    // check prefix first to avoid calculate
    if (ctx.path.indexOf(options.prefix) !== 0) return await next()

    // decode for `/%E4%B8%AD%E6%96%87`
    // normalize for `//index`
    var filename = path.normalize(safeDecodeURIComponent(ctx.path))
    let ext = filename.split(".").slice(-1).join("")

    if(fileFilter(ext)){
      ctx.set("Cache-Control", "public, max-age=" + options.maxAge)
    }
    //if (file.md5) ctx.set("content-md5", file.md5)

    if (ctx.method === "HEAD")
      return

    //var stream = fs.createReadStream(file.path)

    // update file hash
    // if (!file.md5) {
    //   var hash = crypto.createHash("md5")
    //   stream.on("data", hash.update.bind(hash))
    //   stream.on("end", function () {
    //     file.md5 = hash.digest("base64")
    //   })
    // }
    return await next()
    //ctx.body = stream
    // enable gzip will remove content length
  }
}

function safeDecodeURIComponent(text) {
  try {
    return decodeURIComponent(text)
  } catch (e) {
    return text
  }
}

/**
 * load file and add file content to cache
 *
 * @param {String} name
 * @param {String} dir
 * @param {Object} options
 * @param {Object} files
 * @return {Object}
 * @api private
 */


function FileManager(store) {
  if (store && typeof store.set === "function" && typeof store.get === "function") {
    this.store = store
  } else {
    this.map = store || Object.create(null)
  }
}

FileManager.prototype.get = function (key) {
  return this.store ? this.store.get(key) : this.map[key]
}

FileManager.prototype.set = function (key, value) {
  if (this.store) return this.store.set(key, value)
  this.map[key] = value
}
