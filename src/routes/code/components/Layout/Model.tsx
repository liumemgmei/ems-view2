import React, { FC } from "react";
import { connect } from "nuomi";
import { Iapi, params } from "./Data";
import utils from "../../../../public/js/utils";
interface stateProps {
  dataModel: Array<Iapi>;
}
const Model: FC<stateProps> = props => {
  const { dataModel } = props;
  return (
    <pre id="datamodel">
      {dataModel.map((per, key) => {
        const req = per.req;
        const isString = req && utils.typeOf(req, "String");
        const isArray = req && utils.typeOf(req, "Array");
        return (
          <React.Fragment key={key}>
            {`
{
  functionname: 'getLogin',`}
            {isString &&
              `
  req:'${req}',`}
            {isArray &&
              `
  req:[`}
            {isArray &&
              (per.req as Array<params>).map((item, key) => {
                return (
                  <React.Fragment key={key}>
                    {`
      { 
        ${item.field}: '${item.type}',
      },`}
                  </React.Fragment>
                );
              })}
            {isArray &&
              `
    ],`}
            {`
  res: 'defaultEnums',
  type: ${per.method},
  url: '/login'
},`}
          </React.Fragment>
        );
      })}
    </pre>
  );
};
export default connect(({ dataModel }) => ({ dataModel }))(Model);
