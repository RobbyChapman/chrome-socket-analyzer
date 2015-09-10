(function() {

    /* 
    It feels like a hack, and maybe it is. I couldn't find another way to invoke methods on WebSocket.
    Ideally I would have done something like 

    chrome.devtools.network.onRequestFinished.addListener(function(request) {});

    But as you can tell from the response, google does not expose the socket frames. As a result, this
    was the reccomended solution. I have provided the discussion below:

    https://groups.google.com/forum/#!topic/google-chrome-developer-tools/7_a0W8Y92O4
    */
    var request = new XMLHttpRequest();

    /* Note: getUrl is relative to your current position in the file structure, it is not relative to root */
    request.open('GET', chrome.extension.getURL('../../Analyzer/SocketSniffer.js'), false);
    request.send();

    /* We are essentially injecting a content script into the devtools window to be interpreted. Currently we do not
    have access to WebSocket within this scope, by injecting the script above into the inspected windows, we can run
    code that can leverage the WebSocket object */
    chrome.devtools.inspectedWindow.eval(request.responseText);
})();