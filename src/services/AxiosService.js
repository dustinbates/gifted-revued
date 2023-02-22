import Axios from 'axios'
import { baseURL } from '../env'
export const api = Axios.create({
  baseURL,
  timeout: 8000
})

export const giftsApi = new Axios.create({
  baseURL: "https://bcw-sandbox.herokuapp.com/api/",
  timeout: 8000,
});