import "./style.css";

const StakedBox = ({ property }) => {
  return (
    <div className="stakedbox col">
      <div className="stakedBorderBox">
        <img
          src={property.image[property.imagePath]}
          alt="no symbol"
          // style={{width: "28%"}}
        />
        <p className="stakedboxtext">{property.text}</p>
        <p>{property.number}</p>
      </div>
    </div>
  );
};

export default StakedBox;
