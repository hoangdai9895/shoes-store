import React from "react";
import { Spinner } from "reactstrap";

const SpinnerIcon = () => {
  return (
    <div className="spinner-icon__box">
      <Spinner style={{ width: "6rem", height: "6rem" }} color="primary" />
      {/* <Spinner type="grow" color="primary" />
      <Spinner type="grow" color="secondary" />
      <Spinner type="grow" color="success" />
      <Spinner type="grow" color="danger" />
      <Spinner type="grow" color="warning" />
      <Spinner type="grow" color="info" />
      <Spinner type="grow" color="light" />
      <Spinner type="grow" color="dark" /> */}
      {/* <img src="/img/spinner.gif" alt="" /> */}
    </div>
  );
};

export default SpinnerIcon;
