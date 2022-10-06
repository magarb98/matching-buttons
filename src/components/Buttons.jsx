export default function Button(props) {
  const styles = {
    backgroundColor: props.clicked === true ? "blue" : "",
  };
  return (
    <button style={styles} onClick={props.handleClick}>
      {props.text}
    </button>
  );
}
