package com.alteca.gestion.web.rest;

import com.alteca.gestion.GestionApp;
import com.alteca.gestion.domain.TypeNotification;
import com.alteca.gestion.repository.TypeNotificationRepository;

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
 * Integration tests for the {@link TypeNotificationResource} REST controller.
 */
@SpringBootTest(classes = GestionApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class TypeNotificationResourceIT {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENU = "AAAAAAAAAA";
    private static final String UPDATED_CONTENU = "BBBBBBBBBB";

    @Autowired
    private TypeNotificationRepository typeNotificationRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTypeNotificationMockMvc;

    private TypeNotification typeNotification;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TypeNotification createEntity(EntityManager em) {
        TypeNotification typeNotification = new TypeNotification()
            .nom(DEFAULT_NOM)
            .contenu(DEFAULT_CONTENU);
        return typeNotification;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TypeNotification createUpdatedEntity(EntityManager em) {
        TypeNotification typeNotification = new TypeNotification()
            .nom(UPDATED_NOM)
            .contenu(UPDATED_CONTENU);
        return typeNotification;
    }

    @BeforeEach
    public void initTest() {
        typeNotification = createEntity(em);
    }

    @Test
    @Transactional
    public void createTypeNotification() throws Exception {
        int databaseSizeBeforeCreate = typeNotificationRepository.findAll().size();

        // Create the TypeNotification
        restTypeNotificationMockMvc.perform(post("/api/type-notifications")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(typeNotification)))
            .andExpect(status().isCreated());

        // Validate the TypeNotification in the database
        List<TypeNotification> typeNotificationList = typeNotificationRepository.findAll();
        assertThat(typeNotificationList).hasSize(databaseSizeBeforeCreate + 1);
        TypeNotification testTypeNotification = typeNotificationList.get(typeNotificationList.size() - 1);
        assertThat(testTypeNotification.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testTypeNotification.getContenu()).isEqualTo(DEFAULT_CONTENU);
    }

    @Test
    @Transactional
    public void createTypeNotificationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = typeNotificationRepository.findAll().size();

        // Create the TypeNotification with an existing ID
        typeNotification.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTypeNotificationMockMvc.perform(post("/api/type-notifications")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(typeNotification)))
            .andExpect(status().isBadRequest());

        // Validate the TypeNotification in the database
        List<TypeNotification> typeNotificationList = typeNotificationRepository.findAll();
        assertThat(typeNotificationList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = typeNotificationRepository.findAll().size();
        // set the field null
        typeNotification.setNom(null);

        // Create the TypeNotification, which fails.

        restTypeNotificationMockMvc.perform(post("/api/type-notifications")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(typeNotification)))
            .andExpect(status().isBadRequest());

        List<TypeNotification> typeNotificationList = typeNotificationRepository.findAll();
        assertThat(typeNotificationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkContenuIsRequired() throws Exception {
        int databaseSizeBeforeTest = typeNotificationRepository.findAll().size();
        // set the field null
        typeNotification.setContenu(null);

        // Create the TypeNotification, which fails.

        restTypeNotificationMockMvc.perform(post("/api/type-notifications")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(typeNotification)))
            .andExpect(status().isBadRequest());

        List<TypeNotification> typeNotificationList = typeNotificationRepository.findAll();
        assertThat(typeNotificationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTypeNotifications() throws Exception {
        // Initialize the database
        typeNotificationRepository.saveAndFlush(typeNotification);

        // Get all the typeNotificationList
        restTypeNotificationMockMvc.perform(get("/api/type-notifications?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(typeNotification.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].contenu").value(hasItem(DEFAULT_CONTENU)));
    }
    
    @Test
    @Transactional
    public void getTypeNotification() throws Exception {
        // Initialize the database
        typeNotificationRepository.saveAndFlush(typeNotification);

        // Get the typeNotification
        restTypeNotificationMockMvc.perform(get("/api/type-notifications/{id}", typeNotification.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(typeNotification.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM))
            .andExpect(jsonPath("$.contenu").value(DEFAULT_CONTENU));
    }

    @Test
    @Transactional
    public void getNonExistingTypeNotification() throws Exception {
        // Get the typeNotification
        restTypeNotificationMockMvc.perform(get("/api/type-notifications/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTypeNotification() throws Exception {
        // Initialize the database
        typeNotificationRepository.saveAndFlush(typeNotification);

        int databaseSizeBeforeUpdate = typeNotificationRepository.findAll().size();

        // Update the typeNotification
        TypeNotification updatedTypeNotification = typeNotificationRepository.findById(typeNotification.getId()).get();
        // Disconnect from session so that the updates on updatedTypeNotification are not directly saved in db
        em.detach(updatedTypeNotification);
        updatedTypeNotification
            .nom(UPDATED_NOM)
            .contenu(UPDATED_CONTENU);

        restTypeNotificationMockMvc.perform(put("/api/type-notifications")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTypeNotification)))
            .andExpect(status().isOk());

        // Validate the TypeNotification in the database
        List<TypeNotification> typeNotificationList = typeNotificationRepository.findAll();
        assertThat(typeNotificationList).hasSize(databaseSizeBeforeUpdate);
        TypeNotification testTypeNotification = typeNotificationList.get(typeNotificationList.size() - 1);
        assertThat(testTypeNotification.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testTypeNotification.getContenu()).isEqualTo(UPDATED_CONTENU);
    }

    @Test
    @Transactional
    public void updateNonExistingTypeNotification() throws Exception {
        int databaseSizeBeforeUpdate = typeNotificationRepository.findAll().size();

        // Create the TypeNotification

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTypeNotificationMockMvc.perform(put("/api/type-notifications")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(typeNotification)))
            .andExpect(status().isBadRequest());

        // Validate the TypeNotification in the database
        List<TypeNotification> typeNotificationList = typeNotificationRepository.findAll();
        assertThat(typeNotificationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTypeNotification() throws Exception {
        // Initialize the database
        typeNotificationRepository.saveAndFlush(typeNotification);

        int databaseSizeBeforeDelete = typeNotificationRepository.findAll().size();

        // Delete the typeNotification
        restTypeNotificationMockMvc.perform(delete("/api/type-notifications/{id}", typeNotification.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TypeNotification> typeNotificationList = typeNotificationRepository.findAll();
        assertThat(typeNotificationList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
