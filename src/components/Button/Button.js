import React from 'react';
import PropTypes from 'prop-types';

import styles from './Button.module.css';

function Button({ onClick, loading, children }) {
  const handleClick = () => {
    if (loading) return;

    onClick();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={loading ? styles.ButtonLoading : styles.Button}
    >
      <span className={styles.ButtonText}>{children}</span>
    </button>
  );
}

export default Button;

Button.defaultProps = {
  loading: false,
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
