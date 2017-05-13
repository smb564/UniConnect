package com.smbsoft.uniconnect.service;

import com.smbsoft.uniconnect.domain.Comment;
import com.smbsoft.uniconnect.domain.Post;
import com.smbsoft.uniconnect.repository.CommentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.ImportAutoConfiguration;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Comment.
 */
@Service
public class CommentService {

    private final Logger log = LoggerFactory.getLogger(CommentService.class);

    private final CommentRepository commentRepository;

    private final PostService postService;

    public CommentService(CommentRepository commentRepository, PostService postService) {
        this.commentRepository = commentRepository;
        this.postService = postService;
    }

    /**
     * Save a comment.
     *
     * @param comment the entity to save
     * @return the persisted entity
     */
    public Comment save(Comment comment) {
        log.debug("Request to save Comment : {}", comment);
        Comment result = commentRepository.save(comment);
        return result;
    }

    /**
     *  Get all the comments.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    public Page<Comment> findAll(Pageable pageable) {
        log.debug("Request to get all Comments");
        Page<Comment> result = commentRepository.findAll(pageable);
        return result;
    }

    /**
     *  Get one comment by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    public Comment findOne(String id) {
        log.debug("Request to get Comment : {}", id);
        Comment comment = commentRepository.findOne(id);
        return comment;
    }

    /**
     *  Delete the  comment by id.
     *
     *  @param id the id of the entity
     */
    public void delete(String id) {
        log.debug("Request to delete Comment : {}", id);
        commentRepository.delete(id);
    }

    /**
     *  Get comments for post.
     *
     *  @param postId the id of the post
     *  @return the comments for a post
     */
    public List<Comment> findForComment(String postId) {
        log.debug("Request to get Comments for post : {}", postId);
        Post post = postService.findOne(postId);

        List<Comment> comments = new ArrayList<>();

        if(post.getComments() == null)
            return null;

        for(String commentId : post.getComments()){
            comments.add(commentRepository.findOne(commentId));
        }

        return comments;
    }
}
