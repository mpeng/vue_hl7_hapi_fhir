import http from "../http-hapi";

class HapiService {

  getPatient() {
    return http.get("/Patient/get");
  }

  getPatientEntity() {
    return http.get("/Patient/getEntity");
  }

  getPatientWithID(id) {
    //Patient/getWithID?id=592841
    //return http.get(`/Patient/${id}?_format=json`);
    return http.get(`/Patient/getWithID?id=${id}`);
  }

  create(data) {
    console.log( "Here", data );
    return http.post("/documents", data);
  }

  update(id, data) {
    return http.put(`/documents/${id}`, data);
  }

  delete(id) {
    return http.delete(`/documents/${id}`);
  }

  deleteAll() {
    return http.delete(`/documents`);
  }

  findByTitle(title) {
    return http.get(`/documents?title=${title}`);
  }
}

export default new HapiService();
