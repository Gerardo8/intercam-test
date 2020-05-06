package com.example.intercamserver.web;

import com.example.intercamserver.repository.Client;
import lombok.Data;

import java.util.List;

@Data
public class ClientPageDto {

    private List<Client> clientList;
    private Integer totalPages;
    private Long totalElements;

}
