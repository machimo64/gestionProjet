package com.alteca.gestion.web.rest;

import com.alteca.gestion.domain.TypeNotification;
import com.alteca.gestion.repository.TypeNotificationRepository;
import com.alteca.gestion.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.alteca.gestion.domain.TypeNotification}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TypeNotificationResource {

    private final Logger log = LoggerFactory.getLogger(TypeNotificationResource.class);

    private static final String ENTITY_NAME = "typeNotification";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TypeNotificationRepository typeNotificationRepository;

    public TypeNotificationResource(TypeNotificationRepository typeNotificationRepository) {
        this.typeNotificationRepository = typeNotificationRepository;
    }

    /**
     * {@code POST  /type-notifications} : Create a new typeNotification.
     *
     * @param typeNotification the typeNotification to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new typeNotification, or with status {@code 400 (Bad Request)} if the typeNotification has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/type-notifications")
    public ResponseEntity<TypeNotification> createTypeNotification(@Valid @RequestBody TypeNotification typeNotification) throws URISyntaxException {
        log.debug("REST request to save TypeNotification : {}", typeNotification);
        if (typeNotification.getId() != null) {
            throw new BadRequestAlertException("A new typeNotification cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TypeNotification result = typeNotificationRepository.save(typeNotification);
        return ResponseEntity.created(new URI("/api/type-notifications/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /type-notifications} : Updates an existing typeNotification.
     *
     * @param typeNotification the typeNotification to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated typeNotification,
     * or with status {@code 400 (Bad Request)} if the typeNotification is not valid,
     * or with status {@code 500 (Internal Server Error)} if the typeNotification couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/type-notifications")
    public ResponseEntity<TypeNotification> updateTypeNotification(@Valid @RequestBody TypeNotification typeNotification) throws URISyntaxException {
        log.debug("REST request to update TypeNotification : {}", typeNotification);
        if (typeNotification.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TypeNotification result = typeNotificationRepository.save(typeNotification);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, typeNotification.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /type-notifications} : get all the typeNotifications.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of typeNotifications in body.
     */
    @GetMapping("/type-notifications")
    public List<TypeNotification> getAllTypeNotifications() {
        log.debug("REST request to get all TypeNotifications");
        return typeNotificationRepository.findAll();
    }

    /**
     * {@code GET  /type-notifications/:id} : get the "id" typeNotification.
     *
     * @param id the id of the typeNotification to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the typeNotification, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/type-notifications/{id}")
    public ResponseEntity<TypeNotification> getTypeNotification(@PathVariable Long id) {
        log.debug("REST request to get TypeNotification : {}", id);
        Optional<TypeNotification> typeNotification = typeNotificationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(typeNotification);
    }

    /**
     * {@code DELETE  /type-notifications/:id} : delete the "id" typeNotification.
     *
     * @param id the id of the typeNotification to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/type-notifications/{id}")
    public ResponseEntity<Void> deleteTypeNotification(@PathVariable Long id) {
        log.debug("REST request to delete TypeNotification : {}", id);
        typeNotificationRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
