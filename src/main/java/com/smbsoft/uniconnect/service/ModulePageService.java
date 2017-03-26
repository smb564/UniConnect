package com.smbsoft.uniconnect.service;

import com.smbsoft.uniconnect.domain.ModulePage;
import com.smbsoft.uniconnect.repository.ModulePageRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service Implementation for managing ModulePage.
 */
@Service
public class ModulePageService {

    private final Logger log = LoggerFactory.getLogger(ModulePageService.class);
    
    private final ModulePageRepository modulePageRepository;

    public ModulePageService(ModulePageRepository modulePageRepository) {
        this.modulePageRepository = modulePageRepository;
    }

    /**
     * Save a modulePage.
     *
     * @param modulePage the entity to save
     * @return the persisted entity
     */
    public ModulePage save(ModulePage modulePage) {
        log.debug("Request to save ModulePage : {}", modulePage);
        ModulePage result = modulePageRepository.save(modulePage);
        return result;
    }

    /**
     *  Get all the modulePages.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    public Page<ModulePage> findAll(Pageable pageable) {
        log.debug("Request to get all ModulePages");
        Page<ModulePage> result = modulePageRepository.findAll(pageable);
        return result;
    }

    /**
     *  Get one modulePage by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    public ModulePage findOne(String id) {
        log.debug("Request to get ModulePage : {}", id);
        ModulePage modulePage = modulePageRepository.findOne(id);
        return modulePage;
    }

    /**
     *  Delete the  modulePage by id.
     *
     *  @param id the id of the entity
     */
    public void delete(String id) {
        log.debug("Request to delete ModulePage : {}", id);
        modulePageRepository.delete(id);
    }
}
