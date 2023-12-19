import axios from 'axios';

const axiosClient = axios.create();

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    console.log('error', error);
    return error;
  }
);

export default axiosClient;
