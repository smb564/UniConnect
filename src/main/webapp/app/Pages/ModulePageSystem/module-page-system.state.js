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
            })
            .state('module-thread', {
                parent: 'module-pages-system',
                url: '/modules/{id}',
                data: {
                    authorities: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_COMPANY'],
                    pageTitle: 'Modules'
                },
                views:{
                    'content@':{
                        templateUrl: 'app/Pages/ModulePageSystem/module-thread.html',
                        controller: 'ModuleThreadController',
                        controllerAs: 'vm'
                    }
                },
                resolve:{
                    entity: ['$stateParams', 'ModulePage', function ($stateParams, ModulePage) {
                        return ModulePage.get({id:$stateParams.id}).$promise;
                    }]
                }

            })
        ;
    }

    }
)();
