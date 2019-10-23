import React from "react";
import { AntdConfigProvider } from "wanke-gui";
import zhCN from "wanke-gui/lib/wanke-locale/zh_CN";
import enUS from "wanke-gui/lib/wanke-locale/en_US";
import utils from "./public/js/utils";

import { Router, Route, Redirect, NuomiRoute } from "nuomi";
import "./public/js/config";

import moment from "moment";
import "moment/locale/zh-cn";
import axios from "axios";
moment.locale("zh-cn");

import login from "./routes/login";
import home from "./routes/home";
import createService from "./public/js/createService";
type gettest = { type: string } & { id: string } & { data: string };

function test(params: gettest) {
  return createService<gettest, defaultEnums>("", params);
}

class App extends React.Component {
  async componentDidMount() {
    const res = await test({ id: "222", type: "1", data: "2" });
    console.log(res.results);
    // console.log(res.errorCode)
    //  axios.post('login/test/111?type=1',{data:'2'}).then((res)=>{
    //   console.log('res',res);
    // })
  }
  render() {
    return (
      <AntdConfigProvider
        locale={utils.getInitLanguage() === "en" ? enUS : zhCN}
      >
        <Router>
          <Route path="/login" {...login} />
          <NuomiRoute pathPrefix={/^\/(home|404)/} {...home} />
          <Redirect to="login" />
        </Router>
      </AntdConfigProvider>
    );
  }
}

export default App;
