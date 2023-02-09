package com.s3.individual.s3individual.Business;

import com.s3.individual.s3individual.Domain.AllPersons;
import com.s3.individual.s3individual.Domain.Person;
import com.s3.individual.s3individual.Persistance.Entity.PersonEntity;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.EnableMBeanExport;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import com.s3.individual.s3individual.Persistance.PersonRepository;
import com.s3.individual.s3individual.Business.PersonManager;

import java.util.List;
import java.util.Optional;

@Component
@Service("FirstPerson")
@AllArgsConstructor
public class PersonManagerIMPL implements PersonManager {
    private PersonRepository personRepository;

    //public PersonManagerIMPL(PersonRepository personRepository){this.personRepository = personRepository;}
    @Override
    public Optional<Person> returnPersonById(long id) {
        return personRepository.returnPerson(id).map(PersonConventer::convert);
    }
    @Override
    public AllPersons returnAll(){
        List<PersonEntity> allPersons;
        allPersons = personRepository.returnAll();

        final AllPersons response = new AllPersons();
        List<Person> students = allPersons
                .stream()
                .map(PersonConventer::convert)
                .toList();
        response.setPersonList(students);

        return response;
    }
    /*@Override
    public int returnPersonAgeById(long id) {
        return personRepository.findAgeById(id);
    }
    @Override
    public String returnPersonClassById(long id) {
        return personRepository.findClassById(id);
    }*/

    /*@EventListener(ApplicationReadyEvent.class)
    public void populateDummyData() {
        if (personRepository.count() == 0) {
            personRepository.save(PersonEntity.builder().id(1l).name("Paula").address("Address1").build());
            personRepository.save(PersonEntity.builder().id(2l).name("Lex").address("Address2").build());
            personRepository.save(PersonEntity.builder().id(3l).name("Emilia").address("Kruistraat").build());
        }
    }*/
}
