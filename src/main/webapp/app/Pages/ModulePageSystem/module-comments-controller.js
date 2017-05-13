(function(){
    'use strict';

    angular
        .module('uniConnectApp')
        .controller('ModuleCommentsController', ModuleCommentsController);

    ModuleCommentsController.$inject = ['entity', 'Post', 'Comment', 'AlertService'];

    function ModuleCommentsController(entity, Post, Comment, AlertService){
        var vm = this;
        vm.post = entity;
        vm.comment = {};
        vm.comments = [];
        vm.saveComment = saveComment;

        // To format the string before displaying
        vm.formatString = formatString;

        loadComments();

        // get the comments for the post
        function loadComments(){
            vm.comments = Comment.getForPost({id : vm.post.id});
        }

        function saveComment(){
            vm.isSaving = true;
            Comment.save({postId : vm.post.id}, vm.comment, saveSuccess, saveError);
        }

        function saveSuccess(){
            vm.isSaving = false;
            vm.comment.text = "";
            loadComments();
        }

        function saveError(){
            vm.isSaving = false;
        }

        function formatString(text){
            // Add line breaks when displaying
            return text.replace("\n", "<br>");
        }
    }
})();
