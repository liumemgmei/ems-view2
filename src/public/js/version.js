// 公共组件wanke-gui 版本统一使用最新版
import * as wankeJson from "wanke-gui/package.json";
import * as nuomiJson from "nuomi/package.json";
import { Modal, Typography } from "wanke-gui";
import utils from "./utils";
import React from "react";
import ems2Json from "../../../package.json";
//升级的前端弹框提示
function help(nodemodule, isLower, version) {
  if (sessionStorage.getItem(nodemodule.name) !== nodemodule.value) {
    dialog.type = isLower ? "版本过低" : "版本过高";
    dialog.act = isLower ? "升级版本" : "降低版本";
    const copytext = "yarn upgrade " + nodemodule.name + "@" + nodemodule.value;
    const modal = Modal.confirm({
      title: "亲爱的前端同学：",
      okText: "确定",
      cancelText: "暂不升级",
      onCancel: () => {
        // sessionStorage.setItem(nodemodule.name,nodemodule.value)
      },
      content: (
        <React.Fragment>
          <div className="f-fs16">
            您的{nodemodule.name}的版本是{version}，{dialog.type}，请
            {dialog.act}至{nodemodule.value}
          </div>
          <Paragraph
            copyable={{
              text: copytext,
              onCopy: () => {
                modal.destroy();
              }
            }}
          >
            {copytext}
          </Paragraph>
          <div>安装完成之后，记得重启服务哦</div>
        </React.Fragment>
      )
    });
  }
}

const { Paragraph } = Typography;
let nodemoduleVersion = [],
  dependentVersion = [],
  dialog = {
    type: ""
  };
nodemoduleVersion.push(
  {
    name: "wanke-gui",
    value: wankeJson.version
  },
  {
    name: "nuomi",
    value: nuomiJson.version
  }
);

dependentVersion = [
  {
    name: "wanke-gui",
    value: ems2Json.dependencies["wanke-gui"]
  },
  {
    name: "nuomi",
    value: ems2Json.dependencies["nuomi"]
  }
];
if (process.env.NODE_ENV !== "production") {
  utils.each(nodemoduleVersion, function(elem, i) {
    if (elem.value !== dependentVersion[i].value) {
      help(
        dependentVersion[i],
        elem.value < dependentVersion[i].value,
        elem.value
      );
    }
  });
}
