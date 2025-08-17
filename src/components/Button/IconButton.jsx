import PropTypes from "prop-types";

IconButton.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.node,
  onClick: PropTypes.func,
  title: PropTypes.string,
  disabled: PropTypes.bool,
};

function IconButton({ className, icon, onClick, title, disabled = false }) {
  return (
    <button
      className={className}
      type="button"
      onClick={onClick}
      title={title}
      disabled={disabled}
    >
      {icon}
    </button>
  );
}

export default IconButton;
