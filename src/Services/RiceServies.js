
import axios from "axios";




const getRiceName =  () => {


        return (axios.get("http://10.0.2.2:8001/ricename"))


};



const getRiceNameById =  (id) => {


        return (axios.get(`http://10.0.2.2:8001/ricenamebyid?id=${id}`))


};

const UpdateRicePrice = (data) => {
        return (axios.put("http://10.0.2.2:8001/update-pricerice", data))
}


const getDataRicePriceList = () => {

        return (axios.get("http://10.0.2.2:8001/getall-riceprice"))

}


export { getRiceName, UpdateRicePrice, getDataRicePriceList,getRiceNameById };




