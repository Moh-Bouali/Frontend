package com.s3.individual.s3individual.Persistance.Entity;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RestaurantEntity {
    Long id;
    String name;
    String address;
    String owner;
}
