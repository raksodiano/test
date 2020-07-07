import React from "react";
import PropTypes from "prop-types";

const ComponentFooter = ({ title }) => {
  return (
    <div>
      <div className="Component-footer">
        <h1>{title}</h1>
      </div>
    </div>
  );
};

ComponentFooter.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ComponentFooter;