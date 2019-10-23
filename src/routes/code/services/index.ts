import createService from "../../../public/js/createService";

const services = {
  getLogin(params: { username: string }) {
    return createService<{ username: string }, defaultEnums>(
      "/login|get",
      params
    );
  },
  postLogin() {
    return createService<undefined, number>("/login|post");
  },
  login(params: { username: string; password: string }) {
    return createService<{ username: string; password: string }, any>(
      "/login|post",
      params
    );
  }
};
export default services;
