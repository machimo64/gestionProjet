package com.alteca.gestion.repository;

import com.alteca.gestion.domain.TypeNotification;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the TypeNotification entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TypeNotificationRepository extends JpaRepository<TypeNotification, Long> {
}
