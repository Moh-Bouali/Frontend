package com.s3.individual.s3individual.Business;

import com.s3.individual.s3individual.Domain.Person;
import com.s3.individual.s3individual.Domain.Restaurant;
import com.s3.individual.s3individual.Persistance.Entity.PersonEntity;
import com.s3.individual.s3individual.Persistance.Entity.RestaurantEntity;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class RestaurantConventer {

    public static Restaurant convert(RestaurantEntity restaurant){
        return Restaurant.builder()
                .id(restaurant.getId())
                .name(restaurant.getName())
                .address(restaurant.getAddress())
                .owner(restaurant.getOwner())
                .build();
    }
}
