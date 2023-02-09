import URL from "../constants/apiConstants";
import ACCESS_TOKEN_NAME from '../constants/apiConstants';

const person = "/persons";
const getPerson = () => {
    return URL.get(person+ `/currentLoggedInPerson`, { headers: { Authorization: `Bearer ${localStorage.getItem('login_access_token')}`}});
}
const login = (email, password) => {
    return URL.post(person + `/login`,{
        email:email,
        password:password 
    })
}
const addPerson = (name,address,email,password) => {
    return URL.put(person, {
        name:name,
        address:address,
        email:email,
        password:password
    })
}
const updatePerson = (id, name, address, email, password) => { 
    return URL.put(person + `/updatePerson` , {
        id:id,
        name:name,
        address:address,
        email:email,
        password:password
    },{headers: { Authorization: `Bearer ${localStorage.getItem('login_access_token')}`}})
}

const PersonService = {
    getPerson,
    addPerson,
    updatePerson,
    login
};
export default PersonService;