import React from 'react';

function Loading() {
  return (
    <div className="loading-screen wrapped">
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loading;
