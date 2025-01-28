import axios from "axios";

const axiosPublic = axios.create({
    baseURL:'https://b10-a12-server-iota.vercel.app'
})

export default axiosPublic;