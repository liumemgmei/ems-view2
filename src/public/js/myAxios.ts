import axios from "axios";
import { router } from "nuomi";
import { message, Modal } from "wanke-gui";
import { Method } from "axios";
let size = 1;

interface Iconfig {
  params?: any;
  data?: any;
}

function error(content, title = "系统异常") {
  size === 1 &&
    Modal.error({
      title,
      content: content,
      onOk() {
        size = 1;
      }
    });
  size = size - 1;
}

interface axiosProps {
  method: Method;
  url: string;
  data?: any;
}

async function myAxios<T>(params: axiosProps): Promise<T> {
  const { method, data } = params;
  let { url } = params;
  //get和post 不一样的接口请求形式
  const config: Iconfig = {};

  if (
    method === "get" ||
    method === "delete" ||
    method === "head" ||
    method === "options"
  ) {
    config.params = data;
  } else {
    config.data = data;
  }
  if (url.indexOf("/") === 0) {
    url = url.replace("/", "");
  }
  const res = await axios({
    method,
    url: process.env.service + url,
    ...config,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Token": sessionStorage.getItem("token"), // 从localStorage中获取access token
      Language: "zh",
      "Firm-Id": 20,
      "Firm-Code": 110201,
      "User-Id": "1234",
      "Role-Id": "1234"
    },
    validateStatus: function(status) {
      return true;
    }
  });
  return new Promise((resolve, reject) => {
    if (res.status >= 200 && res.status < 300) {
      if ((res.data.message || res.data.error) && !res.data.errorMsg) {
        res.data.errorMsg = res.data.message || res.data.error;
      }
      // 网关异常
      if (typeof res.data.errorCode === "undefined") {
        error(res.data.errorMsg);
        reject(res.data);
      }
      // 成功
      if (res.data.errorCode === 0) {
        resolve(res.data);
      }
      // 中间层请求不到后台,服务器异常
      else if (res.data.errorCode === 51) {
        error(res.data.errorMsg);
        reject(res.data);
      }
      // 登录失效
      else if (res.data.errorCode === 53) {
        Modal.error({
          title: "提示",
          content: "登录失效，请重新登录",
          onOk() {
            size = 1;
            router.location("/index");
          }
        });
        reject(res.data);
      }
      //业务异常
      else if (res.data.errorCode === 52) {
        error(res.data.errorMsg, "提示");
        reject(res.data);
      }
      // 其他异常
      else {
        reject(res.data);
      }
    } else {
      error(res.data.errorMsg);
      reject(res.data);
    }
  });
}
export default myAxios;
