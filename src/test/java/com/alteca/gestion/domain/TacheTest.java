package com.alteca.gestion.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.alteca.gestion.web.rest.TestUtil;

public class TacheTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Tache.class);
        Tache tache1 = new Tache();
        tache1.setId(1L);
        Tache tache2 = new Tache();
        tache2.setId(tache1.getId());
        assertThat(tache1).isEqualTo(tache2);
        tache2.setId(2L);
        assertThat(tache1).isNotEqualTo(tache2);
        tache1.setId(null);
        assertThat(tache1).isNotEqualTo(tache2);
    }
}
