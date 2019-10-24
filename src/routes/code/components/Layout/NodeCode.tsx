import React, { FC } from "react";
import { connect } from "nuomi";
import { Iapi, params } from "./Data";
import utils from "../../../../public/js/utils";
interface stateProps {
  dataModel: Array<Iapi>;
}
const NodeCode: FC<stateProps> = props => {
  const { dataModel } = props;
  return (
    <pre id="datamodel">
      {dataModel.map((per, key) => {
        const req = per.req;
        const isArray = req && utils.typeOf(req, "Array");
        const isString = req && utils.typeOf(req, "String");
        const reqtpl = (
          <>
            {isString && `${req}`}
            {isArray &&
              (per.req as Array<params>).map(item => {
                return (
                  <React.Fragment>
                    {`
 * @apiParam {${item.type}} ${item.field} ${item.desc}`}
                  </React.Fragment>
                );
              })}
          </>
        );
        return (
          <React.Fragment key={key}>
            {`
/**
 * @api {${per.method}} ${per.url} ${per.apiDesc}
 * @apiVersion 0.0.0
 * @apiDescription ${per.apiDesc}`}
            {per.apiDescription &&
              `
 * @apiDescription ${per.apiDescription}`}
            {`
 * @apiHeader {String} access-token 用户Token`}
            {reqtpl}
            {`
 * @apiSampleRequest http://localhost:3000${per.url}
 * @apiSuccessExample {json} Success-Response:
 ${per.apiSuccessExample || ""}
 */
router.${per.method}('${per.url}', async (req, res, next: NextFunction) => {
    try {
      requestHandler.responseHandle(res);
    } catch (e) {
        next(e);
    }
});
                `}
          </React.Fragment>
        );
      })}
    </pre>
  );
};
export default connect(({ dataModel }) => ({ dataModel }))(NodeCode);
