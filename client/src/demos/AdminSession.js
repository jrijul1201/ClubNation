import React, { useContext, useEffect } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/BackgroundAsImageWithCenteredContent.js";
// import HeroAdmin from "components/hero/NoOfUsers.js";
import LetUsTalk from "components/LetsTalk";
import Resources from "components/faqs/SingleCol.js";
import AddResources from "components/features/AddResources.js";
import AddSessions from "components/features/AddSessions.js";
import SessionDetails from "components/cards/SessionDetails.js";
import AddEvents from "components/features/AddEvents.js";
import EventDetails from "components/cards/EventDetails.js";
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

  const adminLP = () => {
    return (
      <>
        <AnimationRevealPage>
          <Hero getstarted="#bookaslot" />
          {/* <div id="sessions">
            <SessionDetails />
          </div> */}
          <div id="addsessions">
            <AddSessions />
          </div>
         
        </AnimationRevealPage>
        <Footer />
      </>
    );
  };
  const page = () => {
    console.log(isAdmin);
    if (isAuthenticated && isAdmin) return adminLP();
  };
  return <>{page()}</>;
};
