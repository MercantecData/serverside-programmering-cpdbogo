var http = require("http")
var url = require('url')
var fs = require('fs')

http.createServer(function(req,res){
    var request = url.parse(req.url,true)

    if (request.pathname == '/singlecookie'){
        res.setHeader('Set-Cookie','cookie=cookie')
        res.end("Single cookie has been set")
    }

    if (request.pathname == '/doublecookie'){
        res.setHeader('Set-Cookie',['cookie=cookie', 'cookie2=cookie2'])
        res.end("Two cookies has been set")
    }

    if (request.pathname == '/showmethecookies'){
        var rawcookies = req.headers.cookie.replace(' ','').split(';')
        cookies = new Array()
        for (let index = 0; index < rawcookies.length; index++) {
            var tempcookie = rawcookies[index].split('=')
            cookies[tempcookie[0]] = tempcookie[1]
        }
        console.log(cookies)
    }

    if (request.pathname == '/expiringcookie'){
        res.setHeader('Set-Cookie','expiringcookie=cookiewillexpire; expires='+new Date(new Date().getTime()+86409000).toUTCString())
    }

    fs.readFile('index.html',function (err, data){
        res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
        res.end(data);
    })
}).listen(80)