package com.alteca.gestion.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.LocalDate;

/**
 * A Tache.
 */
@Entity
@Table(name = "tache")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Tache implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "titre", nullable = false)
    private String titre;

    @NotNull
    @Column(name = "date_debut", nullable = false)
    private LocalDate dateDebut;

    @NotNull
    @Column(name = "date_fin", nullable = false)
    private LocalDate dateFin;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "etat")
    private Boolean etat;

    @Column(name = "poids")
    private Integer poids;

    @Column(name = "categorie")
    private String categorie;

    @NotNull
    @Column(name = "position", nullable = false)
    private Integer position;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("taches")
    private Liste liste;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitre() {
        return titre;
    }

    public Tache titre(String titre) {
        this.titre = titre;
        return this;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public LocalDate getDateDebut() {
        return dateDebut;
    }

    public Tache dateDebut(LocalDate dateDebut) {
        this.dateDebut = dateDebut;
        return this;
    }

    public void setDateDebut(LocalDate dateDebut) {
        this.dateDebut = dateDebut;
    }

    public LocalDate getDateFin() {
        return dateFin;
    }

    public Tache dateFin(LocalDate dateFin) {
        this.dateFin = dateFin;
        return this;
    }

    public void setDateFin(LocalDate dateFin) {
        this.dateFin = dateFin;
    }

    public String getDescription() {
        return description;
    }

    public Tache description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean isEtat() {
        return etat;
    }

    public Tache etat(Boolean etat) {
        this.etat = etat;
        return this;
    }

    public void setEtat(Boolean etat) {
        this.etat = etat;
    }

    public Integer getPoids() {
        return poids;
    }

    public Tache poids(Integer poids) {
        this.poids = poids;
        return this;
    }

    public void setPoids(Integer poids) {
        this.poids = poids;
    }

    public String getCategorie() {
        return categorie;
    }

    public Tache categorie(String categorie) {
        this.categorie = categorie;
        return this;
    }

    public void setCategorie(String categorie) {
        this.categorie = categorie;
    }

    public Integer getPosition() {
        return position;
    }

    public Tache position(Integer position) {
        this.position = position;
        return this;
    }

    public void setPosition(Integer position) {
        this.position = position;
    }

    public Liste getListe() {
        return liste;
    }

    public Tache liste(Liste liste) {
        this.liste = liste;
        return this;
    }

    public void setListe(Liste liste) {
        this.liste = liste;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Tache)) {
            return false;
        }
        return id != null && id.equals(((Tache) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Tache{" +
            "id=" + getId() +
            ", titre='" + getTitre() + "'" +
            ", dateDebut='" + getDateDebut() + "'" +
            ", dateFin='" + getDateFin() + "'" +
            ", description='" + getDescription() + "'" +
            ", etat='" + isEtat() + "'" +
            ", poids=" + getPoids() +
            ", categorie='" + getCategorie() + "'" +
            ", position=" + getPosition() +
            "}";
    }
}
