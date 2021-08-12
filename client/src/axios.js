import axios from "axios";

const instance = axios.create({
  baseURL: "http://jabber01.herokuapp.com/#/api/v1",
});

export default instance;
