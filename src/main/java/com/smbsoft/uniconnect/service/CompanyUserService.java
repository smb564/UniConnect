package com.smbsoft.uniconnect.service;

import com.smbsoft.uniconnect.domain.CompanyUser;
import com.smbsoft.uniconnect.repository.CompanyUserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service Implementation for managing CompanyUser.
 */
@Service
public class CompanyUserService {

    private final Logger log = LoggerFactory.getLogger(CompanyUserService.class);
    
    private final CompanyUserRepository companyUserRepository;

    public CompanyUserService(CompanyUserRepository companyUserRepository) {
        this.companyUserRepository = companyUserRepository;
    }

    /**
     * Save a companyUser.
     *
     * @param companyUser the entity to save
     * @return the persisted entity
     */
    public CompanyUser save(CompanyUser companyUser) {
        log.debug("Request to save CompanyUser : {}", companyUser);
        CompanyUser result = companyUserRepository.save(companyUser);
        return result;
    }

    /**
     *  Get all the companyUsers.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    public Page<CompanyUser> findAll(Pageable pageable) {
        log.debug("Request to get all CompanyUsers");
        Page<CompanyUser> result = companyUserRepository.findAll(pageable);
        return result;
    }

    /**
     *  Get one companyUser by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    public CompanyUser findOne(String id) {
        log.debug("Request to get CompanyUser : {}", id);
        CompanyUser companyUser = companyUserRepository.findOne(id);
        return companyUser;
    }

    /**
     *  Delete the  companyUser by id.
     *
     *  @param id the id of the entity
     */
    public void delete(String id) {
        log.debug("Request to delete CompanyUser : {}", id);
        companyUserRepository.delete(id);
    }
}
