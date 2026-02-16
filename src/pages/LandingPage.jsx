import Button from "../components/Button";
import img1 from "../assets/img1.svg";
import { Link } from "react-router-dom";



function LandingPage(){
    return(
        <>
        <div className="landing-page">
        <div className="landing-page-text">
        <h2>EcoLoop</h2>
        <h1>Turn Industrial By-Products <br/>
            Into Revenue</h1>
        <p>Connect with nearby buyers and sellers in a<br/>
            sustainable marketplace designed for SMEs.<br/> 
            List materials, discover opportunities, and reduce waste<br/> 
            through smart, location-aware matching.</p>
        <div>
            <Link to="/register">
            <Button text="Sign Up" type="submit"/>
            </Link>
            <Link to="/login">
            <Button text="Sign In" type="submit"/>
            </Link>
        </div>
        </div>
        <div className="landing-page-img"> <img src={img1} alt="Nature" /> </div>
        </div>
        </>
    );
}

export default LandingPage;