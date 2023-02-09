//import axios from "axios";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Container from '@mui/material/Container';
import './MainPage.css'
import React, {useEffect, useState} from 'react';
import { withRouter } from 'react-router-dom';  
import RestaurantService from "../../CRUDS/RestaurantCRUD";
import PersonService from "../../CRUDS/PersonsCRUD";

function MainPage(props) {
  const [post, setPost] = useState(null);
  const [restaurantPost, setRestaurantPost] = useState([]);
  const [state , setState] = useState({
    name: "",
    address: "",
    email : "",
});

  useEffect (() =>{
    (async() => {
      const response = await PersonService.getPerson();
      props.updateTitle('Home')
      setPost(response.data);
      console.log(response.data);
    })();
  },[])

  useEffect(() =>{
    (async() => {
      const response = await RestaurantService.getRestaurants();
      setRestaurantPost(response.data.restaurantDTOList);
      console.log(response.data.restaurantDTOList);
    })();
  },[])
  
  const handleChange = (e) => {
    const {id , value} = e.target   
    setState(prevState => ({
        ...prevState,
        [id] : value
    }))
}

  const updatePersonDetails = () => {
  (async() => {
    const response = await PersonService.updatePerson(post.id,state.name,state.address,state.email,post.password);
    setPost(response.data);
    console.log("Updated person is : " + state.address);
  })();
  }
  const logout = () => {
    localStorage.removeItem('login_access_token')
    props.history.push('/')
}

const handleOrderButtonClick = (event) => {
  const id = event.target.id;
  console.log(id);
  props.history.push('/restaurantMenu' + `/${id}`);
}

  if (!post) return null;

  return (
    <div className="container">
      <div className='row'>
      <div class='card my-1 col-4'>
        <h1 class="card-title">Welcome {post.name}</h1>
        <label>
            Type your new Name below:
            <input type="name" 
                           className="form-control" 
                           id="name" 
                           aria-describedby="nameHelp" 
                           placeholder="New Name" 
                           value={state.name}
                           onChange={handleChange}
                    />
        </label>
        <h3>Your address is {post.address}</h3>
        <label>
            Type your new Address below:
            <input type="address" 
                           className="form-control" 
                           id="address" 
                           aria-describedby="addressHelp" 
                           placeholder="New Address" 
                           value={state.address}
                           onChange={handleChange}
                    />
        </label>
        <h4>Your email is : {post.email}</h4>
        <label>
            Type your new email below:
            <input type="email" 
                           className="form-control" 
                           id="email" 
                           aria-describedby="emailHelp" 
                           placeholder="New Email" 
                           value={state.email}
                           onChange={handleChange}
                    />
        </label>
          <button 
                        type="submit" 
                        className="btn btn-primary"
                        onClick={updatePersonDetails}
                    >Submit Changes
                  </button>
      </div>
      <div class="card my-1 col-8">
          {restaurantPost.map(restaurantPost => {
          return(
            <Container key={restaurantPost.id} maxWidth="sm">
            <img src={restaurantPost.url} alt={restaurantPost.name} style={{height: "50%", width: "50%", objectFit:"scale-down", padding: 10}}/>
          <h1>{restaurantPost.name}</h1>
          <button 
                        type="submit" 
                        className="btn btn-primary"
                        id={restaurantPost.id}
                        onClick={handleOrderButtonClick}
                    >Order
                  </button>
          </Container>)       
})}
          </div>
      </div>
      <button 
                        type="submit" 
                        className="btn btn-primary"
                        onClick={logout}
                        style={{position: 'absolute', top: 0, right: 0}}
                    >Logout
                  </button>           
    </div>
  );
}
export default withRouter(MainPage);