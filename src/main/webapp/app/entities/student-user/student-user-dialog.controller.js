(function() {
    'use strict';

    angular
        .module('uniConnectApp')
        .controller('Student_userDialogController', Student_userDialogController);

    Student_userDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Student_user'];

    function Student_userDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Student_user) {
        var vm = this;

        vm.student_user = entity;
        vm.clear = clear;
        vm.save = save;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.student_user.id !== null) {
                Student_user.update(vm.student_user, onSaveSuccess, onSaveError);
            } else {
                Student_user.save(vm.student_user, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('uniConnectApp:student_userUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
