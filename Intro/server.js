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
        con.query("SELECT * FROM employees", function(err,data){
            res.write(JSON.stringify(data))
            res.end()
        })
     })
})

server.listen(8080)