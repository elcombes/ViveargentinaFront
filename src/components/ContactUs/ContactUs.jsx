import { Fragment } from "react";
import './ContactUs.css';
import Navbar from "../NavBar/NavBar";
import { useEffect } from "react";
import { getLsUser } from "./../../redux/action.js"
import { useDispatch } from "react-redux";
import NavBarUser from "../NavBarUser/NavBarUser";
import { useSelector } from 'react-redux';
import Footer from "../Footer/Footer";


export default function ContactUs() {
  const dispatch = useDispatch()
  let userAuth= useSelector((state)=>state.userAuth)

  useEffect(() => {
    dispatch(getLsUser())
  }, [])

  return(
  <Fragment>	
  { userAuth===false ?
    <Navbar/>:
    <NavBarUser/>
  }		
<div class="containContact">

<div class="wrapperContact">

  <div class="formContact">
    <h4>GET IN TOUCH</h4>
    <h2 class="form-headlineContact">Send us a message</h2>
    <form id="submit-form" action="">
      <p>
        <input id="name" class="form-inputContact" type="text" placeholder="Your Name*"/>
        <small class="name-error"></small>
      </p>
      <p>
        <input id="email" class="form-inputContact" type="email" placeholder="Your Email*"/>
        <small class="name-error"></small>
      </p>
      <p class="full-width">
        <input id="company-name" class="form-inputContact" type="text" placeholder="Your Lastname*" required/>
        <small></small>
      </p>
      <p class="full-width">
        <textarea  minlength="20" id="message" cols="30" rows="7" placeholder="Your Message*" required></textarea>
        <small></small>
      </p>
      <p class="full-width">
        <input type="checkbox" id="checkbox" name="checkbox" checked/> Yes, I would like to receive information about discounts, promotions, packages and experiences available..
      </p>
      <p class="full-width">
        <input type="submit" class="submit-btnContact" value="Submit" onclick="checkValidations()"/>
        
      </p>
    </form>
  </div>

  <div class="contacts contact-wrapperContact">

    <ul>
      <li>We have connected more than 10,000 people with unforgettable experiences! how can we help you?</li>
      <span class="hightlight-contact-infoContact">
        <li class="email-infoContact"><i class="fa fa-envelopeContact" aria-hidden="true"></i> vaviveargentina@gmail.com</li>
        <li><i class="fa fa-phone" aria-hidden="true"></i> <span class="highlight-textContact">+91 11 1111 2900</span></li>
      </span>
    </ul>
  </div>
</div>
</div>
<Footer/>
  </Fragment>
    )
}