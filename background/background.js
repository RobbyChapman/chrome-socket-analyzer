/**
 * Created by robert.chapman on 9/10/15.
 */

var _port;

chrome.runtime.onConnect.addListener(function (port) {

    _port = port;
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    _port.postMessage(request);
});