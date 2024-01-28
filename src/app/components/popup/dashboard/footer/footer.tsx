import React, { FC } from "react";

// Import Icons
import { FaGithub, FaFacebook, FaTwitter } from "react-icons/fa";
import { FooterSection } from "../../../../../styles";

const socialLinks = [
    {
        name: "github",
        icon: <FaGithub />,
        link: "https://www.github.com/pradipchaudhary/",
    },
    {
        name: "facebook",
        icon: <FaFacebook />,
        link: "https://www.facebook.com",
    },
    {
        name: "twitter",
        icon: <FaTwitter />,
        link: "https://www.twitter.com",
    },
];

const Footer: FC = () => {
    return (
        <FooterSection className="dashboard-footer">
            <div className="copyright">
                Copyright ©
                <a href="https://pradipchaudhary.com.np/" target="_blank">
                    Pradip Chaudhary
                </a>
            </div>
            <div className="social-links">
                {socialLinks.map((item) => {
                    return (
                        <a href={item.link} key={item.name} target="_blank">
                            {item.icon}
                        </a>
                    );
                })}
            </div>
        </FooterSection>
    );
};

export default Footer;
