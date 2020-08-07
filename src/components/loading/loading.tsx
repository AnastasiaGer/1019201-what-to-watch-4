import * as React from 'react';
import {css} from '@emotion/core';
import DotLoader from 'react-spinners/DotLoader';

const override = css`
  display: block;
  margin: auto;
  margin-top: 35vh;
`;

const Loading = () => {
  return (
    <div className="sweet-loading">
      <DotLoader
        css={override}
        size={150}
        color={`#100D06`}
      />
    </div>
  );
};

export default Loading;

