import React from 'react';

const Alert = (props) => {
  return (
    <div>
      {props.message && (
        <div className={`alert alert-${props.type}`} role="alert">
          {props.message}
        </div>
      )}
    </div>
  );
};

export default Alert;
