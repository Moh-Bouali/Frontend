package com.s3.individual.s3individual.Business;

import com.s3.individual.s3individual.Domain.Restaurant;

import java.util.Optional;

public interface RestaurantManager {
    Optional<Restaurant> returnRestaurantById(long id);
}
