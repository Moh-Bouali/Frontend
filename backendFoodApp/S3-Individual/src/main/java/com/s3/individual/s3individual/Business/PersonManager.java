package com.s3.individual.s3individual.Business;

import com.s3.individual.s3individual.Domain.AllPersons;
import com.s3.individual.s3individual.Domain.Person;

import java.util.List;
import java.util.Optional;

public interface PersonManager {
    Optional<Person> returnPersonById(long id);
    /*int returnPersonAgeById(long id);
    String returnPersonClassById(long id);*/
    AllPersons returnAll();
}
