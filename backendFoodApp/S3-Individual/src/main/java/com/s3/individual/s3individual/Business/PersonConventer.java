package com.s3.individual.s3individual.Business;

import com.s3.individual.s3individual.Domain.Person;
import com.s3.individual.s3individual.Persistance.Entity.PersonEntity;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class PersonConventer {

    public static Person convert(PersonEntity person){
        return Person.builder()
                .id(person.getId())
                .name(person.getName())
                .address(person.getAddress())
                .build();
    }
}
