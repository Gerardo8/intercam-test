package com.example.intercamserver.repository;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "CLIENTS")
public class Client implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "NAME", nullable = false, length = 512)
    private String name;

    @Column(name = "FATHER_NAME", nullable = false, length = 512)
    private String fatherName;

    @Column(name = "MOTHER_NAME", length = 512)
    private String motherName;

    @Column(name = "POSTAL_CODE", nullable = false, length = 6)
    private String postalCode;

    @Column(name = "INCOME")
    private BigDecimal income;

    @Column(name = "BIRTH_DATE", nullable = false)
    private LocalDate birthDate;


}
