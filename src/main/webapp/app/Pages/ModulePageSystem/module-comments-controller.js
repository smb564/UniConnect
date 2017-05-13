(function(){
    'use strict';

    angular
        .module('uniConnectApp')
        .controller('ModuleCommentsController', ModuleCommentsController);

    ModuleCommentsController.$inject = ['Post', 'Comment'];

    function ModuleCommentsController(entity, Post, Comment){
        var vm = this;
        vm.post = entity;

        vm.hello = "Hello from the controller";
    }
})();
