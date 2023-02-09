import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React, {useEffect, useState} from 'react';
import { useParams, withRouter } from 'react-router-dom';  
import RestaurantService from "../../CRUDS/RestaurantCRUD";
import CartItem from "../../CRUDS/CartItems/CartItem";

function RestaurantMenu(props){
    const [restaurantMenuPost, setRestaurantMenuPost] = useState([]);
    const [randomMealPost, setRandomMealPost] = useState([]);
    const[appetizerStatePost, setAppetizerStatePost] = useState("");
    const[mainCourseStatePost, setMainCourseStatePost] = useState("");
    const[drinkStatePost, setDrinkStatePost] = useState("");
    const[dessertStatePost, setDessertStatePost] = useState("");
    const[orderHeretStatePost, setOrderStatePost] = useState("Press the random button to generate a random menu");
    const[spaceStatePost, setSpaceStatePost] = useState("");
    const params = useParams();
    
    useEffect (() =>{
        (async() => {
          const response = await RestaurantService.getRestaurantMenu(params.id);
          setRestaurantMenuPost(response.data.restaurantMenuDTOList);
          props.updateTitle('Our Menu');
        })();
      },[])

      const goBack = () => {
        props.history.push('/mainpage')
    }
    const checkOut = () => {
      if(grandTotal >= 15){
        props.history.push('/orderStatus');
        props.updateTitle("Order status....");
      }
      else{
        alert("Minimum order price must be atleast €15");
      }
  }
    const updateQty = (id, newQty) => {
      const newItems = restaurantMenuPost.map(item => {
        if (item.menuId === id) {
          return {...item, qty: newQty};           
        }
        return item;
      });
      setRestaurantMenuPost(newItems);
    };

    const generateRandomMeal = () => {
      (async() => {
        const response = await RestaurantService.getRandomMeal(params.id);
        setRandomMealPost(response.data);
        setAppetizerStatePost("Appetizer : ");
        setMainCourseStatePost("Main course : ");
        setDrinkStatePost("Drink : ");
        setDessertStatePost("Dessert : ");
        setOrderStatePost("");
        setSpaceStatePost(", ");
        console.log(randomMealPost);
      })();
    }
  
    const grandTotal = restaurantMenuPost
      .reduce((total, restaurantMenuPost) => total + restaurantMenuPost.qty * restaurantMenuPost.price, 0)
      .toFixed(2);

    if (!restaurantMenuPost) return null;

  return (
    <div className='d-flex flex-column justify-content-around'>
<div className="Cart-items">
        {restaurantMenuPost.map(restaurantMenuPost => (
          <CartItem key={restaurantMenuPost.menuId} updateQty={updateQty} {...restaurantMenuPost} />
        ))}
      </div>
      <h1 className="Cart-total">Grand Total: €{grandTotal}</h1>
      <div>
   <button 
                        type="submit" 
                        className="btn btn-primary"
                        style={{position: 'absolute', top: 0, right: 0}}
                        onClick={goBack}
                    >Back
                  </button> 
                  <button 
                        type="submit" 
                        className="btn btn-primary my-1"
                        onClick={checkOut}
                        style={{top: 15, bottom: 15, padding: 15} }
                    >CheckOut
                  </button> 
                  </div>
                  <div>
                  <button 
                        type="submit" 
                        className="btn btn-primary my-1"
                        onClick={generateRandomMeal}
                        style={{top: 10, bottom: 10, padding: 15} }
                    >Random meal
                  </button>
                  </div>   
                  <div class="card my-1">
                    <div class="card-header">
                        Featured
                     </div>
                    <div class="card-body">
                    <h5 class="card-title">Our choice for you</h5>
                    <p class="card-text">{orderHeretStatePost}</p>
                    <p class="card-text">{appetizerStatePost}{randomMealPost.appetizer}{spaceStatePost}{mainCourseStatePost}{randomMealPost.mainCourse}{spaceStatePost}{drinkStatePost}{randomMealPost.drink }{spaceStatePost}{dessertStatePost}{randomMealPost.dessert}</p>
                    </div>
                      </div>              
    </div>  
  )
}
export default withRouter(RestaurantMenu);