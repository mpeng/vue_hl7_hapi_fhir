import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/api",
  //baseURL: "http://hapi.fhir.org/baseR4",
  headers: {
    "Content-type": "application/json"
  }
});
