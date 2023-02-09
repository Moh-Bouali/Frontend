package com.s3.individual.s3individual.Business;

import com.s3.individual.s3individual.Domain.Restaurant;
import com.s3.individual.s3individual.Persistance.RestaurantRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Component
@Service("FirstRestaurant")
@AllArgsConstructor
public class RestaurantManagerImpl implements RestaurantManager {

    private RestaurantRepository restaurantRepository;
    @Override
    public Optional<Restaurant> returnRestaurantById(long id) {
        return restaurantRepository.returnRestaurant(id).map(RestaurantConventer::convert);
    }
}
