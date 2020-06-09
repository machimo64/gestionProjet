package com.alteca.gestion.web.rest;

import com.alteca.gestion.domain.Liste;
import com.alteca.gestion.domain.Tache;
import com.alteca.gestion.repository.TacheRepository;
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
 * REST controller for managing {@link com.alteca.gestion.domain.Tache}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TacheResource {

    private final Logger log = LoggerFactory.getLogger(TacheResource.class);

    private static final String ENTITY_NAME = "tache";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TacheRepository tacheRepository;

    public TacheResource(TacheRepository tacheRepository) {
        this.tacheRepository = tacheRepository;
    }

    /**
     * {@code POST  /taches} : Create a new tache.
     *
     * @param tache the tache to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tache, or with status {@code 400 (Bad Request)} if the tache has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/taches")
    public ResponseEntity<Tache> createTache(@Valid @RequestBody Tache tache) throws URISyntaxException {
        log.debug("REST request to save Tache : {}", tache);
        if (tache.getId() != null) {
            throw new BadRequestAlertException("A new tache cannot already have an ID", ENTITY_NAME, "idexists");
        }
        long nbTache = tacheRepository.findNbTacheByListe(tache.getListe().getId());
        tache.setPosition((int) nbTache+1);
        Tache result = tacheRepository.save(tache);
        return ResponseEntity.created(new URI("/api/taches/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /taches} : Updates an existing tache.
     *
     * @param tache the tache to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tache,
     * or with status {@code 400 (Bad Request)} if the tache is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tache couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/taches")
    public ResponseEntity<Tache> updateTache(@Valid @RequestBody Tache tache) throws URISyntaxException {
        log.debug("REST request to update Tache : {}", tache);
        if (tache.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Tache result = tacheRepository.save(tache);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tache.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /taches} : get all the taches.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of taches in body.
     */
    @GetMapping("/taches")
    public List<Tache> getAllTaches() {
        log.debug("REST request to get all Taches");
        return tacheRepository.findAll();
    }

    /**
     * {@code GET  /taches/ByListe/:idListe} : get taches from a liste.
     *
     * @param idListe the id of the liste to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the taches, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/taches/ByListe/{idListe}")
    public List<Tache> getTachesByListe(@PathVariable Long idListe) {
        log.debug("REST request to get all Taches from a Liste");
        return tacheRepository.findByListe(idListe);
    }

    /**
     * {@code GET  /taches/ByProjet/:idProjet} : get taches from a projet.
     *
     * @param idProjet the id of the projet to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the taches, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/taches/ByProjet/{idProjet}")
    public List<Tache> getTachesByProjet(@PathVariable Long idProjet) {
        log.debug("REST request to get all Taches from a Liste");
        return tacheRepository.findByProjet(idProjet);
    }

    /**
     * {@code GET  /taches/:id} : get the "id" tache.
     *
     * @param id the id of the tache to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tache, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/taches/{id}")
    public ResponseEntity<Tache> getTache(@PathVariable Long id) {
        log.debug("REST request to get Tache : {}", id);
        Optional<Tache> tache = tacheRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tache);
    }


    /**
     * {@code DELETE  /taches/:id} : delete the "id" tache.
     *
     * @param id the id of the tache to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/taches/{id}")
    public ResponseEntity<Void> deleteTache(@PathVariable Long id) {
        log.debug("REST request to delete Tache : {}", id);
        tacheRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
