/* Keep this log for now, this is helpful to see what the socket contains. For example, connection status */
console.log(WebSocket.prototype);

WebSocket.prototype._send = WebSocket.prototype.send;

/* TODO: Robby, refactor this for readability purposes */
WebSocket.prototype.send = function(data) {

    this._send(data);

    this.addEventListener('message', function(msg) {
        /* Keeps logs until UI is built */
        console.log('Request === ' + msg.data);
    }, false);

    this.send = function(data) {
        this._send(data);
        /* Keeps logs until UI is built */
        console.log("Response === :" + data);
    };
}