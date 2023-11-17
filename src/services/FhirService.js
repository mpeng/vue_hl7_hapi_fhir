import http from "../http-fhir";

class FhirService {

  getPatients() {
    return http.get("/getPatients");
  }

  getListByResourceType(data) {
    //console.log( "getListByResourceType::data = ", data );
    return http.post("/getListByResourceType", data);
  }

  getPatientByName(data) {
    //console.log( "getPatientByName::data", data );
    return http.post("/getPatientByName", {"name": data});
  }

}

export default new FhirService();
