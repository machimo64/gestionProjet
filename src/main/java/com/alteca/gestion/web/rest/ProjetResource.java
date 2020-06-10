package com.alteca.gestion.web.rest;

import com.alteca.gestion.domain.*;
import com.alteca.gestion.domain.enumeration.Role;
import com.alteca.gestion.repository.ListeRepository;
import com.alteca.gestion.repository.MembresRepository;
import com.alteca.gestion.repository.ProjetRepository;
import com.alteca.gestion.repository.UserRepository;
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
import java.util.*;

/**
 * REST controller for managing {@link com.alteca.gestion.domain.Projet}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ProjetResource {

    private final Logger log = LoggerFactory.getLogger(ProjetResource.class);

    private static final String ENTITY_NAME = "projet";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProjetRepository projetRepository;
    private final MembresRepository membresRepository;
    private final UserRepository userRepository;
    private final ListeRepository listeRepository;

    public ProjetResource(ProjetRepository projetRepository, MembresRepository membresRepository, UserRepository userRepository, ListeRepository listeRepository) {
        this.projetRepository = projetRepository;
        this.membresRepository = membresRepository;
        this.userRepository = userRepository;
        this.listeRepository = listeRepository;
    }

    /**
     * {@code POST  /projets} : Create a new projet.
     *
     * @param projet the projet to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new projet, or with status {@code 400 (Bad Request)} if the projet has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/projets")
    public ResponseEntity<Projet> createProjet(@Valid @RequestBody Projet projet) throws URISyntaxException {
        log.debug("REST request to save Projet : {}", projet);
        if (projet.getId() != null) {
            throw new BadRequestAlertException("A new projet cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Projet result = projetRepository.save(projet);

        //On ajoute le créateur du projet dans les membres, avec le droit de modification
        Membres membre = new Membres();
        membre.setProjet(projet);membre.setRole(Role.MODIFIER);membre.setUser(projet.getUser());
        membresRepository.save(membre);

        //On ajoute les autres admins en tant que membre du projet
        Set<Authority> authorities = new HashSet<Authority>();
        Authority admin = new Authority();
        admin.setName("ROLE_ADMIN");
        authorities.add(admin);
        List<User> admins = userRepository.findAllByAuthoritiesIn(authorities);
        admins.forEach((a) -> {
            if(!a.equals(projet.getUser())) {
                Membres m = new Membres();
                m.setProjet(projet);m.setRole(Role.MODIFIER);m.setUser(a);
                membresRepository.save(m);
            }
        });

        if (projet.getModele().equals("Agile")){
            System.out.println("**************************************************************");
            Liste stories = new Liste();
            stories.setProjet(projet);stories.setTitre("Stories");stories.setPosition(1);
            listeRepository.save(stories);

            Liste todo = new Liste();
            todo.setProjet(projet);todo.setTitre("To Do");todo.setPosition(2);
            listeRepository.save(todo);

            Liste verify = new Liste();
            verify.setProjet(projet);verify.setTitre("Verify");verify.setPosition(3);
            listeRepository.save(verify);

            Liste done = new Liste();
            done.setProjet(projet);done.setTitre("Done");done.setPosition(4);
            listeRepository.save(done);
        }

        return ResponseEntity.created(new URI("/api/projets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /projets} : Updates an existing projet.
     *
     * @param projet the projet to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated projet,
     * or with status {@code 400 (Bad Request)} if the projet is not valid,
     * or with status {@code 500 (Internal Server Error)} if the projet couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/projets")
    public ResponseEntity<Projet> updateProjet(@Valid @RequestBody Projet projet) throws URISyntaxException {
        log.debug("REST request to update Projet : {}", projet);
        if (projet.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Projet result = projetRepository.save(projet);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, projet.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /projets} : get all the projets.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of projets in body.
     */
    @GetMapping("/projets")
    public List<Projet> getAllProjets() {
        log.debug("REST request to get all Projets");
        return projetRepository.findAll();
    }

    /**
     * {@code GET  /projets/ByMembre} : get all the projets from a membre.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of projets in body.
     */
    @GetMapping("/projets/ByMembre")
    public List<Projet> getProjetsByMembre() {
        log.debug("REST request to get all Projets from a membre");
        return projetRepository.findProjetMembre();
    }

    /**
     * {@code GET  /projets/ByNotMembre} : get all the projets where user is not membre.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of projets in body.
     */
    @GetMapping("/projets/ByNotMembre")
    public List<Projet> getProjetsNotMembre() {
        log.debug("REST request to get all Projets where user is not membre");
        return projetRepository.findProjetNotMembre();
    }

    /**
     * {@code GET  /projets/:id} : get the "id" projet.
     *
     * @param id the id of the projet to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the projet, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/projets/{id}")
    public ResponseEntity<Projet> getProjet(@PathVariable Long id) {
        log.debug("REST request to get Projet : {}", id);
        Optional<Projet> projet = projetRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(projet);
    }


    /**
     * {@code DELETE  /projets/:id} : delete the "id" projet.
     *
     * @param id the id of the projet to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/projets/{id}")
    public ResponseEntity<Void> deleteProjet(@PathVariable Long id) {
        log.debug("REST request to delete Projet : {}", id);
        MembresResource membres = new MembresResource(this.membresRepository);
        membres.deleteMembresByProjet(id);
        projetRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
