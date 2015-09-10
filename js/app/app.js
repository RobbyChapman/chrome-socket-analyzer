angular.module('SocketAnalyzerApp', [])

    .controller('WebSocketAnalyzerController', function ($scope) {

        var port;

        $scope.name = "POC";

        function init() {

            createBackgroundPort();
            registerBackgroundEventHandler();
        }

        function createBackgroundPort() {

            port = chrome.runtime.connect({name: "SocketConnectionId"});
        }

        function registerBackgroundEventHandler() {

            if (!port) {
                createBackgroundPort();
            }
            port.onMessage.addListener(function (msg) {

                $scope.name = msg;
                /* We are outside the context of angular in this context. With that said, an apply is required */
                $scope.$apply();
            });
        }

        init();
    });