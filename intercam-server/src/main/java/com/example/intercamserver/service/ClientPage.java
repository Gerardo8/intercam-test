package com.example.intercamserver.service;

import com.example.intercamserver.repository.Client;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClientPage {

    private List<Client> clientList;
    private Integer totalPages;
    private Long totalElements;

}
