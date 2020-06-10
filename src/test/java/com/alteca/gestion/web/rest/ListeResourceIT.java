package com.alteca.gestion.web.rest;

import com.alteca.gestion.GestionApp;
import com.alteca.gestion.domain.Liste;
import com.alteca.gestion.domain.Projet;
import com.alteca.gestion.repository.ListeRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ListeResource} REST controller.
 */
@SpringBootTest(classes = GestionApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class ListeResourceIT {

    private static final String DEFAULT_TITRE = "AAAAAAAAAA";
    private static final String UPDATED_TITRE = "BBBBBBBBBB";

    private static final Integer DEFAULT_POSITION = 1;
    private static final Integer UPDATED_POSITION = 2;

    @Autowired
    private ListeRepository listeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restListeMockMvc;

    private Liste liste;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Liste createEntity(EntityManager em) {
        Liste liste = new Liste()
            .titre(DEFAULT_TITRE)
            .position(DEFAULT_POSITION);
        // Add required entity
        Projet projet;
        if (TestUtil.findAll(em, Projet.class).isEmpty()) {
            projet = ProjetResourceIT.createEntity(em);
            em.persist(projet);
            em.flush();
        } else {
            projet = TestUtil.findAll(em, Projet.class).get(0);
        }
        liste.setProjet(projet);
        return liste;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Liste createUpdatedEntity(EntityManager em) {
        Liste liste = new Liste()
            .titre(UPDATED_TITRE)
            .position(UPDATED_POSITION);
        // Add required entity
        Projet projet;
        if (TestUtil.findAll(em, Projet.class).isEmpty()) {
            projet = ProjetResourceIT.createUpdatedEntity(em);
            em.persist(projet);
            em.flush();
        } else {
            projet = TestUtil.findAll(em, Projet.class).get(0);
        }
        liste.setProjet(projet);
        return liste;
    }

    @BeforeEach
    public void initTest() {
        liste = createEntity(em);
    }

    @Test
    @Transactional
    public void createListe() throws Exception {
        int databaseSizeBeforeCreate = listeRepository.findAll().size();

        // Create the Liste
        restListeMockMvc.perform(post("/api/listes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(liste)))
            .andExpect(status().isCreated());

        // Validate the Liste in the database
        List<Liste> listeList = listeRepository.findAll();
        assertThat(listeList).hasSize(databaseSizeBeforeCreate + 1);
        Liste testListe = listeList.get(listeList.size() - 1);
        assertThat(testListe.getTitre()).isEqualTo(DEFAULT_TITRE);
        assertThat(testListe.getPosition()).isEqualTo(DEFAULT_POSITION);
    }

    @Test
    @Transactional
    public void createListeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = listeRepository.findAll().size();

        // Create the Liste with an existing ID
        liste.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restListeMockMvc.perform(post("/api/listes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(liste)))
            .andExpect(status().isBadRequest());

        // Validate the Liste in the database
        List<Liste> listeList = listeRepository.findAll();
        assertThat(listeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTitreIsRequired() throws Exception {
        int databaseSizeBeforeTest = listeRepository.findAll().size();
        // set the field null
        liste.setTitre(null);

        // Create the Liste, which fails.

        restListeMockMvc.perform(post("/api/listes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(liste)))
            .andExpect(status().isBadRequest());

        List<Liste> listeList = listeRepository.findAll();
        assertThat(listeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPositionIsRequired() throws Exception {
        int databaseSizeBeforeTest = listeRepository.findAll().size();
        // set the field null
        liste.setPosition(null);

        // Create the Liste, which fails.

        restListeMockMvc.perform(post("/api/listes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(liste)))
            .andExpect(status().isBadRequest());

        List<Liste> listeList = listeRepository.findAll();
        assertThat(listeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllListes() throws Exception {
        // Initialize the database
        listeRepository.saveAndFlush(liste);

        // Get all the listeList
        restListeMockMvc.perform(get("/api/listes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(liste.getId().intValue())))
            .andExpect(jsonPath("$.[*].titre").value(hasItem(DEFAULT_TITRE)))
            .andExpect(jsonPath("$.[*].position").value(hasItem(DEFAULT_POSITION)));
    }
    
    @Test
    @Transactional
    public void getListe() throws Exception {
        // Initialize the database
        listeRepository.saveAndFlush(liste);

        // Get the liste
        restListeMockMvc.perform(get("/api/listes/{id}", liste.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(liste.getId().intValue()))
            .andExpect(jsonPath("$.titre").value(DEFAULT_TITRE))
            .andExpect(jsonPath("$.position").value(DEFAULT_POSITION));
    }

    @Test
    @Transactional
    public void getNonExistingListe() throws Exception {
        // Get the liste
        restListeMockMvc.perform(get("/api/listes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateListe() throws Exception {
        // Initialize the database
        listeRepository.saveAndFlush(liste);

        int databaseSizeBeforeUpdate = listeRepository.findAll().size();

        // Update the liste
        Liste updatedListe = listeRepository.findById(liste.getId()).get();
        // Disconnect from session so that the updates on updatedListe are not directly saved in db
        em.detach(updatedListe);
        updatedListe
            .titre(UPDATED_TITRE)
            .position(UPDATED_POSITION);

        restListeMockMvc.perform(put("/api/listes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedListe)))
            .andExpect(status().isOk());

        // Validate the Liste in the database
        List<Liste> listeList = listeRepository.findAll();
        assertThat(listeList).hasSize(databaseSizeBeforeUpdate);
        Liste testListe = listeList.get(listeList.size() - 1);
        assertThat(testListe.getTitre()).isEqualTo(UPDATED_TITRE);
        assertThat(testListe.getPosition()).isEqualTo(UPDATED_POSITION);
    }

    @Test
    @Transactional
    public void updateNonExistingListe() throws Exception {
        int databaseSizeBeforeUpdate = listeRepository.findAll().size();

        // Create the Liste

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restListeMockMvc.perform(put("/api/listes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(liste)))
            .andExpect(status().isBadRequest());

        // Validate the Liste in the database
        List<Liste> listeList = listeRepository.findAll();
        assertThat(listeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteListe() throws Exception {
        // Initialize the database
        listeRepository.saveAndFlush(liste);

        int databaseSizeBeforeDelete = listeRepository.findAll().size();

        // Delete the liste
        restListeMockMvc.perform(delete("/api/listes/{id}", liste.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Liste> listeList = listeRepository.findAll();
        assertThat(listeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
