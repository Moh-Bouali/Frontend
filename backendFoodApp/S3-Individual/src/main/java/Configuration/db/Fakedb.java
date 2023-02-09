package Configuration.db;

import com.s3.individual.s3individual.Persistance.Entity.PersonEntity;
import com.s3.individual.s3individual.Persistance.PersonRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
//@AllArgsConstructor
public class Fakedb {

    private PersonRepository personRepository;

    public Fakedb(PersonRepository personRepository){this.personRepository = personRepository;}

    /*@EventListener(ApplicationReadyEvent.class)
    public void populateDummyData(){
        if (personRepository.count() == 0) {
            personRepository.save(PersonEntity.builder().id(11).name("Paula").age(28).build());
            personRepository.save(PersonEntity.builder().id(12).name("Lex").age(29).build());
            personRepository.save(PersonEntity.builder().id(13).name("Emilia").age(21).build());
        }
    }*/
}
