import Spinner from 'react-loader-spinner';
import PropTypes from 'prop-types';
import styles from './Loader.module.css';

export default function Loader({ type, color, height, width }) {
  return (
    <Spinner
      className={styles.Loader}
      type={type}
      color={color}
      height={height}
      width={width}
    />
  );
}

Loader.propTypes = {
  type: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};
