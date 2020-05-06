package com.example.intercamserver.web;

import com.example.intercamserver.repository.Client;
import com.example.intercamserver.service.ClientPage;
import com.example.intercamserver.service.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

import static java.util.stream.Collectors.toList;

@CrossOrigin
@RestController
@RequestMapping("/api/client")
@RequiredArgsConstructor
public class ClientRestController {

    private final ClientService clientService;
    private final ClientMapper mapper;

    @GetMapping
    ClientPageDto getAll(final @RequestParam(required = false) Integer page,
                      final @RequestParam(required = false) Integer size,
                      final @RequestParam(required = false) String sort) {
        return this.mapper
                .fromClientPageToClientPageDto(this.clientService.getAll(page, size, sort));

    }

    @GetMapping("/{id}")
    ClientDto getById(final @PathVariable Long id) {
        return this.clientService.getById(id)
                .map(this.mapper::fromClientToClientDto)
                .orElse(null);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    ClientDto create(final @RequestBody @Valid ClientDto clientDto) {
        final Client client = this.mapper.fromClientDtoToClient(clientDto);
        return this.mapper.fromClientToClientDto(this.clientService.create(client));
    }

    @PutMapping("/{id}")
    ClientDto update(final @PathVariable Long id,
                     final @RequestBody @Valid ClientDto clientDto) {
        final Client client = this.mapper.fromClientDtoToClient(clientDto);
        return this.mapper.fromClientToClientDto(this.clientService.update(id, client));
    }

    @DeleteMapping("/{id}")
    void deleteById(final @PathVariable Long id) {
        this.clientService.deleteById(id);
    }

}
