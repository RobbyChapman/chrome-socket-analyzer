/**
 * Created by robert.chapman on 11/17/15.
 */
var port;

function init() {

    createBackgroundPort();
    registerBackgroundEventHandler();
}

function createBackgroundPort() {

    port = chrome.runtime.connect({name: "SocketConnectionId"});
}

function canParseJSON(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function formatWebSocketFrame(frame) {

    console.log("Frame is");
    console.log(frame);

    if (frame.length > 0) {
        var isRequest = (frame.match(/.+?(?=\[")/)) ? true : false;

        var match = frame.match(/"(.+)"/);
        var tempFrame;
        if (match) {
            tempFrame = match[1];
        } else {
            tempFrame = frame;
        }
        tempFrame = "\"" + tempFrame + "\"";
        if (canParseJSON(tempFrame)) {
            var messedUp
            if (typeof tempFrame !== 'string') {
                messedUp = JSON.parse(JSON.parse(tempFrame));
            } else {
                messedUp = JSON.parse(tempFrame);
            }
            var val = (typeof messedUp == 'string') ? {'data': messedUp} : messedUp;
            if (val) {
                appendNodeToDOM(val, isRequest);
            }
        }
    }
}

function registerBackgroundEventHandler() {

    if (!port) {
        createBackgroundPort();
    }
    port.onMessage.addListener(function (msg) {

        formatWebSocketFrame(msg);
    });
}

function appendNodeToDOM(node, isRequest) {

    console.log("Append to dom");
    console.log(node);

    // Must import renderjson.js
    /*
    var el = renderjson(node);
    el.className += (isRequest) ? ' response' : ' request';
    document.getElementById("test").appendChild(el);
    */
}

init();