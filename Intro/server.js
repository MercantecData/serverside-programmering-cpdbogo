var http = require("http")
var mysql = require("mysql")
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Password1",
    database: "h3_db_prog"
});

var server = http.createServer(function(req,res){  
    con.connect(function (err) {
        if (err) {
            console.error("Error connecting to mysql DB");
            console.log(err.code);
            console.log(err.fatal);
            res.write("Unable to connect to mysql")
        }
        var values = [
            ['5','6','6'],
            ['4','7','9'],
            ['7','4','6']
        ];
        con.query("INSERT INTO stocks (store,product,quantity) VALUES ?",[values], function(err,result){
            if (err) throw err;
            console.log(result)
            res.write(JSON.stringify(result))
            res.end()
            
        })
     })
})

server.listen(8080)