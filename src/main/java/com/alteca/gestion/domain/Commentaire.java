package com.alteca.gestion.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.ZonedDateTime;

/**
 * A Commentaire.
 */
@Entity
@Table(name = "commentaire")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Commentaire implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "contenu", nullable = false)
    private String contenu;

    @NotNull
    @Column(name = "date_heure", nullable = false)
    private ZonedDateTime dateHeure;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("commentaires")
    private User user;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("commentaires")
    private Tache tache;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContenu() {
        return contenu;
    }

    public Commentaire contenu(String contenu) {
        this.contenu = contenu;
        return this;
    }

    public void setContenu(String contenu) {
        this.contenu = contenu;
    }

    public ZonedDateTime getDateHeure() {
        return dateHeure;
    }

    public Commentaire dateHeure(ZonedDateTime dateHeure) {
        this.dateHeure = dateHeure;
        return this;
    }

    public void setDateHeure(ZonedDateTime dateHeure) {
        this.dateHeure = dateHeure;
    }

    public User getUser() {
        return user;
    }

    public Commentaire user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Tache getTache() {
        return tache;
    }

    public Commentaire tache(Tache tache) {
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
        if (!(o instanceof Commentaire)) {
            return false;
        }
        return id != null && id.equals(((Commentaire) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Commentaire{" +
            "id=" + getId() +
            ", contenu='" + getContenu() + "'" +
            ", dateHeure='" + getDateHeure() + "'" +
            "}";
    }
}
