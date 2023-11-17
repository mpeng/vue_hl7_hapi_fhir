import axios from "axios";

export default axios.create({
  baseURL: "https://optionslab.herokuapp.com/api/hapifhir",
  headers: {
    "Content-type": "application/json"
  }
});
