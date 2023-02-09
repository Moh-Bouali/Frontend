package com.s3.individual.s3individual.Persistance.Impl;

import com.s3.individual.s3individual.Domain.Restaurant;
import com.s3.individual.s3individual.Persistance.Entity.PersonEntity;
import com.s3.individual.s3individual.Persistance.Entity.RestaurantEntity;
import com.s3.individual.s3individual.Persistance.RestaurantRepository;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
@Repository
@Primary
public class RestaurantRepositoryImpl implements RestaurantRepository {

    public RestaurantRepositoryImpl(){savedRestaurants = new ArrayList<>();
        if (count() == 0) {
            save(RestaurantEntity.builder().id(1l).name("Chidoz").address("Address1").owner("Kuba").build());
            save(RestaurantEntity.builder().id(2l).name("Martinis").address("Address2").owner("Loula").build());
            save(RestaurantEntity.builder().id(3l).name("KFC").address("Kruistraat").owner("Lala").build());
        }
    }
    private final List<RestaurantEntity> savedRestaurants;
    @Override
    public Optional<RestaurantEntity> returnRestaurant(long id) {
        return this.savedRestaurants.stream()
                .filter(restaurantEntity -> restaurantEntity.getId().equals(id))
                .findFirst();
    }

    @Override
    public void save(RestaurantEntity restaurant) {
        this.savedRestaurants.add(restaurant);
    }

    @Override
    public int count() {
        return this.savedRestaurants.size();
    }
}
