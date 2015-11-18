/**
 * Created by robert.chapman on 9/10/15.
 */


function init() {

    logWebSocketContext();
    decorateWebSocketConstructor();
}

function logWebSocketContext() {

    /* Keep this log for now, this is helpful to see what the socket contains. For example, connection status */
    console.log(WebSocket.prototype);
}

function logWebSocketTraffic(obj) {

    /* This method is called from the message event itself, as well as the the raw
     data. To accommodate both use cases we have to conditionally log */
    var message = obj.data ? obj.data : obj;
    var event = new CustomEvent("RebroadcastExtensionMessage", {detail: message});
    window.dispatchEvent(event);
}

function decorateWebSocketConstructor() {

    var OrigWebSocket = window.WebSocket;
    var callWebSocket = OrigWebSocket.apply.bind(OrigWebSocket);
    var wsAddListener = OrigWebSocket.prototype.addEventListener;
    wsAddListener = wsAddListener.call.bind(wsAddListener);
    window.WebSocket = function WebSocket(url, protocols) {
        var ws;
        if (!(this instanceof WebSocket)) {
            // Called without 'new' (browsers will throw an error).
            ws = callWebSocket(this, arguments);
        } else if (arguments.length === 1) {
            ws = new OrigWebSocket(url);
        } else if (arguments.length >= 2) {
            ws = new OrigWebSocket(url, protocols);
        } else { // No arguments (browsers will throw an error)
            ws = new OrigWebSocket();
        }

        wsAddListener(ws, 'open', function (event) {
            console.log("Connection open!!");
        });

        wsAddListener(ws, 'message', function (event) {

            logWebSocketTraffic(event.data);
        });

        wsAddListener(ws, 'close', function (event) {
            console.log("Connection closed!!");
        });

        return ws;
    }.bind();

    window.WebSocket.prototype = OrigWebSocket.prototype;
    window.WebSocket.prototype.constructor = window.WebSocket;

    var wsSend = OrigWebSocket.prototype.send;
    wsSend = wsSend.apply.bind(wsSend);
    OrigWebSocket.prototype.send = function (data) {

        // TODO: Do something with the sent data if you wish.
        return wsSend(this, arguments);
    };
}

init();