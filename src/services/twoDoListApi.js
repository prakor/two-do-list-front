import axios from "axios";

const API_BASE_URL = "https://api.example.com/twodoorlist";

export default axios.create({
    baseURL: API_BASE_URL,
})