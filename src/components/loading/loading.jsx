import React from 'react';
import ReactLoading from 'react-loading';

const Loading = () => {
  const loaderStyles = {
    display: `flex`,
    width: `100%`,
    minHeight: `100vh`,
    justifyContent: `center`,
    alignItems: `center`,
  };

  return (
    <div className="user-page">
      <div className="sign-in user-page__content" style={loaderStyles}>
        <ReactLoading
          type="Bubbles"
          color="#372824"
        />
      </div>
    </div>
  );
};

export default Loading;

