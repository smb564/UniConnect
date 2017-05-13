package com.smbsoft.uniconnect.service;

import com.fasterxml.jackson.annotation.JacksonInject;
import com.smbsoft.uniconnect.domain.ModulePage;
import com.smbsoft.uniconnect.domain.Post;
import com.smbsoft.uniconnect.repository.PostRepository;
import com.smbsoft.uniconnect.security.SecurityUtils;
import javafx.scene.control.Pagination;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.security.Security;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * Service Implementation for managing Post.
 */
@Service
public class PostService {

    private final Logger log = LoggerFactory.getLogger(PostService.class);

    private final PostRepository postRepository;

    @Autowired
    private ModulePageService modulePageService;

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

        Post result = postRepository.save(post);

        return result;
    }

    /**
     * Save a post.
     *
     * @param post the entity to save
     * @return the persisted entity
     */
    public Post saveModule(Post post, String moduleId) {
        log.debug("Request to save Post : {}", post);

        // post owner should be the current logged in user
        Post result = postRepository.save(post
            .ownerLogin(SecurityUtils.getCurrentUserLogin())
            .date(LocalDate.now())
            .votes(0)
        );

        // And the new post should be added to the module page
        ModulePage modulePage = modulePageService.findOne(moduleId);

        List<String> tempList = modulePage.getPosts();

        if (tempList == null){
            modulePage.setPosts(new ArrayList<String>());
            modulePage.getPosts().add(result.getId());
        }
        else{
            modulePage.getPosts().add(result.getId());
        }

        modulePageService.save(modulePage);

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

    public List<Post> findByModule(String moduleId) {
        ModulePage modulePage = modulePageService.findOne(moduleId);
        List<Post> posts = new ArrayList<>();

        if (modulePage.getPosts() == null)
            return new ArrayList<>();

        for(String postId : modulePage.getPosts()){
            posts.add(postRepository.findOne(postId));
        }

        return posts;
    }
}
