package com.alteca.gestion.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.alteca.gestion.web.rest.TestUtil;

public class TypeNotificationTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TypeNotification.class);
        TypeNotification typeNotification1 = new TypeNotification();
        typeNotification1.setId(1L);
        TypeNotification typeNotification2 = new TypeNotification();
        typeNotification2.setId(typeNotification1.getId());
        assertThat(typeNotification1).isEqualTo(typeNotification2);
        typeNotification2.setId(2L);
        assertThat(typeNotification1).isNotEqualTo(typeNotification2);
        typeNotification1.setId(null);
        assertThat(typeNotification1).isNotEqualTo(typeNotification2);
    }
}
