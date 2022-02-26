import React, { useContext, useEffect } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/BackgroundAsImageWithCenteredContent.js";
import HeroAdmin from "components/hero/NoOfUsers.js";
import LetUsTalk from "components/LetsTalk";
import Resources from "components/faqs/SingleCol.js";
import AddResources from "components/features/AddResources.js";
import AddSessions from "components/features/AddSessions.js";
import UserDetails from "components/cards/UserDetails.js";
import SlotBooking from "components/faqs/ShowSlots.js";
import AdminSlotBooking from "components/faqs/AdminShowSlots.js";
import SlotsBooked from "components/cards/SlotsBooked.js";
import LoginSignup from "components/pricing/TwoPlansWithDurationSwitcher.js";
import ChangePwd from "../pages/ChangePwd";
import tw from "twin.macro";
import MainFeature1 from "components/features/TwoColWithButton.js";
// import Features from "components/features/VerticalWithAlternateImageAndText.js";
// import Blog from "components/blogs/ThreeColSimpleWithImage.js";
// import Testimonial from "components/testimonials/TwoColumnWithImage.js";
// import ContactUsForm from "components/forms/SimpleContactUs.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import { AuthContext } from "../Context/AuthContext";

const Subheading = tw.span`uppercase tracking-wider text-sm`;

export default () => {
  const {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    isAdmin,
    setIsAdmin,
  } = useContext(AuthContext);

  const unauthenticatedLP = () => {
    return (
      <>
        <AnimationRevealPage>
          <Hero getstarted="#login" />
          <div id="about">
            <MainFeature1
              subheading={<Subheading>About</Subheading>}
              heading="We aim to get you started on your Investment Journey."
              buttonRounded={false}
              imageSrc="https://user-images.githubusercontent.com/83131033/149828025-baeec356-9307-4f05-8dcc-fa5de8f8db8d.png"
            />
          </div>
        </AnimationRevealPage>
        <div id="login">
          <LoginSignup />
        </div>
        <div id="letstalk">
          <LetUsTalk />
        </div>
        <Footer />
      </>
    );
  };

  const authenticatedLP = () => {
    return (
      <>
        <AnimationRevealPage>
          <Hero getstarted="#bookaslot" />
        </AnimationRevealPage>
        {/* <div id="bookaslot">
          <SlotBooking />
        </div> */}
        <div id="resources">
          <Resources />
        </div>
    
        <div id="sessions">
        <UserDetails />
        </div>
        <div id="letstalk">
          <LetUsTalk />
        </div>
        <div id="about">
          <MainFeature1
            subheading={<Subheading>About</Subheading>}
            heading="We aim to get you started on your Investment Journey."
            buttonRounded={false}
            primaryButtonText="Contact Us"
            imageSrc="https://user-images.githubusercontent.com/83131033/149828025-baeec356-9307-4f05-8dcc-fa5de8f8db8d.png"
          />
        </div>
        <div id="changepwd">
          <ChangePwd />
        </div>
        <Footer />
      </>
    );
  };
  const adminLP = () => {
    return (
      <>
        <AnimationRevealPage>
          <HeroAdmin getstarted="#bookaslot" />
        </AnimationRevealPage>
        <div id="bookaslot">
          <AdminSlotBooking />
        </div>
        {/* <div>
          <SlotsBooked />
        </div> */}
        <div id="addsessions">
          <AddSessions />
        </div>
        <div id="addresources">
          <AddResources />
        </div>

        {/* <div id="userdetails">
          <UserDetails />
        </div> */}
        <div id="changepwd">
          <ChangePwd />
        </div>
        <Footer />
      </>
    );
  };
  const page = () => {
    if (!isAuthenticated) return unauthenticatedLP();
    else {
      if (isAdmin) return adminLP();
      else return authenticatedLP();
    }
  };
  return <>{page()}</>;
};
