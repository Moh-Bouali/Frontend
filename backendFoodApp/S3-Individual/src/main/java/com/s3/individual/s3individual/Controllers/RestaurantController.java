package com.s3.individual.s3individual.Controllers;

import com.s3.individual.s3individual.Business.PersonManager;
import com.s3.individual.s3individual.Business.RestaurantManager;
import com.s3.individual.s3individual.Business.RestaurantManagerImpl;
import com.s3.individual.s3individual.Domain.Person;
import com.s3.individual.s3individual.Domain.Restaurant;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/Restaurant")
public class RestaurantController {

    private RestaurantManager restaurantManager;
    public RestaurantController(@Qualifier("FirstRestaurant") RestaurantManager restaurantManager){this.restaurantManager = restaurantManager;}

    @GetMapping("{id}")
    public ResponseEntity<Restaurant> GetPersonName (@PathVariable(value = "id") final long id){
        final Optional<Restaurant> restaurantOptional = restaurantManager.returnRestaurantById(id);
        if (restaurantOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(restaurantOptional.get());
    }
}
