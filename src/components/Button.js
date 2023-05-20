import PropTypes from "prop-types";

const Button = ({ color, text, onClickAddBtn }) => {
  return (
    <button
      className="btn"
      style={{ backgroundColor: color }}
      onClick={onClickAddBtn}
    >
      {text}
    </button>
  );
};

Button.defaultProps = {
  color: "black",
  text: "Add",
};

Button.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string,
};

export default Button;
