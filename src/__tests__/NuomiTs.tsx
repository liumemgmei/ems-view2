import React, { FC } from "react";
import { connect } from "nuomi";
const App: FC<Dispatch> = props => {
  const { dispatch } = props;
  dispatch({
    type: "",
    payload: {}
  });
  return <div></div>;
};
export default connect()(App);
