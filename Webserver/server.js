var http = require('http')
var fs = require('fs')
var path = require('path')

http.createServer(function(req,res){
    var url = req.url
    var filepath = path.join(__dirname, url)
    var ext = String(path.extname(filepath)).toLowerCase();

    if (url.endsWith('/')){
        filepath = path.join(__dirname,'/index.html')
    }
    
    console.log('incoming request', url)
    
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
    var contentheader = extensions[ext] || 'application/octet-stream'

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
}).listen(8080)

