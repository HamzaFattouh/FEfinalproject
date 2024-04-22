import './footer.css'
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faShop,
    faEnvelope,
    faPhone,
    faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

export default function footer() {
    return (
        <footer>
            <div className="contaner">
                <div className="content">
                    <div className="leftside">
                        <h2 className="logo"><FontAwesomeIcon icon={faShop} /> T Shop</h2>
                        <div className="communication">
                            <div>
                                <FontAwesomeIcon icon={faEnvelope} />
                                <p>hello@skillbridge.com</p>
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faPhone} />
                                <p>+91 91813 23 2309</p>
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faLocationDot} />
                                <p>Somewhere in the World</p>
                            </div>
                        </div>
                    </div>
                    <div className="rightside">
                        <div className="socialprofiles">
                            <h3>Social Profiles</h3>
                            <div className="social">
                                {<a href="#"><FaFacebook color='#262626' size={50} /></a>}
                                {<a href="#"><FaTwitter color='#262626' size={50} /></a>}
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <p className="rights">© 2024 T shop. All rights reserved.</p>
            </div>
        </footer>
    )
}
