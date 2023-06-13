import "./style.css";

const StakingLockedValue = ({ text, flag }) => {
  var value = text.toString();
  var value2 = value.substr(-2);
  value = value.substr(0, value.length - 3);
  const stackSize = parseInt((value.toString().length - 1) / 3);
  value = parseInt(value).toLocaleString("en-US");
  const arr = value.split(",");
  return (
    <>
      {arr.map((val, id) => (
        <span className="stakingstatsNum">
          {val}
          {id < stackSize && <span className="stakingstatscomma">,</span>}
        </span>
      ))}
      <span className="stakingstatscomma">.</span>
      <span className="stakingstatsNum">{value2}</span>
      {flag && <span className="stakingstatsNum">%</span>}
    </>
  );
};

export default StakingLockedValue;
