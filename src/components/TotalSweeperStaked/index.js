import "./style.css";

const TotalSweeperStaked = ({ text }) => {
  var value = text.toLocaleString("en-US");
  const arr = value.split(",");
  const stackSize = parseInt((text.toString().length - 1) / 3);
  return (
    <>
      {arr.map((val, id) => (
        <span className="stakedboxnumber">
          {val}
          {id < stackSize && <span className="stakedboxcomma">,</span>}
        </span>
      ))}
    </>
  );
};

export default TotalSweeperStaked;
