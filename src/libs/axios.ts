import axios from "axios";

const instance = axios.create({
    baseURL: "https://reqres.in/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export default instance;
