var http = require("http")
var server = http.createServer(function(req,res){  
    res.write("Request recieded")
    res.end()
})

server.listen(8080)