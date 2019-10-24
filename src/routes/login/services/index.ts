import createService from "../../../public/js/createService";

interface loginprops {
  username: string;
  password: string;
}
const services = {
  getLogin(params: loginprops) {
    return createService<{ username: string; password: string }, defaultEnums>(
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
