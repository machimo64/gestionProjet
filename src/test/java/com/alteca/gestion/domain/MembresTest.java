package com.alteca.gestion.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.alteca.gestion.web.rest.TestUtil;

public class MembresTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Membres.class);
        Membres membres1 = new Membres();
        membres1.setId(1L);
        Membres membres2 = new Membres();
        membres2.setId(membres1.getId());
        assertThat(membres1).isEqualTo(membres2);
        membres2.setId(2L);
        assertThat(membres1).isNotEqualTo(membres2);
        membres1.setId(null);
        assertThat(membres1).isNotEqualTo(membres2);
    }
}
