import "./style.css";

const EmptyNft = ({ stacked }) => {
  return (
    <div className="emptynft">
      {stacked ? (
        <p className="emptynfttext">You havent staked any nfts</p>
      ) : (
        <p className="emptynfttext">You have staked all your nfts</p>
      )}
    </div>
  );
};

export default EmptyNft;
