package com.alteca.gestion.web.rest;

import com.alteca.gestion.GestionApp;
import com.alteca.gestion.domain.Tache;
import com.alteca.gestion.domain.Liste;
import com.alteca.gestion.repository.TacheRepository;

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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TacheResource} REST controller.
 */
@SpringBootTest(classes = GestionApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class TacheResourceIT {

    private static final String DEFAULT_TITRE = "AAAAAAAAAA";
    private static final String UPDATED_TITRE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_DEBUT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_DEBUT = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATE_FIN = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_FIN = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ETAT = false;
    private static final Boolean UPDATED_ETAT = true;

    private static final Integer DEFAULT_POIDS = 1;
    private static final Integer UPDATED_POIDS = 2;

    private static final String DEFAULT_CATEGORIE = "AAAAAAAAAA";
    private static final String UPDATED_CATEGORIE = "BBBBBBBBBB";

    private static final Integer DEFAULT_POSITION = 1;
    private static final Integer UPDATED_POSITION = 2;

    @Autowired
    private TacheRepository tacheRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTacheMockMvc;

    private Tache tache;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Tache createEntity(EntityManager em) {
        Tache tache = new Tache()
            .titre(DEFAULT_TITRE)
            .dateDebut(DEFAULT_DATE_DEBUT)
            .dateFin(DEFAULT_DATE_FIN)
            .description(DEFAULT_DESCRIPTION)
            .etat(DEFAULT_ETAT)
            .poids(DEFAULT_POIDS)
            .categorie(DEFAULT_CATEGORIE)
            .position(DEFAULT_POSITION);
        // Add required entity
        Liste liste;
        if (TestUtil.findAll(em, Liste.class).isEmpty()) {
            liste = ListeResourceIT.createEntity(em);
            em.persist(liste);
            em.flush();
        } else {
            liste = TestUtil.findAll(em, Liste.class).get(0);
        }
        tache.setListe(liste);
        return tache;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Tache createUpdatedEntity(EntityManager em) {
        Tache tache = new Tache()
            .titre(UPDATED_TITRE)
            .dateDebut(UPDATED_DATE_DEBUT)
            .dateFin(UPDATED_DATE_FIN)
            .description(UPDATED_DESCRIPTION)
            .etat(UPDATED_ETAT)
            .poids(UPDATED_POIDS)
            .categorie(UPDATED_CATEGORIE)
            .position(UPDATED_POSITION);
        // Add required entity
        Liste liste;
        if (TestUtil.findAll(em, Liste.class).isEmpty()) {
            liste = ListeResourceIT.createUpdatedEntity(em);
            em.persist(liste);
            em.flush();
        } else {
            liste = TestUtil.findAll(em, Liste.class).get(0);
        }
        tache.setListe(liste);
        return tache;
    }

    @BeforeEach
    public void initTest() {
        tache = createEntity(em);
    }

    @Test
    @Transactional
    public void createTache() throws Exception {
        int databaseSizeBeforeCreate = tacheRepository.findAll().size();

        // Create the Tache
        restTacheMockMvc.perform(post("/api/taches")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tache)))
            .andExpect(status().isCreated());

        // Validate the Tache in the database
        List<Tache> tacheList = tacheRepository.findAll();
        assertThat(tacheList).hasSize(databaseSizeBeforeCreate + 1);
        Tache testTache = tacheList.get(tacheList.size() - 1);
        assertThat(testTache.getTitre()).isEqualTo(DEFAULT_TITRE);
        assertThat(testTache.getDateDebut()).isEqualTo(DEFAULT_DATE_DEBUT);
        assertThat(testTache.getDateFin()).isEqualTo(DEFAULT_DATE_FIN);
        assertThat(testTache.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testTache.isEtat()).isEqualTo(DEFAULT_ETAT);
        assertThat(testTache.getPoids()).isEqualTo(DEFAULT_POIDS);
        assertThat(testTache.getCategorie()).isEqualTo(DEFAULT_CATEGORIE);
        assertThat(testTache.getPosition()).isEqualTo(DEFAULT_POSITION);
    }

    @Test
    @Transactional
    public void createTacheWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tacheRepository.findAll().size();

        // Create the Tache with an existing ID
        tache.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTacheMockMvc.perform(post("/api/taches")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tache)))
            .andExpect(status().isBadRequest());

        // Validate the Tache in the database
        List<Tache> tacheList = tacheRepository.findAll();
        assertThat(tacheList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTitreIsRequired() throws Exception {
        int databaseSizeBeforeTest = tacheRepository.findAll().size();
        // set the field null
        tache.setTitre(null);

        // Create the Tache, which fails.

        restTacheMockMvc.perform(post("/api/taches")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tache)))
            .andExpect(status().isBadRequest());

        List<Tache> tacheList = tacheRepository.findAll();
        assertThat(tacheList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateDebutIsRequired() throws Exception {
        int databaseSizeBeforeTest = tacheRepository.findAll().size();
        // set the field null
        tache.setDateDebut(null);

        // Create the Tache, which fails.

        restTacheMockMvc.perform(post("/api/taches")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tache)))
            .andExpect(status().isBadRequest());

        List<Tache> tacheList = tacheRepository.findAll();
        assertThat(tacheList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateFinIsRequired() throws Exception {
        int databaseSizeBeforeTest = tacheRepository.findAll().size();
        // set the field null
        tache.setDateFin(null);

        // Create the Tache, which fails.

        restTacheMockMvc.perform(post("/api/taches")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tache)))
            .andExpect(status().isBadRequest());

        List<Tache> tacheList = tacheRepository.findAll();
        assertThat(tacheList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = tacheRepository.findAll().size();
        // set the field null
        tache.setDescription(null);

        // Create the Tache, which fails.

        restTacheMockMvc.perform(post("/api/taches")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tache)))
            .andExpect(status().isBadRequest());

        List<Tache> tacheList = tacheRepository.findAll();
        assertThat(tacheList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPositionIsRequired() throws Exception {
        int databaseSizeBeforeTest = tacheRepository.findAll().size();
        // set the field null
        tache.setPosition(null);

        // Create the Tache, which fails.

        restTacheMockMvc.perform(post("/api/taches")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tache)))
            .andExpect(status().isBadRequest());

        List<Tache> tacheList = tacheRepository.findAll();
        assertThat(tacheList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTaches() throws Exception {
        // Initialize the database
        tacheRepository.saveAndFlush(tache);

        // Get all the tacheList
        restTacheMockMvc.perform(get("/api/taches?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tache.getId().intValue())))
            .andExpect(jsonPath("$.[*].titre").value(hasItem(DEFAULT_TITRE)))
            .andExpect(jsonPath("$.[*].dateDebut").value(hasItem(DEFAULT_DATE_DEBUT.toString())))
            .andExpect(jsonPath("$.[*].dateFin").value(hasItem(DEFAULT_DATE_FIN.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].etat").value(hasItem(DEFAULT_ETAT.booleanValue())))
            .andExpect(jsonPath("$.[*].poids").value(hasItem(DEFAULT_POIDS)))
            .andExpect(jsonPath("$.[*].categorie").value(hasItem(DEFAULT_CATEGORIE)))
            .andExpect(jsonPath("$.[*].position").value(hasItem(DEFAULT_POSITION)));
    }
    
    @Test
    @Transactional
    public void getTache() throws Exception {
        // Initialize the database
        tacheRepository.saveAndFlush(tache);

        // Get the tache
        restTacheMockMvc.perform(get("/api/taches/{id}", tache.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tache.getId().intValue()))
            .andExpect(jsonPath("$.titre").value(DEFAULT_TITRE))
            .andExpect(jsonPath("$.dateDebut").value(DEFAULT_DATE_DEBUT.toString()))
            .andExpect(jsonPath("$.dateFin").value(DEFAULT_DATE_FIN.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.etat").value(DEFAULT_ETAT.booleanValue()))
            .andExpect(jsonPath("$.poids").value(DEFAULT_POIDS))
            .andExpect(jsonPath("$.categorie").value(DEFAULT_CATEGORIE))
            .andExpect(jsonPath("$.position").value(DEFAULT_POSITION));
    }

    @Test
    @Transactional
    public void getNonExistingTache() throws Exception {
        // Get the tache
        restTacheMockMvc.perform(get("/api/taches/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTache() throws Exception {
        // Initialize the database
        tacheRepository.saveAndFlush(tache);

        int databaseSizeBeforeUpdate = tacheRepository.findAll().size();

        // Update the tache
        Tache updatedTache = tacheRepository.findById(tache.getId()).get();
        // Disconnect from session so that the updates on updatedTache are not directly saved in db
        em.detach(updatedTache);
        updatedTache
            .titre(UPDATED_TITRE)
            .dateDebut(UPDATED_DATE_DEBUT)
            .dateFin(UPDATED_DATE_FIN)
            .description(UPDATED_DESCRIPTION)
            .etat(UPDATED_ETAT)
            .poids(UPDATED_POIDS)
            .categorie(UPDATED_CATEGORIE)
            .position(UPDATED_POSITION);

        restTacheMockMvc.perform(put("/api/taches")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTache)))
            .andExpect(status().isOk());

        // Validate the Tache in the database
        List<Tache> tacheList = tacheRepository.findAll();
        assertThat(tacheList).hasSize(databaseSizeBeforeUpdate);
        Tache testTache = tacheList.get(tacheList.size() - 1);
        assertThat(testTache.getTitre()).isEqualTo(UPDATED_TITRE);
        assertThat(testTache.getDateDebut()).isEqualTo(UPDATED_DATE_DEBUT);
        assertThat(testTache.getDateFin()).isEqualTo(UPDATED_DATE_FIN);
        assertThat(testTache.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testTache.isEtat()).isEqualTo(UPDATED_ETAT);
        assertThat(testTache.getPoids()).isEqualTo(UPDATED_POIDS);
        assertThat(testTache.getCategorie()).isEqualTo(UPDATED_CATEGORIE);
        assertThat(testTache.getPosition()).isEqualTo(UPDATED_POSITION);
    }

    @Test
    @Transactional
    public void updateNonExistingTache() throws Exception {
        int databaseSizeBeforeUpdate = tacheRepository.findAll().size();

        // Create the Tache

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTacheMockMvc.perform(put("/api/taches")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tache)))
            .andExpect(status().isBadRequest());

        // Validate the Tache in the database
        List<Tache> tacheList = tacheRepository.findAll();
        assertThat(tacheList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTache() throws Exception {
        // Initialize the database
        tacheRepository.saveAndFlush(tache);

        int databaseSizeBeforeDelete = tacheRepository.findAll().size();

        // Delete the tache
        restTacheMockMvc.perform(delete("/api/taches/{id}", tache.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Tache> tacheList = tacheRepository.findAll();
        assertThat(tacheList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
