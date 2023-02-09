package com.s3.individual.s3individual.Persistance.Impl;

import com.s3.individual.s3individual.Persistance.Entity.PersonEntity;
import com.s3.individual.s3individual.Persistance.PersonRepository;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Component
//@AllArgsConstructor
@Repository
@Primary
public class PersonRepositoryImpl implements PersonRepository {

    public PersonRepositoryImpl(){savedPersons = new ArrayList<>();
        if (count() == 0) {
            save(PersonEntity.builder().id(1l).name("Paula").address("Address1").build());
            save(PersonEntity.builder().id(2l).name("Lex").address("Address2").build());
            save(PersonEntity.builder().id(3l).name("Emilia").address("Kruistraat").build());
        }
    }
    private final List<PersonEntity> savedPersons;

    @Override
    public List<PersonEntity> returnAll() {
        return Collections.unmodifiableList(this.savedPersons);
    }

    @Override
    public Optional<PersonEntity> returnPerson (long studentId) {
        return this.savedPersons.stream()
                .filter(personEntity -> personEntity.getId().equals(studentId))
                .findFirst();
    }
    /*@Override
    public int findAgeById(long studentId) {
        //save(PersonEntity.builder().age(28).id(11).name("Paula").build());
        for (PersonEntity p : findAll()) {
            if (p.getId() == studentId) {
                return p.getAge();
            }
        }
        return 0;
    }
    @Override
    public String findClassById(long studentId) {
        //save(PersonEntity.builder().age(28).id(11).name("Paula").build());
        for (PersonEntity p : findAll()) {
            if (p.getId() == studentId) {
                return p.getClassroom();
            }
        }
        return "No person found";
    }*/
    @Override
    public void save(PersonEntity person) {
        this.savedPersons.add(person);
        //return person;
    }
    @Override
    public int count() {
        return this.savedPersons.size();
    }
}
