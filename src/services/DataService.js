import http from "../http-common";

class DataService {
  getAll() {
    return http.get("/documents");
  }

  get(id) {
    return http.get(`/documents/${id}`);
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

export default new DataService();
