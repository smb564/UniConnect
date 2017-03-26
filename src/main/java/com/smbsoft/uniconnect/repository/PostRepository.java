package com.smbsoft.uniconnect.repository;

import com.smbsoft.uniconnect.domain.Post;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the Post entity.
 */
@SuppressWarnings("unused")
public interface PostRepository extends MongoRepository<Post,String> {

}
