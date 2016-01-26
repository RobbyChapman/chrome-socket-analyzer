/* 
chromes extension API for panels.create defines params like this:

chrome.devtools.panels.create(string title, string iconPath, string pagePath, function callback)

one thing to note, pagePath is relative to the root extension direction, not the current location of 
the calling script 
*/
chrome.devtools.panels.create('SocketScoop', null, 'devtools/devtools.html',null);
