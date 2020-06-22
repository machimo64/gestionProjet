package com.alteca.gestion.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Fichier.
 */
@Entity
@Table(name = "fichier")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Fichier implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    
    @Lob
    @Column(name = "fichier", nullable = false)
    private byte[] fichier;

    @Column(name = "fichier_content_type", nullable = false)
    private String fichierContentType;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("fichiers")
    private Membres membres;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("fichiers")
    private Tache tache;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getFichier() {
        return fichier;
    }

    public Fichier fichier(byte[] fichier) {
        this.fichier = fichier;
        return this;
    }

    public void setFichier(byte[] fichier) {
        this.fichier = fichier;
    }

    public String getFichierContentType() {
        return fichierContentType;
    }

    public Fichier fichierContentType(String fichierContentType) {
        this.fichierContentType = fichierContentType;
        return this;
    }

    public void setFichierContentType(String fichierContentType) {
        this.fichierContentType = fichierContentType;
    }

    public Membres getMembres() {
        return membres;
    }

    public Fichier membres(Membres membres) {
        this.membres = membres;
        return this;
    }

    public void setMembres(Membres membres) {
        this.membres = membres;
    }

    public Tache getTache() {
        return tache;
    }

    public Fichier tache(Tache tache) {
        this.tache = tache;
        return this;
    }

    public void setTache(Tache tache) {
        this.tache = tache;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Fichier)) {
            return false;
        }
        return id != null && id.equals(((Fichier) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Fichier{" +
            "id=" + getId() +
            ", fichier='" + getFichier() + "'" +
            ", fichierContentType='" + getFichierContentType() + "'" +
            "}";
    }
}
