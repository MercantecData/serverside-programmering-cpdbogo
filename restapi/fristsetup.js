var Room = require("./room")
var Booking = require("./booking")
var fs = require('fs')
module.exports = function(){
    var roomSetup = new Object()
    roomSetup['Square'] = new Room("Square","1.floor",true)
    roomSetup['Circle'] = new Room("Circle","1.floor",true)
    roomSetup['Triangle'] = new Room("Triangle","1.floor",true)
    roomSetup['Rectangle'] = new Room("Rectangle","1.floor",true)
    fs.writeFile('./data/rooms.json',JSON.stringify(roomSetup),'utf8', function(err, result) {})
    var bookingsSetup = new Array()
    while (bookingsSetup.length <= 30) {
        bookingsSetup.push(new Array())
    }
    var dato = new Date().getDate() - 1
    bookingsSetup[dato].push(new Booking(roomSetup.Square,"Casper","13:30"))
    bookingsSetup[dato].push(new Booking(roomSetup.Circle,"Jesper","14:25"))
    bookingsSetup[dato].push(new Booking(roomSetup.Triangle, "Jonathan","12:30"))
    bookingsSetup[dato].push(new Booking(roomSetup.Rectangle, "Bo","08:20"))
    fs.writeFile('./data/bookings.json',JSON.stringify(bookingsSetup),'utf8', function(err, result) {})
    return true
}
