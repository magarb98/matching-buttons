export default function Button(props) {
  let color = "";
  if (props.clicked === 1) color = "blue";
  if (props.clicked === 2) color = "red";
  const styles = {
    backgroundColor: color,
  };
  return (
    <button style={styles} onClick={props.handleClick}>
      {props.text}
    </button>
  );
}
