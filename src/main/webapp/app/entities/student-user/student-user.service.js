(function() {
    'use strict';
    angular
        .module('uniConnectApp')
        .factory('StudentUser', StudentUser);

    StudentUser.$inject = ['$resource'];

    function StudentUser ($resource) {
        var resourceUrl =  'api/student-users/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
