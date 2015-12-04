/**
 * Created by robert.chapman on 11/17/15.
 */
var port;

window.onload = function () {

    init();
};

function init() {

    createBackgroundPort();
    registerBackgroundEventHandler();
    setDomEventListeners();
    setRenderJsonProps();
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
            var messedUp;
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

function setDomEventListeners() {

    document.getElementById("clearRequestsButton").addEventListener("click", clearRequests);
    document.getElementById("settingsButton").addEventListener("click", clearRequests);

}

function clearRequests() {

    var myNode = document.getElementById("ws-container");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
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

function setRenderJsonProps() {

    renderjson.set_icons(' + ', ' - ');
    renderjson.set_show_to_level(1);
}

function appendNodeToDOM(node, isRequest) {

    var el = renderjson(node);
    el.className += (isRequest) ? ' response' : ' request';
    document.getElementById("ws-container").appendChild(el);
}