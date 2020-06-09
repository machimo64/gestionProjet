package com.alteca.gestion.repository;

import com.alteca.gestion.domain.Commentaire;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Commentaire entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CommentaireRepository extends JpaRepository<Commentaire, Long> {

    @Query("select commentaire from Commentaire commentaire where commentaire.user.login = ?#{principal.username}")
    List<Commentaire> findByUserIsCurrentUser();

    @Query("select commentaire from Commentaire commentaire where commentaire.tache.id = :idTache order by commentaire.dateHeure")
    List<Commentaire> findByTacheOrderByDateHeure(@Param("idTache") Long idTache);

    Commentaire findTopByOrderByIdDesc();
}

