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
  patchLogin(params: defaultEnums) {
    return createService<defaultEnums, number>("/login|patch", params);
  }
};
export default services;
