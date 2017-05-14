(function(){
    'use strict';

    angular
        .module('uniConnectApp')
        .controller('ModuleCommentsController', ModuleCommentsController);

    ModuleCommentsController.$inject = ['entity', 'Post', 'Comment', 'AlertService', 'Principal'];

    function ModuleCommentsController(entity, Post, Comment, AlertService, Principal){
        var vm = this;
        vm.post = entity;
        vm.comment = {};
        vm.comments = [];
        vm.isAdmin = false;

        vm.saveComment = saveComment;

        // To format the string before displaying
        vm.formatString = formatString;

        vm.deleteComment = deleteComment;

        Principal.identity().then(function(account) {
            vm.account = account;

            for(var i=0; i < vm.account.authorities.length; i++){
                if ("ROLE_ADMIN" == vm.account.authorities[i]){
                    vm.isAdmin = true;
                    break;
                }
            }
        });

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

        function deleteComment(id){
            if (confirm("Do you want to delete the comment?")){
                Comment.deleteForPost({postId : vm.post.id, commentId : id}, loadComments);
            }
        }
    }
})();
