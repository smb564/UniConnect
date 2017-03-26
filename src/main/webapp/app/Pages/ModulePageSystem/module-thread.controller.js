(function(){
    'use strict';

    angular
        .module('uniConnectApp')
        .controller('ModuleThreadController', ModuleThreadController);

    ModuleThreadController.$inject = ['entity', 'Post', 'AlertService'];

    function ModuleThreadController(entity, Post, AlertService){
        var vm = this;

        vm.addPost = addPost;
        vm.modulePage = entity;
        vm.post = {};
        vm.post.modulePage = vm.modulePage.id;
        vm.posts = [];


        loadPosts();

        // Getting all the posts
        function loadPosts(){
            Post.getModule({ module : vm.modulePage.id}, function (data) {
                vm.posts = data;
            });
        }



        function addPost () {
            vm.isSaving = true;
            if (vm.post.id !== null) {
                Post.update(vm.post, onSaveSuccess, onSaveError);
            } else {
                Post.save(vm.post, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess(){
            vm.isSaving = false;
            vm.post.title = "";
            vm.post.description = "";
            loadPosts();
        }

        function onSaveError(){
            vm.isSaving = false;
        }
    }

})();
