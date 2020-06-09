package com.alteca.gestion.repository;

import com.alteca.gestion.domain.Liste;

import com.alteca.gestion.domain.Projet;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Liste entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ListeRepository extends JpaRepository<Liste, Long> {

    @Query("select liste from Liste liste where liste.projet.id = :idProjet ORDER BY liste.position")
    List<Liste> findByProjet( @Param("idProjet") Long idProjet);

    @Query("select count(liste) from Liste liste where liste.projet.id = :idProjet")
    Integer findNbListeByProjet( @Param("idProjet") Long idProjet);


}
