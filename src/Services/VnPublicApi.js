
import axios from "axios";


const GetProvinces = () => {
    return axios.get("https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1")

}



const GetDistricts = () => {
    return axios.get("https://vn-public-apis.fpo.vn/districts/getAll?limit=-1")

}


export { GetProvinces, GetDistricts }