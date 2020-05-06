package com.example.intercamserver.web;

import com.example.intercamserver.repository.Client;
import com.example.intercamserver.service.ClientPage;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ClientMapper {

    private final ModelMapper modelMapper;

    public ClientDto fromClientToClientDto(final Client client) {
        return this.modelMapper.map(client, ClientDto.class);
    }

    public Client fromClientDtoToClient(final ClientDto clientDto) {
        return this.modelMapper.map(clientDto, Client.class);
    }

    public ClientPageDto fromClientPageToClientPageDto(final ClientPage clientPage) {
        return this.modelMapper.map(clientPage, ClientPageDto.class);
    }
}
