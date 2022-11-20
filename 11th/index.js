const http = require("http");
const mysql = require("mysql");
const StringDecoder = require("string_decoder");
const host = "localhost";
const port = 10000;
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "user_data",
});
con.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
});
const requestListener = async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    switch (req.url) {
        case "/login":
            req.on("data", (content) => {
                let  content_init = content.toString();
                content_init = content_init.replaceAll("=", ":");
                content_init = content_init.split("\r\n");
                let email = content_init[0].split(":")[1];
                let password = content_init[1].split(":")[1];
                con.query(
                    `select * from users where email=? and password=?`,
                    [email, password],
                    function (err, result) {
                        if (err) {
                            res.writeHead(500);
                            res.end(JSON.stringify({ messages: "Error Occured" }));
                        }
                        res.writeHead(302, {
                            location: "/",
                        });
                        res.end(JSON.stringify(result[0]));
                    }
                );
            });
            break;
        case "/signup":
            req.on("data", (content) => {
                let  content_init = content.toString();
                content_init = content_init.replaceAll("=", ":");
                content_init = content_init.split("\r\n");
                namee = content_init[0].split(":")[1];
                email = content_init[1].split(":")[1];
                password = content_init[2].split(":")[1];
                con.query(
                    `insert into users values (?)`,
                    [[namee, email, password]],
                    function (err, result) {
                        if (err) throw err;
                        res.writeHead(302, {
                            location: "/",
                        });
                        res.end(JSON.stringify(result[0]));
                    }
                );
            });
            break;
        default:
            res.writeHead(200);
            res.end(JSON.stringify({ message: "Welcome" }));
    }
};
const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server listening on http://${host}:${port}`);
});
