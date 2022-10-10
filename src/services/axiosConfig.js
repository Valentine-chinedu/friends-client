import axios from 'axios';

const axiosConfig = axios.create({
	baseURL: `${process.env.REACT_APP_SERVER_URL}/api/v1`,
});

export default axiosConfig;
