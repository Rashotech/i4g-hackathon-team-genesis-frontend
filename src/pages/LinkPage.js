import React from "react";
import Mono from '../components/monoConnect';

export default () => {
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h4>Account Linking</h4>
          <p className="mb-0">You need to link your Account to get insight on your bank data and expenses.</p>
        </div>
      </div>
      <Mono />
    </>
  );
};
