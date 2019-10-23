import createService from "../../../public/js/createService";

const services = {
  getLogin() {
    return createService<undefined, defaultEnums>("/login|get");
  },
  postLogin() {
    return createService<undefined, defaultEnums>("/login|post");
  }
};
export default services;
