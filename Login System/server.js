var http = require('http')
var fs = require('fs')
var path = require('path')
var textBody = require('body')
var crypto = require('crypto')
var sessions = new Array()


function authcheck(req,res,redir){
    if (req.headers.cookie){
        console.log("cookies present")
        var rawcookies = req.headers.cookie.replace(' ','').split(';')
        cookies = new Array()
        for (let index = 0; index < rawcookies.length; index++) {
            var tempcookie = rawcookies[index].split('=')
            cookies[tempcookie[0]] = tempcookie[1]
        }
        if (cookies['SESSID']){
            console.log("Session allowed")
            return true
            // res.writeHead(300,  {Location: redir})
            // res.end()
        }
    }else{
            console.log("Session denied, redir to login")
            res.writeHead(300,  {Location: "/login.html"})
            res.end()
    }

}

function posthandler(req,res){
    var usersraw = fs.readFileSync('./data/users.json')
        var users = new Object(JSON.parse(usersraw))
        textBody(req, res, function (err, body) {
            if (err) {
                res.statusCode = 500
                return res.end("Error processing request")
            }
            params = {}
            bodysplit = body.split('&')
            for (var key in bodysplit){
                tempsplit = bodysplit[key].split('=')
                params[tempsplit[0]] = tempsplit[1]
            }

            if (req.url == '/register.html'){
                if(!(params['usrname'] in users)){
                    users[params['usrname']] = params['usrpass']
                    fs.writeFile('./data/users.json',JSON.stringify(users),'utf8', function(err, result) {})
                    res.writeHead(300,  {Location: "/login.html"})
                    res.end()
                }
                else{
                    res.writeHead(409)
                    res.end('User already exists')
                }
            }

            if (req.url == '/login.html'){
                if(params['usrname'] in users){
                    if(users[params['usrname']] == params['usrpass']){
                    
                    var thissess = crypto.randomBytes(16).toString('base64');
                    sessions.push(thissess)
                    res.setHeader('Set-Cookie','SESSID='+thissess)
                    // res.setHeader('Set-Cookie','SESSID='+thissess+'; expires='+new Date(new Date().getTime()+600000).toUTCString())
                    }
                    else{
                        res.writeHead(403)
                        res.end("Wrong password")
                    }
                }else{
                    res.writeHead(403)
                    res.end("User doesn't exist")
                }

            }


        })
}

http.createServer(function(req,res){
    console.log(req.url)
    var url = req.url
    var filepath = path.join(__dirname,'data', url)
    var ext = String(path.extname(filepath)).toLowerCase();

    if (req.url != "/login.html" && req.url != "/register.html"){
        authcheck(req,res,req.url)
    }
    
    if (req.method == "POST") {
        posthandler(req,res)
    }
    
    if (url == '/'){
         filepath = path.join(__dirname,'data/index.html')
    }
    
    console.log('incoming request', url)
    // console.log(req.method)
    
    //https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types
    var extensions = {
        '.aac': 'audio/aac',
        '.abw': 'application/x-abiword',
        '.arc': 'application/x-freearc',
        '.avi': 'video/x-msvideo',
        '.azw': 'application/vnd',
        '.bin': 'application/octet-stream',
        '.bmp': 'image/bmp',
        '.bz':  'application/x-bzip',
        '.bz2': 'application/x-bzip2',
        '.csh': 'application/x-csh',
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.jpg': 'image/jpeg',
        '.php': 'application/php',
        '.png': 'image/png',
        '.gz': 'application/gzip',
        '.rar': 'application/x-rar-compressed',
        '.txt': 'text/plain',
        '.wav': 'audio/wav',
        '.webm': 'video/webm',
        '.xml': 'text/xml',
        '.zip': 'application/zip'
    }
    var contentheader = extensions[ext] || 'text/html'

    fs.readFile(filepath, function(error, data) {
        if (error) {
            if (error.code == 'ENOENT'){
                res.writeHead(404)
                res.end("404: File not found")
            } 
            else {
                res.writeHead(500)
                res.end("5xx, server done goofed")
            }
        }
        else {
            res.writeHead(200, {'Content-Type': contentheader})
            res.end(data)
        }
    })
}).listen(80)

