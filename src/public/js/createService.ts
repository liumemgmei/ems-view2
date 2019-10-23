import myAxios from "./myAxios";
import utils from "./utils";
const promise = new Promise((resolve3, reject3) => {
  // ...
  // reject3('timeout');
}).catch(error => {
  throw new Error(error);
});
promise.catch(error => {
  console.error(error);
});

export function beforeAxios(req, data) {
  const temp = req.split("|");
  // 容错处理将中文的冒号以及空格处理下
  let url = temp[0]
    .replace(/ /g, "")
    .replace(/　/g, "")
    .replace(/：/g, ":");
  const method = temp[1] || "get";
  // url路由上的参数
  const regx = new RegExp(/:([A-Za-z])+/g);
  const urlParams = url.match(regx);
  if (!!urlParams) {
    utils.each(urlParams, function(item) {
      const key = item.replace(":", "");
      const val = data[key];
      url = url.replace(item, val);
      delete data[key];
    });
  }
  return {
    method,
    url,
    rawUrl: req,
    data
  };
}

function createServices<T, T1 = undefined>(
  req,
  data?: T
): Promise<{ errorCode: number; results: T1; errorMsg: string }> {
  const parameter = beforeAxios(req, { ...data });
  return myAxios<{ errorCode: number; results: T1; errorMsg: string }>(
    parameter
  );
}
export default createServices;
