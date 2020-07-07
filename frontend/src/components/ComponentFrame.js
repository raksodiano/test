import React from "react";
import PropTypes from "prop-types";
import ComponentHeader from "./ComponentHeader";

const ComponentFrame = ({ header, body }) => {
  return (
    <div>
      <div className="Component-frame">
        <ComponentHeader title={header} />
        <br />
        <div>{body}</div>
        <br />
      </div>
    </div>
  );
};

ComponentFrame.propTypes = {
  header: PropTypes.string.isRequired,
  body: PropTypes.element.isRequired,
};

export default ComponentFrame;
