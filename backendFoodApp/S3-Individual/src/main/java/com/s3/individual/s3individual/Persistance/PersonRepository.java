package com.s3.individual.s3individual.Persistance;

import com.s3.individual.s3individual.Persistance.Entity.PersonEntity;

import java.util.List;
import java.util.Optional;

public interface PersonRepository {

    Optional<PersonEntity> returnPerson (long studentId);
    List<PersonEntity> returnAll();
    void save(PersonEntity person);
    int count();
    //int findAgeById(long studentId);
    //String findClassById(long studentId);
}
