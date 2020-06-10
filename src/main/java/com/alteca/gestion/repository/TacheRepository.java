package com.alteca.gestion.repository;

import com.alteca.gestion.domain.Tache;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Tache entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TacheRepository extends JpaRepository<Tache, Long> {

    @Query("select tache from Tache tache where tache.liste.id = :idListe ORDER BY tache.position")
    List<Tache> findByListe(@Param("idListe") Long idListe);

    @Query("select tache from Tache tache where tache.liste.projet.id = :idProjet order by tache.position")
    List<Tache> findByProjet(@Param("idProjet") Long idProjet);

    @Query("select count(tache) from Tache tache where tache.liste.id = :idListe")
    Integer findNbTacheByListe( @Param("idListe") Long idListe);
}
