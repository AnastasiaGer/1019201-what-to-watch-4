import React from 'react';
import Main from "../main/main.jsx";

const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {movieTitle, movieGenre, movieDate} = props;

  return <Main
    movieTitle={movieTitle}
    movieGenre={movieGenre}
    movieDate={movieDate} />;
};

export default App;
