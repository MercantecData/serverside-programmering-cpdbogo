var http = require('http')
var fs = require('fs')
var Booking = require("./booking")
var firstSetup = require('./fristsetup')
const url = require('url')


http.createServer(function(req,res){
    var request = url.parse(req.url,true)

    var apikeysraw = fs.readFileSync('./data/apikeys.json')
    var apikeys = new Array(JSON.parse(apikeysraw))
    var roomsraw = fs.readFileSync('./data/rooms.json')
    var rooms = new Object(JSON.parse(roomsraw))
    var bookingsraw = fs.readFileSync('./data/bookings.json')
    var bookings = new Array(JSON.parse(bookingsraw))

    if (request.query.apikey){
        if(apikeys[0].includes(parseInt(request.query.apikey))){
            
            if (request.pathname == '/firsttimesetup'){
                if(firstSetup()){
                res.writeHead(200)
                res.end('First time setup done')
                }
            }

            if (request.pathname == '/rooms'){
                res.writeHead(200)
                res.end(JSON.stringify(rooms))
            }

            if (request.pathname == '/bookings'){
                if (request.query.day){
                    res.writeHead(200)
                    res.end(JSON.stringify(bookings[0][request.query.day - 1]))
                }else{
                    var dato = new Date().getDate() - 1
                    res.writeHead(200)
                    res.end(JSON.stringify(bookings[0][dato]))
                }
            }

            if (request.pathname == '/add'){
                if (req.method == 'POST'){
                    if(request.query.date && request.query.room && request.query.person && request.query.time)
                    {
                        var date = request.query.date - 1
                        bookings[0][date].push(new Booking(request.query.room, request.query.person, request.query.time))
                        fs.writeFile('./data/bookings.json',JSON.stringify(bookings[0]),'utf8', function(err, result) {})
                        res.writeHead(200)
                        res.end('Booking has been made')
                    }
                    else{
                        res.writeHead(400)
                        res.end('Invalid parameters')
                    }
                }
            }
            fs.readFile('index.html',function (err, data){
                res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
                res.end(data);
            })
        }
        else{
            res.writeHead(401)
            res.end('Invalid API key')
        }
    }
    else{
        res.writeHead(400)
        res.end('You have to provide a valid API key')
    }

}).listen(80)