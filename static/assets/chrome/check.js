setTimeout(function(){
    document.getElementById("browser_alert").style.display=/webkit|gecko|firefox/i.test(navigator.userAgent)?"none":"block"
},1000)
