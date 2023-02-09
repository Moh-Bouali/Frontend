import URL from "../constants/apiConstants";

const restaurant = "/restaurants";

const getRestaurants = () => {
    return URL.get(restaurant);
}
const getRestaurantMenu = (id) => {
    return URL.get(restaurant+ `/restaurantMenu` + `/${id}`);
}

const getRandomMeal = (id) => {
    return URL.get(restaurant+ `/randomMeal` + `/${id}`);
}

const RestaurantService = {
    getRestaurants,
    getRestaurantMenu,
    getRandomMeal
};
export default RestaurantService;