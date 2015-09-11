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
            controller: 'WebSocketAnalyzerController'
        }
    });