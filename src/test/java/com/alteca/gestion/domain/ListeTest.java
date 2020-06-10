package com.alteca.gestion.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.alteca.gestion.web.rest.TestUtil;

public class ListeTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Liste.class);
        Liste liste1 = new Liste();
        liste1.setId(1L);
        Liste liste2 = new Liste();
        liste2.setId(liste1.getId());
        assertThat(liste1).isEqualTo(liste2);
        liste2.setId(2L);
        assertThat(liste1).isNotEqualTo(liste2);
        liste1.setId(null);
        assertThat(liste1).isNotEqualTo(liste2);
    }
}
