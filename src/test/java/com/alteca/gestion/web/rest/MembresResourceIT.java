package com.alteca.gestion.web.rest;

import com.alteca.gestion.GestionApp;
import com.alteca.gestion.domain.Membres;
import com.alteca.gestion.domain.User;
import com.alteca.gestion.domain.Projet;
import com.alteca.gestion.repository.MembresRepository;

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

import com.alteca.gestion.domain.enumeration.Role;
/**
 * Integration tests for the {@link MembresResource} REST controller.
 */
@SpringBootTest(classes = GestionApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class MembresResourceIT {

    private static final Role DEFAULT_ROLE = Role.MODIFIER;
    private static final Role UPDATED_ROLE = Role.CONSULTER;

    @Autowired
    private MembresRepository membresRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMembresMockMvc;

    private Membres membres;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Membres createEntity(EntityManager em) {
        Membres membres = new Membres()
            .role(DEFAULT_ROLE);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        membres.setUser(user);
        // Add required entity
        Projet projet;
        if (TestUtil.findAll(em, Projet.class).isEmpty()) {
            projet = ProjetResourceIT.createEntity(em);
            em.persist(projet);
            em.flush();
        } else {
            projet = TestUtil.findAll(em, Projet.class).get(0);
        }
        membres.setProjet(projet);
        return membres;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Membres createUpdatedEntity(EntityManager em) {
        Membres membres = new Membres()
            .role(UPDATED_ROLE);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        membres.setUser(user);
        // Add required entity
        Projet projet;
        if (TestUtil.findAll(em, Projet.class).isEmpty()) {
            projet = ProjetResourceIT.createUpdatedEntity(em);
            em.persist(projet);
            em.flush();
        } else {
            projet = TestUtil.findAll(em, Projet.class).get(0);
        }
        membres.setProjet(projet);
        return membres;
    }

    @BeforeEach
    public void initTest() {
        membres = createEntity(em);
    }

    @Test
    @Transactional
    public void createMembres() throws Exception {
        int databaseSizeBeforeCreate = membresRepository.findAll().size();

        // Create the Membres
        restMembresMockMvc.perform(post("/api/membres")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(membres)))
            .andExpect(status().isCreated());

        // Validate the Membres in the database
        List<Membres> membresList = membresRepository.findAll();
        assertThat(membresList).hasSize(databaseSizeBeforeCreate + 1);
        Membres testMembres = membresList.get(membresList.size() - 1);
        assertThat(testMembres.getRole()).isEqualTo(DEFAULT_ROLE);
    }

    @Test
    @Transactional
    public void createMembresWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = membresRepository.findAll().size();

        // Create the Membres with an existing ID
        membres.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMembresMockMvc.perform(post("/api/membres")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(membres)))
            .andExpect(status().isBadRequest());

        // Validate the Membres in the database
        List<Membres> membresList = membresRepository.findAll();
        assertThat(membresList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkRoleIsRequired() throws Exception {
        int databaseSizeBeforeTest = membresRepository.findAll().size();
        // set the field null
        membres.setRole(null);

        // Create the Membres, which fails.

        restMembresMockMvc.perform(post("/api/membres")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(membres)))
            .andExpect(status().isBadRequest());

        List<Membres> membresList = membresRepository.findAll();
        assertThat(membresList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMembres() throws Exception {
        // Initialize the database
        membresRepository.saveAndFlush(membres);

        // Get all the membresList
        restMembresMockMvc.perform(get("/api/membres?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(membres.getId().intValue())))
            .andExpect(jsonPath("$.[*].role").value(hasItem(DEFAULT_ROLE.toString())));
    }
    
    @Test
    @Transactional
    public void getMembres() throws Exception {
        // Initialize the database
        membresRepository.saveAndFlush(membres);

        // Get the membres
        restMembresMockMvc.perform(get("/api/membres/{id}", membres.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(membres.getId().intValue()))
            .andExpect(jsonPath("$.role").value(DEFAULT_ROLE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMembres() throws Exception {
        // Get the membres
        restMembresMockMvc.perform(get("/api/membres/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMembres() throws Exception {
        // Initialize the database
        membresRepository.saveAndFlush(membres);

        int databaseSizeBeforeUpdate = membresRepository.findAll().size();

        // Update the membres
        Membres updatedMembres = membresRepository.findById(membres.getId()).get();
        // Disconnect from session so that the updates on updatedMembres are not directly saved in db
        em.detach(updatedMembres);
        updatedMembres
            .role(UPDATED_ROLE);

        restMembresMockMvc.perform(put("/api/membres")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedMembres)))
            .andExpect(status().isOk());

        // Validate the Membres in the database
        List<Membres> membresList = membresRepository.findAll();
        assertThat(membresList).hasSize(databaseSizeBeforeUpdate);
        Membres testMembres = membresList.get(membresList.size() - 1);
        assertThat(testMembres.getRole()).isEqualTo(UPDATED_ROLE);
    }

    @Test
    @Transactional
    public void updateNonExistingMembres() throws Exception {
        int databaseSizeBeforeUpdate = membresRepository.findAll().size();

        // Create the Membres

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMembresMockMvc.perform(put("/api/membres")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(membres)))
            .andExpect(status().isBadRequest());

        // Validate the Membres in the database
        List<Membres> membresList = membresRepository.findAll();
        assertThat(membresList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMembres() throws Exception {
        // Initialize the database
        membresRepository.saveAndFlush(membres);

        int databaseSizeBeforeDelete = membresRepository.findAll().size();

        // Delete the membres
        restMembresMockMvc.perform(delete("/api/membres/{id}", membres.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Membres> membresList = membresRepository.findAll();
        assertThat(membresList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
