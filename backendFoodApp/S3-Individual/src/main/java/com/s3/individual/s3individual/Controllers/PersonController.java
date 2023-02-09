package com.s3.individual.s3individual.Controllers;

import com.s3.individual.s3individual.Business.PersonManager;
import com.s3.individual.s3individual.Domain.AllPersons;
import com.s3.individual.s3individual.Domain.Person;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/person")
public class PersonController {

    private PersonManager personManager;

    public PersonController(@Qualifier("FirstPerson") PersonManager personManager){this.personManager = personManager;}

    @GetMapping("{id}")
    public ResponseEntity<Person> GetPersonName (@PathVariable (value = "id") final long id){
        final Optional<Person> personOptional = personManager.returnPersonById(id);
        if (personOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(personOptional.get());
    }
    @GetMapping("/all")
    public ResponseEntity<AllPersons> GetPersonAge (){
        AllPersons response = personManager.returnAll();
        return ResponseEntity.ok(response);
    }
}
