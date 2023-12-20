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
    alert(error.detail || 'Something went wrong');
    throw error.response.data;
  }
);

export default axiosClient;
