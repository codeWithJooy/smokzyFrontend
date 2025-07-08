import React,{useEffect} from "react";
import { useHistory } from "react-router-dom";
import "./Splash.css";
const Splash = () => {
    const history=useHistory()
    useEffect(()=>{
        setTimeout(()=>{
          history.push("/login")
        },2000)
    })
  return (
    <div className="splashMain">
      <img src="assets/common/splash.png" />
    </div>
  );
};

export default Splash;
