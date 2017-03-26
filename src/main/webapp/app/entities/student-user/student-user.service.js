(function() {
    'use strict';
    angular
        .module('uniConnectApp')
        .factory('Student_user', Student_user);

    Student_user.$inject = ['$resource'];

    function Student_user ($resource) {
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
