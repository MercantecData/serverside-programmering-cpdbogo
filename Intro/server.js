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
        con.query("SELECT * FROM employees", function(err,data){
            res.write(JSON.stringify(data))
            res.end()
            
        })
     })
})

server.listen(8080)