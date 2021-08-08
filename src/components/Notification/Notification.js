import PropTypes from 'prop-types';
import styles from './Notification.module.css';

function Notification({ type, children }) {
  const makemessageStyles = () => {
    return [styles.Message, styles[type]].join(' ');
  };

  return (
    <div className={styles.Notification}>
      <p className={makemessageStyles()}>{children}</p>
    </div>
  );
}

export default Notification;

Notification.defaultProps = {
  type: 'info',
};

Notification.propTypes = {
  type: PropTypes.oneOf(['info', 'warning', 'error']),
  children: PropTypes.node.isRequired,
};
