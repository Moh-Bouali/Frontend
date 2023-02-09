package com.s3.individual.s3individual.Persistance;


import com.s3.individual.s3individual.Persistance.Entity.PersonEntity;
import com.s3.individual.s3individual.Persistance.Entity.RestaurantEntity;

import java.util.Optional;

public interface RestaurantRepository {

    Optional<RestaurantEntity> returnRestaurant(long id);
    void save(RestaurantEntity restaurant);
    int count();
}
