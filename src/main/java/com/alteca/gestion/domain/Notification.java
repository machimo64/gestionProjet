package com.alteca.gestion.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Notification.
 */
@Entity
@Table(name = "notification")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Notification implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("notifications")
    private User emetteur;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("notifications")
    private User destinataire;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("notifications")
    private TypeNotification typeNotification;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getEmetteur() {
        return emetteur;
    }

    public Notification emetteur(User user) {
        this.emetteur = user;
        return this;
    }

    public void setEmetteur(User user) {
        this.emetteur = user;
    }

    public User getDestinataire() {
        return destinataire;
    }

    public Notification destinataire(User user) {
        this.destinataire = user;
        return this;
    }

    public void setDestinataire(User user) {
        this.destinataire = user;
    }

    public TypeNotification getTypeNotification() {
        return typeNotification;
    }

    public Notification typeNotification(TypeNotification typeNotification) {
        this.typeNotification = typeNotification;
        return this;
    }

    public void setTypeNotification(TypeNotification typeNotification) {
        this.typeNotification = typeNotification;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Notification)) {
            return false;
        }
        return id != null && id.equals(((Notification) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Notification{" +
            "id=" + getId() +
            "}";
    }
}
