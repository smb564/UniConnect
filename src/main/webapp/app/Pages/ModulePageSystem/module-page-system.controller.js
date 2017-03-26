(function () {
    'user strict';

    angular
        .module('uniConnectApp')
        .controller("ModuleSystemController", ModuleSystemController);

    ModuleSystemController.$inject = ['ModulePage','AlertService'];

    function ModuleSystemController(ModulePage, AlertService){
        var vm = this;
        vm.modules = [];

        ModulePage.query(onSuccess, onError);

        function onSuccess(data, headers){
            vm.modules = data;
        }

        function onError(err){
            AlertService.error(err.data.message);
        }

    }

})();
