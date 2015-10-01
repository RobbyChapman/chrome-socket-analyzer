/**
 * Created by robert.chapman on 9/10/15.
 */

require('../controllers/analyzerControllers.js');

angular.module('analyzerDirectivesModule', ['analyzerControllersModule'])

    .directive('monitorDirective', function () {

        return {
            restrict: 'E',
            templateUrl: '../../js/app/partials/monitorPartial.html',
            /* See js/app/controllers/analyzerControllers.js for WebSocketAnalyzerController implementation */
            controller: 'WebSocketAnalyzerController',
            link: function(scope, element, attrs) {

                var port;

                scope.socketRequests = [];

                scope.clearRequests = function () {

                    scope.socketRequests = [];
                };

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

                    if (frame.length > 0) {
                        var tempFrame = frame.match(/"(.+)"/)[1];
                        debugger;
                        tempFrame = "\"" + tempFrame + "\"";
                        if (canParseJSON(tempFrame)) {
                            var messedUp = JSON.parse(JSON.parse(tempFrame));
                            var val = (typeof messedUp == 'string') ? {'data': messedUp} : messedUp;
                            appendNodeToDOM(val);
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

                function appendNodeToDOM(node) {

                    element.append(prettyPrint(node));
                    //scope.$apply();
                }

                init();
            }
        }
    });