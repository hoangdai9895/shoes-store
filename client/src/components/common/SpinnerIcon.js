import React from "react";
import { Spinner } from "reactstrap";

const renderSpiner = type => {
  if (type === "grow")
    return (
      <>
        <Spinner type="grow" color="secondary" size="sm" />
      </>
    );
  return (
    <div className="spinner-icon__box">
      <Spinner style={{ width: "4rem", height: "4rem" }} color="secondary" />
    </div>
  );
};

const SpinnerIcon = props => {
  return renderSpiner(props.type);
};

export default SpinnerIcon;
