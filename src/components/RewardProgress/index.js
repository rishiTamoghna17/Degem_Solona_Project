import ProgressBar from "react-bootstrap/ProgressBar";

import lit_circle from "../../assets/img/lit_circle.png";
import gray_circle from "../../assets/img/gray_circle.png";
import "./style.css";

const RewardProgress = () => {
  return (
    <>
      <p className="rewardText">REWARD PROGRESS</p>
      <div className="rewardProgressBar">
        <div className="rewardProgressBarBorderBox">
          {/* <div className='row'>
                <div className="stepper-wrapper">
                  <div className="stepper-itemm completed">
                    <div className='col montharea'>
                      <img 
                        src={lit_circle}
                        alt="no circle"
                        className='lit_circle'
                      />
                      <div className='monthtextarea'>
                        <p className='rewardprogresstext'>September</p>
                        <p className='rewardprogressnumber'>5 $DGN</p>
                      </div>
                    </div>
                  </div>
                  <div className="stepper-itemm">
                    <div className='col montharea'>
                      <img 
                        src={lit_circle}
                        alt="no circle"
                        className='lit_circle'
                      />
                      <div className='monthtextarea'>
                        <p className='rewardprogresstext'>September</p>
                        <p className='rewardprogressnumber'>5 $DGN</p>
                      </div>
                    </div>
                  </div>
                  <div className="stepper-itemm">
                    <div className='col montharea'>
                      <img 
                        src={lit_circle}
                        alt="no circle"
                        className='lit_circle'
                      />
                      <div className='monthtextarea'>
                        <p className='rewardprogresstext'>September</p>
                        <p className='rewardprogressnumber'>5 $DGN</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
          <div className="row stepper-wrapper-before">
            <div className="col-4 montharea row">
              <img src={lit_circle} alt="no circle" className="lit_circle" />
              <div className="monthtextarea row">
                <div className="col-3 hiddenleftLine"></div>
                <div className="col-6">
                  <p className="rewardprogresstext">September</p>
                  <p className="rewardprogressnumber">5 $DGN</p>
                </div>
                <div className="col-3 firstrightLine"></div>
              </div>
            </div>
            <div className="col-4 montharea row">
              <img src={lit_circle} alt="no circle" className="lit_circle" />
              <div className="monthtextarea row">
                <div className="col-3 leftLine"></div>
                <div className="col-6">
                  <p className="rewardprogresstext">October</p>
                  <p className="rewardprogressnumber">5.5 $DGN</p>
                </div>
                <div className="col-3 rightLine"></div>
              </div>
            </div>
            <div className="col-4 montharea row">
              <img src={lit_circle} alt="no circle" className="lit_circle" />
              <div className="monthtextarea row">
                <div className="col-3 leftLine"></div>
                <div className="col-6">
                  <p className="rewardprogresstext">November</p>
                  <p className="rewardprogressnumber">6 $DGN</p>
                </div>
                <div className="col-3 hiddenrightLine"></div>
              </div>
            </div>
            {/* <ProgressBar className='desktopProgresss' now={30} /> */}
          </div>

          <div className="row">
            <div className="col montharea row">
              <img src={gray_circle} alt="no circle" className="gray_circle" />
              <div className="monthtextarea row">
                <div className="col-3 firstleftLine"></div>
                <div className="col-6">
                  <p className="rewardprogresstext">Feburary</p>
                  <p className="rewardprogressnumber">7.5 $DGN</p>
                </div>
                <div className="col-3 rightLine"></div>
              </div>
            </div>
            <div className="col montharea row">
              <img src={gray_circle} alt="no circle" className="gray_circle" />
              <div className="monthtextarea row">
                <div className="col-3 leftLine"></div>
                <div className="col-6">
                  <p className="rewardprogresstext">January</p>
                  <p className="rewardprogressnumber">7 $DGN</p>
                </div>
                <div className="col-3 rightLine"></div>
              </div>
            </div>
            <div className="col montharea row">
              <img src={gray_circle} alt="no circle" className="gray_circle" />
              <div className="monthtextarea row">
                <div className="col-3 leftLine"></div>
                <div className="col-6">
                  <p className="rewardprogresstext">December</p>
                  <p className="rewardprogressnumber">6.5 $DGN</p>
                </div>
                <div className="col-3 hiddenrightLine"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RewardProgress;
