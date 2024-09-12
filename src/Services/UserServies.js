import axios from "axios";

const signup = async (data) => {
    console.log(data)
    try {

        const response = await axios.post("http://10.0.2.2:8001/adduser", data);
        return response;
    } catch (err) {
        console.error(err);
    }
};

const signin = async (phone, pass) => {
    try {
        const response = await axios.get(`http://10.0.2.2:8001/user/detail/login?phone=${phone}&pass=${pass}`
    )
        return response;
    } catch (err) {
        console.error(err);
    }
};


const getUserById = async (id) => {
    try {
        const response = await axios.get(`http://10.0.2.2:8001/user/${id}`
    )
        return response;
    } catch (err) {
        console.error(err);
    }
};


export { signup, signin, getUserById };
