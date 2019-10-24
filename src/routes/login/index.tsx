import React from "react";
import Layout from "./components/Layout";
import effects from "./effects";
import services from "./services";

export default {
  state: {},
  effects,
  render() {
    return <Layout />;
  },
  async onInit() {
    const query = this.store.getState();
    // const data = await services.getLogin({username:'liumm',password:'11'});
    // const data2 = await services.postLogin();
  }
};
