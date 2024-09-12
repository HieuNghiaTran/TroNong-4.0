

import axios from "axios";


const getAllHastag=()=>{
    return(axios.get("http://10.0.2.2:8001/hastag"))
}

export { getAllHastag}