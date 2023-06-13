import "./style.css";

const LockedValue = ({ text, flag }) => {
  var value = text.toString();
  var value2 = value.substr(-2);
  value = value.substr(0, value.length - 3);
  const stackSize = parseInt((value.toString().length - 1) / 3);
  value = parseInt(value).toLocaleString("en-US");
  const arr = value.split(",");
  return (
    <>
      {arr.map((val, id) => (
        <span className="stakedboxnumber">
          {val}
          {id < stackSize && <span className="stakedboxcomma">,</span>}
        </span>
      ))}
      <span className="stakedboxcomma">.</span>
      <span className="stakedboxnumber">{value2}</span>
      {flag && <span className="stakedboxcomma">%</span>}
    </>
  );
};

export default LockedValue;
