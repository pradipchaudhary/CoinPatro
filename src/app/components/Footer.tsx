import React, { FC } from "react";
import Github from "../../images/github.svg";
import Facebook from "../../images/facebook.svg";
import Twitter from "../../images/twitter.svg";

const Footer: FC = () => {
    return (
        <footer>
            <div className="copyright">
                Copyright ©
                <a href="https://pradipchaudhary.com.np/" target="_blank">
                    Pradip Chaudhary
                </a>
            </div>
            <div className="social_link">
                <a href="https://github.com/pradipchaudhary" target="_blank">
                    <img src={Github} width="14px" alt="github-mark" />
                </a>
                <a href="https://facebook.com/pradipchaudhary" target="_blank">
                    <img src={Facebook} width="15px" alt="facebook icon" />
                </a>
                <a href="https://twitter.com/pradipchaudhary" target="_blank">
                    <img src={Twitter} width="16px" alt="twitter icon" />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
