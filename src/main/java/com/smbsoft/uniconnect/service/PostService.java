package com.smbsoft.uniconnect.service;

import com.smbsoft.uniconnect.domain.Post;
import com.smbsoft.uniconnect.repository.PostRepository;
import com.smbsoft.uniconnect.security.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.security.Security;
import java.util.List;

/**
 * Service Implementation for managing Post.
 */
@Service
public class PostService {

    private final Logger log = LoggerFactory.getLogger(PostService.class);

    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    /**
     * Save a post.
     *
     * @param post the entity to save
     * @return the persisted entity
     */
    public Post save(Post post) {
        log.debug("Request to save Post : {}", post);
        // post owner should be the current logged in user
        Post result = postRepository.save(post.ownerLogin(SecurityUtils.getCurrentUserLogin()));
        return result;
    }

    /**
     *  Get all the posts.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    public Page<Post> findAll(Pageable pageable) {
        log.debug("Request to get all Posts");
        Page<Post> result = postRepository.findAll(pageable);
        return result;
    }

    /**
     *  Get one post by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    public Post findOne(String id) {
        log.debug("Request to get Post : {}", id);
        Post post = postRepository.findOne(id);
        return post;
    }

    /**
     *  Delete the  post by id.
     *
     *  @param id the id of the entity
     */
    public void delete(String id) {
        log.debug("Request to delete Post : {}", id);
        postRepository.delete(id);
    }
}
