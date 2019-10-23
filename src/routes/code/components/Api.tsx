import React, { FC, useEffect } from "react";
import { Form, Input, Select } from "wanke-gui";
import FormItemUnit from "../../../public/components/FormItemUnit";
import { connect } from "nuomi";
import { FormProps } from "antd/lib/form";
import Param from "./Param";
const { TextArea } = Input;
interface stateProps {
  per: any;
}
interface ownProps {
  id: any;
}
const axiosTypes = [
  {
    name: "get",
    value: "get"
  },
  {
    name: "post",
    value: "post"
  },
  {
    name: "delete",
    value: "delete"
  },
  {
    name: "patch",
    value: "patch"
  },
  {
    name: "put",
    value: "put"
  }
];
const apiGroups = [
  {
    name: "App",
    value: "App"
  },
  {
    name: "Login",
    value: "Login"
  },
  {
    name: "Microgrid",
    value: "Microgrid"
  },
  {
    name: "Model Stations",
    value: "Model Stations"
  },
  {
    name: "On line monitoring",
    value: "On line monitoring"
  },
  {
    name: "Optimal dispatching",
    value: "Optimal dispatching"
  }
];
const Api: FC<stateProps & Dispatch & FormProps & ownProps> = props => {
  const { dispatch, form, per } = props;
  const { id } = per;
  const { getFieldDecorator } = form;
  form.getFieldsValue;
  useEffect(() => {
    dispatch({
      type: "updateFormCom",
      payload: {
        [id]: form
      }
    });
    return () => {
      dispatch({
        type: "updateFormCom",
        payload: {
          [id]: null
        }
      });
    };
  });
  return (
    <>
      <Form>
        {getFieldDecorator("id", { initialValue: id })(<Input type="hidden" />)}

        <FormItemUnit>
          <Form.Item label="请求描述" colon>
            {getFieldDecorator("apiDescription")(<Input />)}
          </Form.Item>
        </FormItemUnit>
        <FormItemUnit>
          <Form.Item label="路由路径" colon>
            {getFieldDecorator("url")(<Input />)}
          </Form.Item>
        </FormItemUnit>
        <FormItemUnit>
          <Form.Item label="请求方式" colon>
            {getFieldDecorator("method")(
              <Select dataSource={axiosTypes}></Select>
            )}
          </Form.Item>
        </FormItemUnit>
        <FormItemUnit>
          <Form.Item label="前端函数" colon>
            {getFieldDecorator("functionname")(<Input />)}
          </Form.Item>
        </FormItemUnit>
        <Form.Item className="e-mr35" label="请求参数" colon>
          {getFieldDecorator("req", {
            initialValue: per.req
          })(<Param />)}
        </Form.Item>
        <FormItemUnit>
          <Form.Item label="返回值类型声明" colon>
            {getFieldDecorator("apiUse")(<Input />)}
          </Form.Item>
        </FormItemUnit>
        <FormItemUnit>
          <Form.Item label="所属分组" colon>
            {getFieldDecorator("apiGroup")(<Select dataSource={apiGroups} />)}
          </Form.Item>
        </FormItemUnit>

        <Form.Item label="返回值" colon>
          {getFieldDecorator("apiSuccessExample")(<TextArea rows={8} />)}
        </Form.Item>
      </Form>
    </>
  );
};
export default connect(({ str, data }) => ({ str, data }))(Form.create()(Api));
