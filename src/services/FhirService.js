import http from "../http-fhir";

class FhirService {

  getPatients() {
    return http.get("/getPatients");
  }

  getPatientsByBirthdayPage(offset) {
    console.log( "getPatientsByBirthdayPage: offset=" + offset);
    return http.get("/getPatientSortedByBirthday?offset=" + offset);
  }

  getPatientsPagination(count, offset) {
    console.log( "getPatientsPagination: count=" + count + ", offset=" + offset);
    return http.get("/getPatientByPagesCount?count=" + count + "&offset=" + offset);
  }

  getPatientsByBirthdayPageCount(count, offset) {
    console.log( "getPatientsByBirthdayPageCount: count=" + count + ", offset=" + offset);
    return http.get("/getPatientSortedByBirthdayCount?count=" + count + "&offset=" + offset);
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
