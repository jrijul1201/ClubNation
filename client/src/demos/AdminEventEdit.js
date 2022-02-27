import React, { useContext, useEffect, useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/BackgroundAsImageWithCenteredContent.js";
// import HeroAdmin from "components/hero/NoOfUsers.js";
import LetUsTalk from "components/LetsTalk";
import Resources from "components/faqs/ShowResources.js";
import AddResources from "components/features/AddResources.js";
import AddSessions from "components/features/AddSessions.js";
import SessionDetails from "components/cards/SessionDetails.js";
import SessionService from "../Services/SessionService";
import EventService from "../Services/EventService";
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

import EventDedicated from "components/features/EventDedicated";
import Footer from "components/footers/MiniCenteredFooter.js";
import { AuthContext } from "../Context/AuthContext";
import EventEdit from "components/features/EventEdit";
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
  const eventID = props.location.search.slice(1);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    EventService.getEventByID(props.location.search.slice(1)).then(
      (data) => {
        setEvent(data.event);
        console.log(event);
      }
    );
  }, []);

  // console.log(props.location.search.slice(1));
  // console.log(event);
  const adminLP = () => {
    return (
      <>
        <AnimationRevealPage>
          <Hero getstarted="#bookaslot" />
          {/* <div id="event">
            <SessionDetails />
          </div> */}    <div id="eventdedicated">
            <EventDedicated event={event} />
          </div>
          <div id="addresources">
            <AddResources SEID={eventID} />
          </div>
          <div id="editevent">
            <EventEdit eventOld={event} SEID={eventID} />
          </div>
        </AnimationRevealPage>
        <Footer />
      </>
    );
  };
  const page = () => {
    if (isAuthenticated && isAdmin) return adminLP();
  };
  return <>{page()}</>;
};
