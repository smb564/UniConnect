(function() {
    'use strict';

    angular
        .module('uniConnectApp')
        .controller('Student_userDeleteController',Student_userDeleteController);

    Student_userDeleteController.$inject = ['$uibModalInstance', 'entity', 'Student_user'];

    function Student_userDeleteController($uibModalInstance, entity, Student_user) {
        var vm = this;

        vm.student_user = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Student_user.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
