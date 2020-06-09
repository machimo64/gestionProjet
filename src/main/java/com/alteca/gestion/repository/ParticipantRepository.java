package com.alteca.gestion.repository;

import com.alteca.gestion.domain.Participant;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Participant entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ParticipantRepository extends JpaRepository<Participant, Long> {

    @Query("select participant from Participant participant where participant.user.login = ?#{principal.username}")
    List<Participant> findByUserIsCurrentUser();

    @Query("select participant from Participant participant where participant.tache.id = :idTache")
    List<Participant> findByTache(@Param("idTache") Long idTache);
}
