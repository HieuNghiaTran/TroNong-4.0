
import axios from "axios";




const GetLocation = async (latitude, longitude) => {

    const apiKey = 'AIzaSyAg9bT98AqJG8-m6m_ReeMkL9FntuX0d4I';
    try {
        const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );

        if (response.status === 200) {

            const data = response.data.address;

            const road = data.road ? data.road : '';
            const quarter = data.quarter ? data.quarter : '';
            const suburb = data.suburb ? data.suburb : '';
            const city = data.city ? data.city : '';

            return `${road}, ${quarter}, ${suburb}, ${city}`.replace(/(^, )|(, $)/g, '');
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};


const GetProvinceData = () => {

    return (axios.get("https://esgoo.net/api-tinhthanh/1/0.htm"))

}

export { GetLocation,GetProvinceData };




