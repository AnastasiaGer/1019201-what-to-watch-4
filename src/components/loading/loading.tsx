import * as React from 'react';
import {css} from "@emotion/core";
import PacmanLoader from "react-spinners/PacmanLoader";

const override = css`
  display: block;
  margin: 0 auto;
`;

const Loading = () => {
  return (
    <div className="sweet-loading">
      <PacmanLoader
        css={override}
        size={100}
        color={`#150202`}
        loading={true}
      />
    </div>
  );
};

export default Loading;

