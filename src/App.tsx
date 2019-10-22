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

type gettest = { type: string } & { id: string } & { data: string };
interface Rdata {
  list: any;
}

function test(params: gettest) {
  return getdata<gettest, Rdata>("", params);
}

function getdata<T, T1>(
  url,
  params: T
): Promise<{ errorCode: number; data: T1 }> {
  return axios.post(url, { data: "2" });
}

class App extends React.Component {
  async componentDidMount() {
    const res = await test({ id: "222", type: "1", data: "2" });
    console.log(res.data.list);
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
        <div>liumm</div>
      </AntdConfigProvider>
    );
  }
}

export default App;
