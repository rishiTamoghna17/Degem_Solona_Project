import StakingSweepers from "../StakingSweepers";
import StakingLockedValue from "../StakingLockedValue";
import "./style.css";

const StakingStats = ({
  stakedNfts,
  totalStaked,
  claimAmount,
  dailyRewardAmount,
  floorPrice,
}) => {
  return (
    <>
      <p className="rewardText">STAKING STATS</p>
      <div className="stakingbar">
        <div className="statkingstatsborderbox">
          <p className="stakingstatsTitle">GLOBAL STATS</p>
          <div className="stakingstatsNumArea">
            <div>
              <p className="stakingstatsNum">
                <StakingSweepers text={totalStaked} />
              </p>
              <p className="stakingstasText">SWEEPERS STAKED</p>
            </div>
            <div className="stakingstastextarea">
              <p className="stakingstatsNum">
                <StakingLockedValue
                  text={(totalStaked * floorPrice).toFixed(2)}
                />
              </p>
              <p className="stakingstasText">VALUE LOCKED UP</p>
            </div>
          </div>
        </div>
      </div>
      <div className="stakingbar">
        <div className="statkingstatsborderbox">
          <p className="stakingstatsTitle">PERSONAL STATS</p>
          <div className="stakingstatsNumArea row">
            <div className="col">
              <p className="stakingstatsNum">
                <StakingSweepers text={stakedNfts} />
              </p>
              <p className="stakingstasText">SWEEPERS STAKED</p>
            </div>
            <div className="col">
              <p className="stakingstatsNum">
                <StakingLockedValue text={claimAmount} />
              </p>
              <p className="stakingstasText">DGN GENERATED</p>
            </div>
            <div className="col">
              <p className="stakingstatsNum">
                <StakingSweepers text={5} />
              </p>
              <p className="stakingstasText">$DGN i DAY</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StakingStats;
