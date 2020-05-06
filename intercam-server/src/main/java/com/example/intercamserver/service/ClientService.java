package com.example.intercamserver.service;

import com.example.intercamserver.repository.Client;
import com.example.intercamserver.repository.ClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ClientService {

    private final ClientRepository clientRepository;

    public ClientPage getAll(final Integer page, final Integer size, final String sort) {

        if (page != null && size != null) {
            Page<Client> clientPage;
            if (sort != null) {
                final var split = sort.split(",");
                Sort sorting;

                if (split[1].equals("desc")) {
                    sorting = Sort.by(split[0]).descending();
                } else {
                    sorting = Sort.by(split[0]).ascending();
                }

                clientPage = this.clientRepository
                        .findAll(PageRequest.of(page, size, sorting));

            } else {
                clientPage = this.clientRepository.findAll(PageRequest.of(page, size));
            }

            return new ClientPage(clientPage.getContent(), clientPage.getTotalPages(), clientPage.getTotalElements());
        }

        final var all = this.clientRepository.findAll();
        return new ClientPage(all, 1, (long) all.size());
    }

    public Optional<Client> getById(final Long id) {
        return this.clientRepository
                .findById(id);
    }

    public Client create(final Client client) {
        return this.clientRepository.save(client);
    }

    public Client update(final Long id, final Client client) {

        final var clientById = this.clientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Client do not exists"));

        client.setId(clientById.getId());
        return this.clientRepository.save(client);
    }

    public void deleteById(final Long id) {
        this.clientRepository.deleteById(id);
    }

}
