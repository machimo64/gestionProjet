package com.alteca.gestion.repository;

import com.alteca.gestion.domain.Notification;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Notification entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    @Query("select notification from Notification notification where notification.emetteur.login = ?#{principal.username}")
    List<Notification> findByEmetteurIsCurrentUser();

    @Query("select notification from Notification notification where notification.destinataire.login = ?#{principal.username}")
    List<Notification> findByDestinataireIsCurrentUser();
}
