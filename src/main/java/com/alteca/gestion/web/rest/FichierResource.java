package com.alteca.gestion.web.rest;

import com.alteca.gestion.domain.Fichier;
import com.alteca.gestion.repository.FichierRepository;
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
 * REST controller for managing {@link com.alteca.gestion.domain.Fichier}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class FichierResource {

    private final Logger log = LoggerFactory.getLogger(FichierResource.class);

    private static final String ENTITY_NAME = "fichier";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FichierRepository fichierRepository;

    public FichierResource(FichierRepository fichierRepository) {
        this.fichierRepository = fichierRepository;
    }

    /**
     * {@code POST  /fichiers} : Create a new fichier.
     *
     * @param fichier the fichier to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new fichier, or with status {@code 400 (Bad Request)} if the fichier has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/fichiers")
    public ResponseEntity<Fichier> createFichier(@Valid @RequestBody Fichier fichier) throws URISyntaxException {
        log.debug("REST request to save Fichier : {}", fichier);
        if (fichier.getId() != null) {
            throw new BadRequestAlertException("A new fichier cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Fichier result = fichierRepository.save(fichier);
        return ResponseEntity.created(new URI("/api/fichiers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /fichiers} : Updates an existing fichier.
     *
     * @param fichier the fichier to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated fichier,
     * or with status {@code 400 (Bad Request)} if the fichier is not valid,
     * or with status {@code 500 (Internal Server Error)} if the fichier couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/fichiers")
    public ResponseEntity<Fichier> updateFichier(@Valid @RequestBody Fichier fichier) throws URISyntaxException {
        log.debug("REST request to update Fichier : {}", fichier);
        if (fichier.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Fichier result = fichierRepository.save(fichier);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, fichier.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /fichiers} : get all the fichiers.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of fichiers in body.
     */
    @GetMapping("/fichiers")
    public List<Fichier> getAllFichiers() {
        log.debug("REST request to get all Fichiers");
        return fichierRepository.findAll();
    }

    /**
     * {@code GET  /fichiers/:id} : get the "id" fichier.
     *
     * @param id the id of the fichier to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the fichier, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/fichiers/{id}")
    public ResponseEntity<Fichier> getFichier(@PathVariable Long id) {
        log.debug("REST request to get Fichier : {}", id);
        Optional<Fichier> fichier = fichierRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(fichier);
    }

    /**
     * {@code DELETE  /fichiers/:id} : delete the "id" fichier.
     *
     * @param id the id of the fichier to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/fichiers/{id}")
    public ResponseEntity<Void> deleteFichier(@PathVariable Long id) {
        log.debug("REST request to delete Fichier : {}", id);
        fichierRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
