package com.example.intercamserver.service;

import com.example.intercamserver.repository.Client;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.AutoConfigureDataJpa;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ExtendWith(SpringExtension.class)
@Import(ClientService.class)
@AutoConfigureDataJpa
@Sql({"/schema.sql", "/data.sql"})
class ClientServiceTest {

    @Autowired
    private ClientService clientService;

    @Test
    void getAll() {
        final var all = this.clientService.getAll(1, 10, "name,asc");
        assertThat(all.getClientList()).hasSize(10);
    }

    @Test
    void getById() {
        final var optionalClient = this.clientService.getById(2L);
        assertThat(optionalClient).isNotEmpty();
    }

    @Test
    void create() {
        final var client = this.clientService.update(2L, new Client(
                null,
                "Gerardo",
                "Reyes",
                "López",
                "56353",
                BigDecimal.valueOf(343434.43),
                LocalDate.of(1993, 8, 26)
        ));

        assertThat(client.getId()).isNotNull();
    }

    @Test
    void update() {
        final var client = this.clientService.update(2L, new Client(
                null,
                "Gerardo",
                "Reyes",
                "López",
                "56353",
                BigDecimal.valueOf(343434.43),
                LocalDate.of(1993, 8, 26)
        ));

        assertThat(client.getId()).isEqualTo(2L);
        assertThat(client.getFatherName()).isEqualTo("Reyes");

    }

    @Test
    void deleteById() {
        this.clientService.deleteById(2L);
        final var optionalClient = this.clientService.getById(2L);
        assertThat(optionalClient).isEmpty();
    }
}