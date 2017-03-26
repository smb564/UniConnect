(function() {
    'use strict';

    angular
        .module('uniConnectApp')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['Principal', 'Auth', 'StudentUser'];

    function SettingsController (Principal, Auth, StudentUser) {
        var vm = this;

        vm.error = null;
        vm.save = save;
        vm.settingsAccount = null;
        vm.success = null;
        vm.saveProfile = saveProfile;

        /**
         * Store the "settings account" in a separate variable, and not in the shared "account" variable.
         */
        var copyAccount = function (account) {
            return {
                activated: account.activated,
                email: account.email,
                firstName: account.firstName,
                langKey: account.langKey,
                lastName: account.lastName,
                login: account.login
            };
        };

        Principal.identity().then(function(account) {
            vm.settingsAccount = copyAccount(account);
        });

        function save () {
            Auth.updateAccount(vm.settingsAccount).then(function() {
                vm.error = null;
                vm.success = 'OK';
                Principal.identity(true).then(function(account) {
                    vm.settingsAccount = copyAccount(account);
                });
            }).catch(function() {
                vm.success = null;
                vm.error = 'ERROR';
            });
        }

        function saveProfile(){
            vm.isSaving = true;
            vm.studentUser.interests = ["i1", "i2"];
            if (vm.studentUser.id !== null) {
                StudentUser.update(vm.studentUser, onSaveSuccess, onSaveError);
            } else {
                StudentUser.save(vm.studentUser, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess(){
            console.log("Save Success!");
            vm.isSaving = false;

        }

        function onSaveError(){
            console.log("Save error!, failed :-(");
            vm.isSaving = false;
        }
    }
})();
