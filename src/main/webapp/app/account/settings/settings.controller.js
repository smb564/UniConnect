(function() {
    'use strict';

    angular
        .module('uniConnectApp')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['Principal', 'Auth', 'StudentUser', 'INTEREST_FIELDS'];

    function SettingsController (Principal, Auth, StudentUser, INTEREST_FIELDS) {
        var vm = this;

        // Interests should be one of the following (Loaded from constants)
        vm.interests = INTEREST_FIELDS;

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
            if (vm.studentUser.id !== null) {
                StudentUser.update(vm.studentUser, onSaveSuccess, onSaveError);
            } else {
                StudentUser.save(vm.studentUser, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess(){
            vm.isSaving = false;
            vm.error = null;
            vm.success = "OK";
        }

        function onSaveError(){
            vm.isSaving = false;
            vm.success = null;
            vm.error = "ERROR";
        }
    }
})();
