import React, { FC } from "react";
import { connect } from "nuomi";
import { Form, Input, Select, Button, Typography } from "wanke-gui";
import { FormProps } from "antd/lib/form";
import FormItemUnit from "../../../../public/components/FormItemUnit/index";
import Box from "../../../../public/components/Box";
import Api from "../Api";
import classnames from "classnames";
import { generateType } from "../../code";
import utils from "../../../../public/js/utils";
import { read } from "fs";
import NodeCode from "./NodeCode";
import ServiceCode from "./ServiceCode";
import Model from "./Model";
const { Paragraph } = Typography;

export interface params {
  field: string;
  type: string;
  desc: string;
}
export interface Iapi {
  method: string;
  req: string | Array<params>;
  apiDescription: string;
  functionname: string;
  apiGroup: string;
  url: string;
  apiSuccessExample: string;
  apiUse: string;
}
interface stateProps {
  type: generateType;
  data: Array<Iapi & { id: any }>;
  dataModel: Array<Iapi>;
}
const Data: FC<stateProps & Dispatch & FormProps> = props => {
  const { dispatch, data, dataModel, type } = props;
  return (
    <Box flex>
      <Box basis={650}>
        {data.map((item, key) => {
          return (
            <div key={item.id} className="boxshadow e-pt10">
              <i
                className={classnames("iconfont boxclose p-pointer", {
                  "f-dn": data.length === 1 ? false : false
                })}
                onClick={() => {
                  // 删除块
                  dispatch({
                    type: "deleteApi",
                    payload: {
                      index: key,
                      id: item.id
                    }
                  });
                }}
              >
                &#xe64c;
              </i>
              <Api per={item} index={key} key={item.id} />
            </div>
          );
        })}
        <div>
          <a
            onClick={() => {
              dispatch({ type: "addApi" });
            }}
          >
            <i className="iconfont e-mr5">&#xe648;</i>
            <span>新增接口</span>
          </a>
        </div>
      </Box>
      <div style={{ width: "150px" }}>
        <Button
          className="e-mt10"
          onClick={() => {
            dispatch({
              type: "generateCode",
              payload: {
                type: generateType.function
              }
            });
          }}
        >
          生成接口请求函数
        </Button>
        <Button
          className="e-mt10"
          onClick={() => {
            dispatch({
              type: "generateCode",
              payload: {
                type: generateType.node
              }
            });
          }}
        >
          生成node路由函数
        </Button>
        <Button
          className="e-mt10"
          onClick={() => {
            dispatch({
              type: "generateCode",
              payload: {
                type: generateType.model
              }
            });
          }}
        >
          生成接口模型数据
        </Button>
      </div>
      <div className="e-ml10">
        <Button
          className="e-mt10"
          onClick={() => {
            let str = document.querySelector("#datamodel").innerHTML;
            const el = document.createElement("textarea");
            el.value = str;
            el.setAttribute("readonly", "");
            el.style.position = "absolute";
            el.style.left = "-9999px";
            document.body.appendChild(el);
            el.select();
            document.execCommand("copy");
            document.body.removeChild(el);
          }}
        >
          copy
        </Button>
        {type === generateType.model && <Model />}
        {type === generateType.function && <ServiceCode />}
        {type === generateType.node && <NodeCode />}
        <div></div>
      </div>
    </Box>
  );
};
export default connect(({ str, data, dataModel, type }) => ({
  str,
  data,
  dataModel,
  type
}))(Data);
