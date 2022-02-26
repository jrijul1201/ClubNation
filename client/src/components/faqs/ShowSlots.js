import React, { useState, useEffect, useContext } from "react";
import SlotService from "../../Services/SlotService";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import {
  SectionHeading,
  Subheading as SubheadingBase,
} from "components/misc/Headings.js";
import { SectionDescription } from "components/misc/Typography.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-7.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-8.svg";
import { AuthContext } from "../../Context/AuthContext";
import ContactService from "../../Services/ContactService";

const Subheading = tw(SubheadingBase)`mb-4 text-center`;
const Heading = tw(SectionHeading)`w-full`;
const Description = tw(SectionDescription)`w-full text-center`;

const HeaderContent = tw.div``;

const FAQ = tw.div`cursor-pointer select-none mt-2 px-4 sm:px-3 py-3 sm:py-3 rounded-lg text-gray-800 hover:text-gray-900 bg-gray-200 hover:bg-gray-300 transition duration-300 text-center`;
const Question = tw.dt`flex place-content-evenly`;
const QuestionText = tw.span`text-xs lg:text-xs font-semibold`;

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-56 w-56 opacity-15 transform translate-x-2/3 -translate-y-12 text-teal-500`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-64 w-64 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;

export default ({
  subheading = "CapiBull",
  heading = "Slots and References",
  description = "Here are some slots and tools which will help you to manage and understand your finances easily.",

  primaryButtonText = "Learn More",
  primaryButtonUrl = "https://timerse.com",
}) => {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(null);
  const { isAuthenticated, user, setIsAuthenticated, setUser } =
    useContext(AuthContext);
  const toggleQuestion = (questionIndex) => {
    if (activeQuestionIndex === questionIndex) setActiveQuestionIndex(null);
    else setActiveQuestionIndex(questionIndex);
  };

  const slotColor = (isAvailable, isBooked, index) => {
    return isAvailable && !isBooked ? tw`bg-green-500` : tw`bg-red-500`;
  };
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const d = new Date();
  const today = d.getDay();
  const [slots, setSlots] = useState([]);
  useEffect(() => {
    SlotService.getSlots().then((data) => {
      setSlots(data.slots);
      console.log(slots);
    });
  }, []);
  const sendMail = async (user, slot) => {
    console.log("Sending...");
    // const { email, name } = user;
    const { time, day } = slot;
    let details = {
      message:
        "Your slot for " +
        day +
        " at " +
        time +
        " has been booked successfully! Please use this link to join the meeting: https://meet.google.com/hek-cqwo-thf",
      subject: "CapiBull: Your slot has been booked!",
      email: user.email,
    };
    let response = await ContactService.confirmSlot(details);
    let result = await response.json();
    alert(
      "Your slot for " +
        day +
        " at " +
        time +
        " has been booked successfully! You will receive a confirmation mail with meeting link shortly, remember to check your spam folder."
    );
  };
  const updateSlot = (slot, isAvailable, isBooked, user, index) => {
    const isConfirm = window.confirm(
      "Do you want to confirm your slot for " +
        slot.day +
        " at " +
        slot.time +
        "?"
    );
    if (isConfirm) {
      sendMail(user, slot);
      const tmpSlot = [...slots];
      tmpSlot[index].isAvailable = isAvailable;
      tmpSlot[index].isBooked = isBooked;
      SlotService.updSlot(slot, isAvailable, isBooked, user).then((data) => {
        // const { message } = data;
        // setMessage(message);
      });
      // console.log(tmpSlot);
      setSlots(tmpSlot);
    }
  };

  const myDate = (index) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + index);
    const dd = String(tomorrow.getDate()).padStart(2, "0");
    const mm = String(tomorrow.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = tomorrow.getFullYear();
    return dd + "/" + mm + "/" + yyyy;
  };

  return (
    // <AnimationRevealPage>
      <Container tw="m-8">
        <ContentWithPaddingXl>
          <HeaderContent>
            {subheading && <Subheading>{subheading}</Subheading>}
            <Heading>{heading}</Heading>
            <p align="center">
              {description && <Description>{description}</Description>}
            </p>
          </HeaderContent>
          {days.slice(today, today + 5).map((day, index) => {
            return (
              <>
                <FAQ>
                  <Question
                    key={index}
                    onClick={() => {
                      toggleQuestion(index);
                    }}
                    className="group"
                  >
                    <QuestionText>{day + ", " + myDate(index)}</QuestionText>
                  </Question>
                </FAQ>
                <div
                  css={tw`grid grid-cols-3 sm:grid-cols-12 grid-flow-row gap-1 place-items-stretch`}
                >
                  {slots.map((slot, index) =>
                    slot.day === day ? (
                      <FAQ
                        css={slotColor(slot.isAvailable, slot.isBooked, index)}
                      >
                        <Question
                          key={index}
                          onClick={
                            slot.isAvailable && !slot.isBooked
                              ? () => {
                                  updateSlot(slot, true, true, user, index);
                                }
                              : null
                            // () => {
                            //   updateSlot(slot, true, false, null, index);
                            // }
                          }
                          className="group"
                        >
                          <QuestionText>
                            {slot.time.slice(0, 5) + slot.time.slice(-3)}
                            {/* {slot.day} */}
                          </QuestionText>
                        </Question>
                      </FAQ>
                    ) : null
                  )}
                </div>
              </>
            );
          })}
        </ContentWithPaddingXl>
        <DecoratorBlob1 />
        <DecoratorBlob2 />
      </Container>
    // </AnimationRevealPage>
  );
};
