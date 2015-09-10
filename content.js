/**
 * Created by robert.chapman on 9/10/15.
 */

window.addEventListener("RebroadcastExtensionMessage", function (evt) {

    chrome.runtime.sendMessage(evt.detail);
}, false);