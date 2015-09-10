function init() {

    logWebSocketContext();
    decorateSocketSend();
}

function logWebSocketContext() {

    /* Keep this log for now, this is helpful to see what the socket contains. For example, connection status */
    console.log(WebSocket.prototype);
}

function decorateSocketSend() {

    var eventListenerAdded = false;

    WebSocket.prototype.send = function (send) {

        function registerEventListener(socket) {

            socket.addEventListener('message', function (msg) {
                eventListenerAdded = true;
                logWebSocketTraffic(msg);
            }, false);
        }

        /* Here until the UI gets built */
        function logWebSocketTraffic(obj) {

            /* This method is called from the message event itself, as well as the the raw
             data. To accommodate both use cases we have to conditionally log */
            console.log(obj.data ? 'Response:: ' + obj.data : 'Request:: ' + obj);
        }

        return function (data) {

            /* This is a borderline hack. The issue here is that we need to add the eventListener to 'this'. The context of 'this'
             pertains to the returned functions scope. With that said, every invocation to 'send' will execute this code. To protect
             the event listener from multiple registrations, we add a flag to determine if it was previously registered. I would like
             to revisit this. I do not like the current implementation */
            if (!eventListenerAdded) {
                registerEventListener(this);
            }
            logWebSocketTraffic(data);
            return send.apply(this, arguments);
        };
    }(WebSocket.prototype.send);
}
init();