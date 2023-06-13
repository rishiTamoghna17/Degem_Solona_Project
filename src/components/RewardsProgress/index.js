import ProgressBar from "react-bootstrap/ProgressBar";

import popup from "../../assets/img/popup.png";
import { useMediaQuery } from "react-responsive";
import "./style.css";

const RewardsProgress = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  var date = new Date();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var now = (((month - 9) * 30 + day) / 180) * 100;
  console.log(now);
  return (
    <>
      <p className="rewardsText">REWARDS PROGRESS</p>
      {isMobile ? (
        <div className="row">
          <div className="col-md-6 col-12">
            <div className="stepper-wrapper-before row">
              <div className="stepper-item col-4">
                <img src={popup} alt="no popup" />
                <div className="stepper-item-img-area">
                  <p className="stepper-item-text">September</p>
                  <p className="stepper-item-value">5 $DGN</p>
                </div>
                <div className="first-item">
                  <div className="second-item"></div>
                </div>
              </div>
              <div className="stepper-item col-4">
                <img src={popup} alt="no popup" />
                <div className="stepper-item-img-area">
                  <p className="stepper-item-text">October</p>
                  <p className="stepper-item-value">5.5 $DGN</p>
                </div>
                <div className="first-itemm">
                  <div className="second-itemm"></div>
                </div>
              </div>
              <div className="stepper-item col-4">
                <img src={popup} alt="no popup" />
                <div className="stepper-item-img-area">
                  <p className="stepper-item-text">November</p>
                  <p className="stepper-item-value">6 $DGN</p>
                </div>
                <div className="first-itemm">
                  <div className="second-itemm"></div>
                </div>
              </div>
              <ProgressBar className="mobileProgress" now={25} />
            </div>
          </div>

          <div className="col-md-6 col-12">
            <div className="stepper-wrapper-before row">
              <div className="stepper-item col-sm-2 col-4">
                <img src={popup} alt="no popup" />
                <div className="stepper-item-img-area">
                  <p className="stepper-item-text">December</p>
                  <p className="stepper-item-value">6.5 $DGN</p>
                </div>
                <div className="first-itemm">
                  <div className="second-itemm"></div>
                </div>
              </div>
              <div className="stepper-item col-sm-2 col-4">
                <img src={popup} alt="no popup" />
                <div className="stepper-item-img-area">
                  <p className="stepper-item-text">January</p>
                  <p className="stepper-item-value">7 $DGN</p>
                </div>
                <div className="first-itemm">
                  <div className="second-itemm"></div>
                </div>
              </div>
              <div className="stepper-item col-sm-2 col-4">
                <img src={popup} alt="no popup" />
                <div className="stepper-item-img-area">
                  <p className="stepper-item-text">Feburary</p>
                  <p className="stepper-item-value">7.5 $DGN</p>
                </div>
                <div className="first-itemm">
                  <div className="second-itemm"></div>
                </div>
              </div>
              <ProgressBar className="mobileProgress" now={0} />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="stepper-wrapper-before row">
            <div className="stepper-item col-sm-2 col-4">
              <img src={popup} alt="no popup" />
              <div className="stepper-item-img-area">
                <p className="stepper-item-text">September</p>
                <p className="stepper-item-value">5 $DGN</p>
              </div>
              <div className="first-item">
                <div className="second-item"></div>
              </div>
            </div>
            <div className="stepper-item col-sm-2 col-4">
              <img src={popup} alt="no popup" />
              <div className="stepper-item-img-area">
                <p className="stepper-item-text">October</p>
                <p className="stepper-item-value">5.5 $DGN</p>
              </div>
              <div className="first-itemm">
                <div className="second-itemm"></div>
              </div>
            </div>
            <div className="stepper-item col-sm-2 col-4">
              <img src={popup} alt="no popup" />
              <div className="stepper-item-img-area">
                <p className="stepper-item-text">November</p>
                <p className="stepper-item-value">6 $DGN</p>
              </div>
              <div className="first-itemm">
                <div className="second-itemm"></div>
              </div>
            </div>
            <div className="stepper-item col-sm-2 col-4">
              <img src={popup} alt="no popup" />
              <div className="stepper-item-img-area">
                <p className="stepper-item-text">December</p>
                <p className="stepper-item-value">6.5 $DGN</p>
              </div>
              <div className="first-itemm">
                <div className="second-itemm"></div>
              </div>
            </div>
            <div className="stepper-item col-sm-2 col-4">
              <img src={popup} alt="no popup" />
              <div className="stepper-item-img-area">
                <p className="stepper-item-text">January</p>
                <p className="stepper-item-value">7 $DGN</p>
              </div>
              <div className="first-itemm">
                <div className="second-itemm"></div>
              </div>
            </div>
            <div className="stepper-item col-sm-2 col-4">
              <img src={popup} alt="no popup" />
              <div className="stepper-item-img-area">
                <p className="stepper-item-text">Feburary</p>
                <p className="stepper-item-value">7.5 $DGN</p>
              </div>
              <div className="first-itemm">
                <div className="second-itemm"></div>
              </div>
            </div>
            <ProgressBar className="desktopProgress" now={now} />
          </div>
          {/* <div className="stepper-wrapper">
            <div className="stepper-item completed">
              <div className="step-counter-first">
                <div className='step-counter-circle-first'></div>
              </div>
              <div className="step-name"></div>
            </div>
            <div className="stepper-item completed">
              <div className="step-counter">
                <div className='step-counter-circle'></div>
              </div>
              <div className="step-name"></div>
            </div>
            <div className="stepper-item active">
              <div className="step-counter">
                <div className='step-counter-circle'></div>
              </div>
              <div className="step-name"></div>
            </div>
            <div className="stepper-item">
              <div className="step-counter">
                <div className='step-counter-circle'></div>
              </div>
              <div className="step-name"></div>
            </div>
            <div className="stepper-item">
              <div className="step-counter">
                <div className='step-counter-circle'></div>
              </div>
              <div className="step-name"></div>
            </div>
            <div className="stepper-item">
              <div className="step-counter">
                <div className='step-counter-circle'></div>
              </div>
              <div className="step-name">a</div>
            </div>
          </div>
          <ProgressBar now={60} /> */}
        </>
      )}
    </>
  );
};

export default RewardsProgress;
