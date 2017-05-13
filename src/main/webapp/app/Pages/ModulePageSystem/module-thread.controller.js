(function(){
    'use strict';

    angular
        .module('uniConnectApp')
        .controller('ModuleThreadController', ModuleThreadController);

    ModuleThreadController.$inject = ['entity', 'Post', 'AlertService'];

    function ModuleThreadController(entity, Post, AlertService){
        var vm = this;

        // Method to save new post
        vm.addPost = addPost;

        // To format the string before displaying
        vm.formatString = formatString;

        // To format date
        vm.formatDate = formatDate;

        vm.modulePage = entity;
        vm.post = {};
        vm.posts = [];
        vm.addingPost = false;

        loadPosts();

        // Getting all the posts
        function loadPosts(){
            Post.getModule({ module : vm.modulePage.id}, function (data) {
                vm.posts = data;
            });
        }



        function addPost () {
            vm.isSaving = true;
            if (vm.post.id != null) {
                Post.update(vm.post, onSaveSuccess, onSaveError);
            } else {
                Post.saveModule({module : vm.modulePage.id}, vm.post, onSaveSuccess, onSaveError);
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

        function formatString(text){
            // Add line breaks when displaying
            return text.replace("\n", "<br>");
        }

        function formatDate(dateString){
            console.log(dateString.split("T") + "This");
            return dateString.split("T")[0];
        }
    }

})();
