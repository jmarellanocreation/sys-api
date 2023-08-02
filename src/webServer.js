const Http = require('http');

class WebServer {

    #port;
    #server;
    #data = "{}";

    constructor(configs) {
        this.#port = configs.wsPort;
        this.#server = null;
        this.init();
    }
    init(){
        this.#server = Http.createServer((req, res) => {
            if (req.url === "/") {
                res.writeHead(200, {"Content-Type": "application/json"});
                res.write(JSON.stringify(this.#data));
                res.end();
            } else {
                res.writeHead(404, {"Content-Type": "text/plain"});
                res.write("404 Not Found\n");
                res.end();
            }
        });
        this.#server.listen(this.#port);
        console.log('WebServer running on http://127.0.0.1:'+this.#port+'/');
    }
    updateData(data){
        this.#data = data;
    }
}

module.exports = WebServer;