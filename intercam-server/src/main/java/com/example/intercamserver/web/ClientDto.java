package com.example.intercamserver.web;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class ClientDto {

    private Long id;

    @NotNull
    private String name;

    @NotNull
    private String fatherName;

    private String motherName;

    @NotNull
    private String postalCode;

    private BigDecimal income;

    @NotNull
    private LocalDate birthDate;

}
