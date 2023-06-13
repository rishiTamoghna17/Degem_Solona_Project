import { Link } from "react-router-dom";
import {
  WalletModalButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";

import logo from "../../assets/img/logo.png";

import "./style.css";

const Header = () => {
  return (
    <div className="header">
      <div className="headerContainer row">
        <div className="col-sm-4 firstHeaderTab">
          <img
            alt="no brand"
            src={logo}
            className="d-inline-block align-top brandImg"
          />{" "}
          <span className="brandText">DEGEN SWEEPERS</span>
        </div>
        <div className="col-sm-4 secondHeaderTab">
          <Link to="/">
            <span className="secondHeaderText">home </span>
          </Link>
          <Link to="/staking">
            <span className="secondHeaderTextt"> staking</span>
          </Link>
        </div>
        <div className="col-sm-4 thirdHeaderTab">
          {/* <button className='walletBtn'>Connect Wallet</button> */}
          <WalletMultiButton className="walletBtn"></WalletMultiButton>
        </div>
      </div>
    </div>
  );
};

export default Header;
