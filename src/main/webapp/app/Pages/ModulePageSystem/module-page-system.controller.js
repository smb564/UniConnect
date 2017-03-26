(function () {
    'user strict';

    angular
        .module('uniConnectApp')
        .controller("ModuleSystemController", ModuleSystemController);

    ModuleSystemController.$inject = [];

    function ModuleSystemController(){
        var vm = this;

        vm.test = "hello from the controller";
    }

})();
