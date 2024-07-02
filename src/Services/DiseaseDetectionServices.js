import axios from "axios";
import FormData from "form-data";

const Detection = async (img) => {

        try {
            const imgBase64 = `data:image/jpeg;base64,${img}`;
            console.log(imgBase64)
            const response = await axios.post(
                'https://classify.roboflow.com/plant-disease-detection-iefbi/1',
                imgBase64,
                {
                    params: {
                        api_key: '5d6MYkVMQoPjxyLxNTKK', 
                    },
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );
            console.log('Response data:', response.data);
            return response.data;
        } catch (error) {
            if (error.response) {
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
                console.error('Error response headers:', error.response.headers);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
            throw error;
        }

    }
export default Detection;
