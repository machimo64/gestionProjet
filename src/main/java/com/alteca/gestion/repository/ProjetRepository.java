package com.alteca.gestion.repository;

import com.alteca.gestion.domain.Projet;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Projet entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProjetRepository extends JpaRepository<Projet, Long> {

    @Query("select projet from Projet projet where projet.user.login = ?#{principal.username}")
    List<Projet> findByUserIsCurrentUser();

    @Query("select projet from Membres membres where membres.user.login = ?#{principal.username}")
    List<Projet> findProjetMembre();

    @Query("select projet from Membres membres where membres.projet.id not in (select membres.projet.id from Membres membres where membres.user.login = ?#{principal.username})")
    List<Projet> findProjetNotMembre();
}
