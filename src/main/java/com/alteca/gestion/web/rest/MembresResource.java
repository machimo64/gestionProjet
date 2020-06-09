package com.alteca.gestion.web.rest;

import com.alteca.gestion.domain.Membres;
import com.alteca.gestion.repository.MembresRepository;
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
 * REST controller for managing {@link com.alteca.gestion.domain.Membres}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MembresResource {

    private final Logger log = LoggerFactory.getLogger(MembresResource.class);

    private static final String ENTITY_NAME = "membres";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MembresRepository membresRepository;

    public MembresResource(MembresRepository membresRepository) {
        this.membresRepository = membresRepository;
    }

    /**
     * {@code POST  /membres} : Create a new membres.
     *
     * @param membres the membres to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new membres, or with status {@code 400 (Bad Request)} if the membres has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/membres")
    public ResponseEntity<Membres> createMembres(@Valid @RequestBody Membres membres) throws URISyntaxException {
        log.debug("REST request to save Membres : {}", membres);
        if (membres.getId() != null) {
            throw new BadRequestAlertException("A new membres cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Membres result = membresRepository.save(membres);
        return ResponseEntity.created(new URI("/api/membres/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /membres} : Updates an existing membres.
     *
     * @param membres the membres to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated membres,
     * or with status {@code 400 (Bad Request)} if the membres is not valid,
     * or with status {@code 500 (Internal Server Error)} if the membres couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/membres")
    public ResponseEntity<Membres> updateMembres(@Valid @RequestBody Membres membres) throws URISyntaxException {
        log.debug("REST request to update Membres : {}", membres);
        if (membres.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Membres result = membresRepository.save(membres);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, membres.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /membres} : get all the membres.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of membres in body.
     */
    @GetMapping("/membres")
    public List<Membres> getAllMembres() {
        log.debug("REST request to get all Membres");
        return membresRepository.findAll();
    }

    /**
     * {@code GET  /membres/ByProjet/:idProjet} : get all the membres from a projet.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of membres in body.
     */
    @GetMapping("/membres/ByProjet/{idProjet}")
    public List<Membres> getMembresByProjet(@PathVariable Long idProjet) {
        log.debug("REST request to get all Membres from a Projet");
        return membresRepository.findByProjet(idProjet);
    }

    /**
     * {@code GET  /membres/:id} : get the "id" membres.
     *
     * @param id the id of the membres to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the membres, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/membres/{id}")
    public ResponseEntity<Membres> getMembres(@PathVariable Long id) {
        log.debug("REST request to get Membres : {}", id);
        Optional<Membres> membres = membresRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(membres);
    }

    /**
     * {@code GET  /membres/ByNotTache/:idTache} : get all the membres which are not in a tache.
     *
     * @param idTache the id of the tache to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the membres, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/membres/ByNotTache/{idTache}")
    public List<Membres> getMembresByNotTache(@PathVariable Long idTache) {
        log.debug("REST request to get Membres : {}", idTache);
        return membresRepository.findByNotTache(idTache);
    }

    /**
     * {@code GET  /membres/ByUserAndProjet/:idProjet} : check if a membre is user of projet.
     *
     * @param idProjet the id of the projet to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the membres, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/membres/ByUserAndProjet/{idProjet}")
    public Membres getMembresByUserAndProjet(@PathVariable Long idProjet) {
        log.debug("REST request to get Membres : {}", idProjet);
        return membresRepository.findByUserAndProjet(idProjet);
    }

    /**
     * {@code DELETE  /membres/:id} : delete the "id" membres.
     *
     * @param id the id of the membres to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/membres/{id}")
    public ResponseEntity<Void> deleteMembres(@PathVariable Long id) {
        log.debug("REST request to delete Membres : {}", id);
        membresRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code DELETE  /membresByProjet/:idProjet} : delete all the membres from a project.
     *
     * @param idProjet the id of the projet to delete all the membres.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/membres/ByProjet/{id}")
    public ResponseEntity<Void> deleteMembresByProjet(@PathVariable Long idProjet) {
        log.debug("REST request to delete Membres from a projet : {}", idProjet);
        membresRepository.deleteByIdProjet(idProjet);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, idProjet.toString())).build();
    }
}
