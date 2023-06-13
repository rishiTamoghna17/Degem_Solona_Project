import "./style.css";

const StakingSweepers = ({ text }) => {
  var value = text.toLocaleString("en-US");
  const arr = value.split(",");
  const stackSize = parseInt((text.toString().length - 1) / 3);
  return (
    <>
      {arr.map((val, id) => (
        <span className="stakingstatsNum">
          {val}
          {id < stackSize && <span className="stakingstatscomma">,</span>}
        </span>
      ))}
    </>
  );
};

export default StakingSweepers;
