import PropTypes from "prop-types";
import Button from "./Button";

const Header = ({ title, addTaskDivState, onClickAddBtn }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button
        color={addTaskDivState ? "red" : "green"}
        text={addTaskDivState ? "Close" : "Add"}
        onClickAddBtn={onClickAddBtn}
      />
    </header>
  );
};

Header.defaultProps = {
  title: "Task Tracker",
};

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
