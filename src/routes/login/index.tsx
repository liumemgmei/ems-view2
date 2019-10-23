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
  onInit() {
    services.getLogin();
  }
};
