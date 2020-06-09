package com.alteca.gestion.web.rest;

import com.alteca.gestion.GestionApp;
import com.alteca.gestion.domain.Commentaire;
import com.alteca.gestion.domain.User;
import com.alteca.gestion.domain.Tache;
import com.alteca.gestion.repository.CommentaireRepository;

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
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.alteca.gestion.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link CommentaireResource} REST controller.
 */
@SpringBootTest(classes = GestionApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class CommentaireResourceIT {

    private static final String DEFAULT_CONTENU = "AAAAAAAAAA";
    private static final String UPDATED_CONTENU = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_DATE_HEURE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATE_HEURE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private CommentaireRepository commentaireRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCommentaireMockMvc;

    private Commentaire commentaire;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Commentaire createEntity(EntityManager em) {
        Commentaire commentaire = new Commentaire()
            .contenu(DEFAULT_CONTENU)
            .dateHeure(DEFAULT_DATE_HEURE);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        commentaire.setUser(user);
        // Add required entity
        Tache tache;
        if (TestUtil.findAll(em, Tache.class).isEmpty()) {
            tache = TacheResourceIT.createEntity(em);
            em.persist(tache);
            em.flush();
        } else {
            tache = TestUtil.findAll(em, Tache.class).get(0);
        }
        commentaire.setTache(tache);
        return commentaire;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Commentaire createUpdatedEntity(EntityManager em) {
        Commentaire commentaire = new Commentaire()
            .contenu(UPDATED_CONTENU)
            .dateHeure(UPDATED_DATE_HEURE);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        commentaire.setUser(user);
        // Add required entity
        Tache tache;
        if (TestUtil.findAll(em, Tache.class).isEmpty()) {
            tache = TacheResourceIT.createUpdatedEntity(em);
            em.persist(tache);
            em.flush();
        } else {
            tache = TestUtil.findAll(em, Tache.class).get(0);
        }
        commentaire.setTache(tache);
        return commentaire;
    }

    @BeforeEach
    public void initTest() {
        commentaire = createEntity(em);
    }

    @Test
    @Transactional
    public void createCommentaire() throws Exception {
        int databaseSizeBeforeCreate = commentaireRepository.findAll().size();

        // Create the Commentaire
        restCommentaireMockMvc.perform(post("/api/commentaires")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(commentaire)))
            .andExpect(status().isCreated());

        // Validate the Commentaire in the database
        List<Commentaire> commentaireList = commentaireRepository.findAll();
        assertThat(commentaireList).hasSize(databaseSizeBeforeCreate + 1);
        Commentaire testCommentaire = commentaireList.get(commentaireList.size() - 1);
        assertThat(testCommentaire.getContenu()).isEqualTo(DEFAULT_CONTENU);
        assertThat(testCommentaire.getDateHeure()).isEqualTo(DEFAULT_DATE_HEURE);
    }

    @Test
    @Transactional
    public void createCommentaireWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = commentaireRepository.findAll().size();

        // Create the Commentaire with an existing ID
        commentaire.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCommentaireMockMvc.perform(post("/api/commentaires")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(commentaire)))
            .andExpect(status().isBadRequest());

        // Validate the Commentaire in the database
        List<Commentaire> commentaireList = commentaireRepository.findAll();
        assertThat(commentaireList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkContenuIsRequired() throws Exception {
        int databaseSizeBeforeTest = commentaireRepository.findAll().size();
        // set the field null
        commentaire.setContenu(null);

        // Create the Commentaire, which fails.

        restCommentaireMockMvc.perform(post("/api/commentaires")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(commentaire)))
            .andExpect(status().isBadRequest());

        List<Commentaire> commentaireList = commentaireRepository.findAll();
        assertThat(commentaireList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateHeureIsRequired() throws Exception {
        int databaseSizeBeforeTest = commentaireRepository.findAll().size();
        // set the field null
        commentaire.setDateHeure(null);

        // Create the Commentaire, which fails.

        restCommentaireMockMvc.perform(post("/api/commentaires")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(commentaire)))
            .andExpect(status().isBadRequest());

        List<Commentaire> commentaireList = commentaireRepository.findAll();
        assertThat(commentaireList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCommentaires() throws Exception {
        // Initialize the database
        commentaireRepository.saveAndFlush(commentaire);

        // Get all the commentaireList
        restCommentaireMockMvc.perform(get("/api/commentaires?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(commentaire.getId().intValue())))
            .andExpect(jsonPath("$.[*].contenu").value(hasItem(DEFAULT_CONTENU)))
            .andExpect(jsonPath("$.[*].dateHeure").value(hasItem(sameInstant(DEFAULT_DATE_HEURE))));
    }
    
    @Test
    @Transactional
    public void getCommentaire() throws Exception {
        // Initialize the database
        commentaireRepository.saveAndFlush(commentaire);

        // Get the commentaire
        restCommentaireMockMvc.perform(get("/api/commentaires/{id}", commentaire.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(commentaire.getId().intValue()))
            .andExpect(jsonPath("$.contenu").value(DEFAULT_CONTENU))
            .andExpect(jsonPath("$.dateHeure").value(sameInstant(DEFAULT_DATE_HEURE)));
    }

    @Test
    @Transactional
    public void getNonExistingCommentaire() throws Exception {
        // Get the commentaire
        restCommentaireMockMvc.perform(get("/api/commentaires/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCommentaire() throws Exception {
        // Initialize the database
        commentaireRepository.saveAndFlush(commentaire);

        int databaseSizeBeforeUpdate = commentaireRepository.findAll().size();

        // Update the commentaire
        Commentaire updatedCommentaire = commentaireRepository.findById(commentaire.getId()).get();
        // Disconnect from session so that the updates on updatedCommentaire are not directly saved in db
        em.detach(updatedCommentaire);
        updatedCommentaire
            .contenu(UPDATED_CONTENU)
            .dateHeure(UPDATED_DATE_HEURE);

        restCommentaireMockMvc.perform(put("/api/commentaires")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCommentaire)))
            .andExpect(status().isOk());

        // Validate the Commentaire in the database
        List<Commentaire> commentaireList = commentaireRepository.findAll();
        assertThat(commentaireList).hasSize(databaseSizeBeforeUpdate);
        Commentaire testCommentaire = commentaireList.get(commentaireList.size() - 1);
        assertThat(testCommentaire.getContenu()).isEqualTo(UPDATED_CONTENU);
        assertThat(testCommentaire.getDateHeure()).isEqualTo(UPDATED_DATE_HEURE);
    }

    @Test
    @Transactional
    public void updateNonExistingCommentaire() throws Exception {
        int databaseSizeBeforeUpdate = commentaireRepository.findAll().size();

        // Create the Commentaire

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCommentaireMockMvc.perform(put("/api/commentaires")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(commentaire)))
            .andExpect(status().isBadRequest());

        // Validate the Commentaire in the database
        List<Commentaire> commentaireList = commentaireRepository.findAll();
        assertThat(commentaireList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCommentaire() throws Exception {
        // Initialize the database
        commentaireRepository.saveAndFlush(commentaire);

        int databaseSizeBeforeDelete = commentaireRepository.findAll().size();

        // Delete the commentaire
        restCommentaireMockMvc.perform(delete("/api/commentaires/{id}", commentaire.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Commentaire> commentaireList = commentaireRepository.findAll();
        assertThat(commentaireList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
