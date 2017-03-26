(function(){
    'use strict';

    angular
        .module('uniConnectApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider){
        $stateProvider
            .state('module-pages-system', {
                parent: 'entity',
                url: '/modules',
                data: {
                    authorities: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_COMPANY'],
                    pageTitle: 'Modules'
                },
                views:{
                    'content@':{
                        templateUrl : 'app/Pages/ModulePageSystem/module-page-system-main.html',
                        controller: 'ModuleSystemController',
                        controllerAs: 'vm'
                    }
                }
            });
    }

    }
)();
