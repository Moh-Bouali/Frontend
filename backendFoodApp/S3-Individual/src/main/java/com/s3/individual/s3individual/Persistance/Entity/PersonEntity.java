package com.s3.individual.s3individual.Persistance.Entity;

import com.s3.individual.s3individual.Domain.Person;
import lombok.Builder;
import lombok.Data;

import java.util.Optional;

@Data
@Builder
public class PersonEntity {
    private String name;
    private Long id;
    private String address;
}
