//session
const token = /session=(.*?)(;|$)/ig.exec(document.cookie)

if (!token || !token[1]) {
  //new session
  let script = document.createElement("script")
  script.src = "/cgi-bin/session?cmd=add"
  document.body.appendChild(script)
}