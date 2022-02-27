import React, { useContext, useEffect, useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/BackgroundAsImageWithCenteredContent.js";
// import HeroAdmin from "components/hero/NoOfUsers.js";
import LetUsTalk from "components/LetsTalk";
import ShowResources from "components/faqs/ShowResources.js";
import AddResources from "components/features/AddResources.js";
import AddSessions from "components/features/AddSessions.js";
import SessionDetails from "components/cards/SessionDetails.js";
import SessionService from "../Services/SessionService";
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
import SessionDedicated from "components/features/SessionDedicated";

const Subheading = tw.span`uppercase tracking-wider text-sm`;

export default (props) => {
  const {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    isAdmin,
    setIsAdmin,
  } = useContext(AuthContext);
  const sessionID = props.location.search.slice(1);
  const [session, setSession] = useState(null);
  useEffect(() => {
    SessionService.getSessionByID(sessionID).then((data) => {
      setSession(data.session);
      console.log(session);
    });
  }, []);

  // console.log(props.location.search.slice(1));
  // console.log(session);
  const studentLP = () => {
    return (
      <>
        <AnimationRevealPage>
          <Hero getstarted="#bookaslot" />
          {/* <div id="session">
            <SessionDetails />
          </div> */}
          {/* <div id="addsession">
            <AddSessions />
          </div> */}
          <div id="sessiondedicated">
            <SessionDedicated session={session} />
          </div>
          <div id="addresources">
            <AddResources SEID={sessionID} />
          </div>
          {/* <div id="addresources">
            <ShowResources SEID={sessionID} />
          </div> */}
        </AnimationRevealPage>
        <Footer />
      </>
    );
  };
  const page = () => {
    if (isAuthenticated && !isAdmin) return studentLP();
  };
  return <>{page()}</>;
};
