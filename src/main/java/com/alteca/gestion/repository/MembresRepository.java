package com.alteca.gestion.repository;

import com.alteca.gestion.domain.Membres;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Membres entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MembresRepository extends JpaRepository<Membres, Long> {

    @Query("select membres from Membres membres where membres.user.login = ?#{principal.username}")
    List<Membres> findByUserIsCurrentUser();

    @Query("select membres from Membres membres where membres.projet.id = :idProjet")
    List<Membres> findByProjet(@Param("idProjet") Long idProjet);

    @Query("select membres from Membres membres where membres.projet.id = :idProjet and membres.user.login = ?#{principal.username}")
    Membres findByUserAndProjet(@Param("idProjet") Long idProjet);

    // Requête qui permet de récuperer les membres d'un projet ne participant pas à une tâche
    @Query("select membres from Membres membres where membres.projet.id = (select tache.liste.projet.id from Tache tache where tache.id = :idTache ) and membres.user.id not in (select participant.user.id from Participant participant where participant.tache.id = :idTache)")
    List<Membres> findByNotTache(@Param("idTache") Long idTache);

    @Transactional
    @Modifying
    @Query("delete from Membres membres where membres.projet.id = :idProjet")
    void deleteByIdProjet(@Param("idProjet") Long idProjet);
}
