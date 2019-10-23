import React from "react";
import { Input, Button, TimePicker, Row, Col, AutoComplete } from "wanke-gui";
import classnames from "classnames";
import moment from "moment";
import Box from "../../../public/components/Box";
import utils from "../../../public/js/utils";

const paramTypes = [
  {
    text: "string",
    value: "string"
  },
  {
    text: "number",
    value: "number"
  }
];

class Param extends React.Component<any> {
  render() {
    const { value, onChange } = this.props;
    const add = () => {
      let newValue;
      if (utils.typeOf(value, "Array")) {
        newValue = [
          ...value,
          { id: new Date().getTime(), startTime: "00:00", endTime: "24:00" }
        ];
      } else {
        newValue = [
          { id: new Date().getTime(), startTime: "00:00", endTime: "24:00" }
        ];
      }
      onChange(newValue);
    };
    const del = index => {
      const data1 = value.slice(0, index);
      const data2 = value.slice(index + 1, value.length);
      onChange([...data1, ...data2]);
    };

    const edit = ({ val, type, index }) => {
      const data1 = value.slice(0, index);
      const indexValue = { ...value.slice(index, index + 1)[0] };
      const data2 = value.slice(index + 1, value.length);
      indexValue[type] = val;
      onChange([...data1, indexValue, ...data2]);
    };
    if (typeof value === "string") {
      return (
        <>
          <Input
            onChange={e => {
              onChange(e.target.value);
            }}
          />
          <div>
            <a onClick={add}>
              <i className="iconfont">&#xe646;</i>
            </a>
          </div>
        </>
      );
    }
    return (
      <div>
        {value.map((item, key) => {
          const { startTime, endTime } = item;
          return (
            <Row key={item.id} gutter={10}>
              <Col span={3}>
                <span>字段名称</span>
              </Col>
              <Col span={5}>
                <Input
                  onChange={e => {
                    edit({ val: e.target.value, type: "field", index: key });
                  }}
                />
              </Col>
              <Col span={3}>
                <span>字段类型</span>
              </Col>
              <Col span={4}>
                <AutoComplete
                  dataSource={paramTypes}
                  onChange={val => {
                    edit({ val, type: "type", index: key });
                  }}
                />
              </Col>
              <Col span={3}>
                <span>字段含义</span>
              </Col>
              <Col span={5}>
                <Input
                  onChange={e => {
                    edit({ val: e.target.value, type: "desc", index: key });
                  }}
                />
              </Col>
              <Col span={1}>
                <i
                  className={classnames("iconfont e-ml10 icodel p-pointer", {
                    "f-dn": value.length === 1
                  })}
                  onClick={() => {
                    del(key);
                  }}
                >
                  &#xe647;
                </i>
              </Col>
            </Row>
          );
        })}
        <div>
          <a onClick={add}>
            <i className="iconfont">&#xe646;</i>
          </a>
        </div>
      </div>
    );
  }
}
export default Param;
