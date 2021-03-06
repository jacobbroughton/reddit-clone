import axios from "axios"

const instance = axios.create({
  baseURL: import.meta.env.DEV
    ? "http://localhost:5000/"
    : "https://reddit-clone-jb.herokuapp.com/",
  withCredentials: true,
})

axios.defaults.baseURL = import.meta.env.DEV
  ? "http://localhost:5000/"
  : "https://reddit-clone-jb.herokuapp.com/"

export default instance
