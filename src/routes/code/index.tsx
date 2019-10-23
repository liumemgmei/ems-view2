import React from "react";
import Layout from "./components/Layout";
import effects from "./effects";
import services from "./services";

export default {
  state: {
    data: [
      {
        id: 0,
        req: ""
      }
    ],
    dataModel: [],
    type: "",
    str: "11",
    forms: {}
  },
  effects,
  render() {
    return <Layout />;
  },
  async onInit() {
    const query = this.store.getState();
    // const data = await services.getLogin({username:'liumm'});
    // const data2 = await services.postLogin();
  }
};
