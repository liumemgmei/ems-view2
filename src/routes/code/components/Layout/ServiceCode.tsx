import React, { FC } from "react";
import { connect } from "nuomi";
import { Iapi, params } from "./Data";
import utils from "../../../../public/js/utils";
interface stateProps {
  dataModel: Array<Iapi>;
}
const ServiceCode: FC<stateProps> = props => {
  const { dataModel } = props;
  return (
    <pre id="datamodel">
      {dataModel.map((per, key) => {
        const req = per.req;
        const isArray = req && utils.typeOf(req, "Array");
        const isString = req && utils.typeOf(req, "String");
        const reqtpl = (
          <>
            {isString && `params: ${req}`}
            {isArray && <>{`params: {`}</>}
            {isArray &&
              (per.req as Array<params>).map(item => {
                return (
                  <React.Fragment>
                    {`${item.field}:${item.type},`}
                  </React.Fragment>
                );
              })}
            {isArray && <>{`}`}</>}
          </>
        );
        const reqtpl2 = (
          <>
            {isString && `${req}`}
            {isArray && <>{`{`}</>}
            {isArray &&
              (per.req as Array<params>).map(item => {
                return (
                  <React.Fragment>
                    {`${item.field}:${item.type},`}
                  </React.Fragment>
                );
              })}
            {isArray && <>{`}`}</>}
          </>
        );
        return (
          <React.Fragment key={key}>
            {per.apiDescription &&
              `
// ${per.apiDescription}`}
            {`
${per.functionname}(`}
            {reqtpl}
            {`){
  return createService<`}
            {reqtpl2}
            {!req && `undefined`}
            {`, ${per.apiUse || "any"}>('${per.url}|${per.method ||
              "get"}', params);
},`}
          </React.Fragment>
        );
      })}
    </pre>
  );
};
export default connect(({ dataModel }) => ({ dataModel }))(ServiceCode);
