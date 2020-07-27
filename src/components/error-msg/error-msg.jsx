import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getErrMessage} from '../../reducer/user/selectors';

const ErrorMsg = React.memo(function ErrorMsg(props) {
  const {errMessage} = props;
  return (
    <div className="error-message">
      <p>{errMessage}</p>
    </div>
  );
});

const mapStateToProps = (state) => ({
  errMessage: getErrMessage(state),
});

ErrorMsg.propTypes = {
  errMessage: PropTypes.string,
};

export {ErrorMsg};
export default connect(mapStateToProps)(ErrorMsg);
