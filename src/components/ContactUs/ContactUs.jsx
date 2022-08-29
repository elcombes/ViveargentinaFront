import { Fragment } from "react";
import './ContactUs.css';
import Navbar from "../NavBar/NavBar";


export default function ContactUs() {
  return(
  <Fragment>			
           <Navbar />	
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
      <li>We've driven online revenues of over <span class="highlight-text-greyContact">$2
          billion</span> for our clients. Ready to know
        how we can help you?</li>
      <span class="hightlight-contact-infoContact">
        <li class="email-infoContact"><i class="fa fa-envelopeContact" aria-hidden="true"></i> info@demo.com</li>
        <li><i class="fa fa-phone" aria-hidden="true"></i> <span class="highlight-textContact">+91 11 1111 2900</span></li>
      </span>
    </ul>
  </div>
</div>
</div>

  </Fragment>
    )
}