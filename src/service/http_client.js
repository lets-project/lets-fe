import axios from "axios";

const API_DEV = "https://lets-team-project.herokuapp.com/api/";
const API_PRODUCT = "https://lets-team-project.herokuapp.com/api/";
const baseURL = process.env.NODE_ENV === "development" ? API_DEV : API_PRODUCT;
const httpClient = axios.create({
    headers: {
        'Access-Control-Allow-Origin': 'https://lets-team-project.herokuapp.com/api'	// 서버 domain
    },
    baseURL: baseURL,
    withCredentials: true,
});
export default httpClient;
