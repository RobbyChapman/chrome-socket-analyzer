/**
 * Created by robert.chapman on 9/10/15.
 */

require('../controllers/analyzerControllers.js');

angular.module('analyzerDirectivesModule', ['analyzerControllersModule'])

    .directive('monitorDirective', function () {

        return {
            restrict: 'E',
            scope: true,
            templateUrl: '../../js/app/partials/monitorPartial.html',
            /* See js/app/controllers/analyzerControllers.js for WebSocketAnalyzerController implementation */
            controller: 'WebSocketAnalyzerController',
            link: function (scope) {

                var port;

                scope.clearRequests = function () {

                    debugger;
                    console.log("Inside clear request!");
                    var myNode = document.getElementById("test");
                    while (myNode.firstChild) {
                        myNode.removeChild(myNode.firstChild);
                    }
                };

                function init() {

                    createBackgroundPort();
                    registerBackgroundEventHandler();
                    setupJsonConfig();
                }

                function setupJsonConfig() {

                    renderjson.set_icons('+', '-');
                    renderjson.set_show_to_level(1);
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
                        var tempFrame = frame.match(/"(.+)"/)[1];
                        tempFrame = "\"" + tempFrame + "\"";
                        if (canParseJSON(tempFrame)) {
                            var messedUp = JSON.parse(JSON.parse(tempFrame));
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

                    var el = renderjson(node);
                    el.className += (isRequest) ? ' response' : ' request';
                    document.getElementById("test").appendChild(el);
                }

                init();
            }
        }
    });