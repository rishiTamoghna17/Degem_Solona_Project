import useNftStake from "../../hooks/use-nft-stake";

import "./style.css";

const SliderElement = ({ data, stacked, handleStake, handleUnstake }) => {
  return (
    <div className="sliderElement">
      <img src={data.image} alt="no nft" className="sliderimage" />
      <div className="sliderDescArea">
        <div className="sliderinfoRightDiv">
          <p className="tokenIdText">TOKEN ID</p>
          <p className="number">{data.id}</p>
        </div>
        <div className="sliderinfoLeftDiv">
          <p className="tokenIdText">RANK</p>
          <p className="number">001</p>
        </div>
        <div>
          {stacked ? (
            <span className="unstakeBtn" onClick={() => handleUnstake(data)}>
              Unstake
            </span>
          ) : (
            <span className="unstakeBtn" onClick={() => handleStake(data)}>
              Stake
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SliderElement;
