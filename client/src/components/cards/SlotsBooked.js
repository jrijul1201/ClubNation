import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SlotsBookedService from "../../Services/SlotsBookedService";
import SlotsBookedService2 from "../../Services/AuthService";
import Slider from "react-slick";
import tw from "twin.macro";
import styled from "styled-components";
import {
  SectionHeading,
  Subheading as SubheadingBase,
} from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons";
import { ReactComponent as PhoneIcon } from "feather-icons/dist/icons/phone.svg";
import { ReactComponent as UserIcon } from "feather-icons/dist/icons/clock.svg";
import { ReactComponent as CalenderIcon } from "feather-icons/dist/icons/calendar.svg";
import { ReactComponent as AwardIcon } from "feather-icons/dist/icons/award.svg";
import { ReactComponent as ChevronLeftIcon } from "feather-icons/dist/icons/chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "feather-icons/dist/icons/chevron-right.svg";
import { ReactComponent as MailIcon } from "feather-icons/dist/icons/mail.svg";

import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-2.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-5.svg";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-16 lg:py-16`;
const TabContent = tw(
  motion.div
)`grid grid-cols-1 gap-3 lg:grid-cols-3 grid-flow-row mt-6 rounded-b mx-auto sm:max-w-none sm:mx-0 items-center`;

// const HeadingWithControl = tw(SectionHeading)`flex flex-col items-center sm:flex-row place-self-center w-full`;
const HeaderContent = tw.div``;
const Subheading = tw(SubheadingBase)`mb-4 text-center`;
const Heading = tw(SectionHeading)`w-full`;
const Controls = tw.div`flex items-center`;
const ControlButton = styled(PrimaryButtonBase)`
  ${tw`mt-4 sm:mt-0 first:ml-0 ml-6 rounded-full p-2`}
  svg {
    ${tw`w-6 h-6`}
  }
`;
// const PrevButton = tw(ControlButton)``;
// const NextButton = tw(ControlButton)``;

// const CardSlider = styled(Slider)`
//   ${tw`mt-16`}
//   .slick-track {
//     ${tw`flex`}
//   }
//   .slick-slide {
//     ${tw`h-auto flex justify-center mb-1`}
//   }
// `;
const Card = tw.div`border border-gray-400 rounded-tl-2xl rounded-br-2xl rounded-tr-2xl rounded-bl-2xl focus:outline-none mx-8 my-8 bg-gray-100`;

const CardImage = styled.div((props) => [
  `background-image: url("${props.imageSrc}");`,
  tw`w-full h-56 sm:h-64 bg-cover bg-center rounded sm:rounded-none sm:rounded-tl-4xl`,
]);

const TextInfo = tw.div`py-6 px-10 py-6`;
const TitleReviewContainer = tw.div`flex flex-col sm:flex-row sm:justify-between sm:items-center`;
const Title = tw.h5`text-2xl font-bold`;

const RatingsInfo = styled.div`
  ${tw`flex items-center sm:ml-4 mt-2 sm:mt-0`}
  svg {
    ${tw`w-6 h-6 text-yellow-500 fill-current`}
  }
`;
const Rating = tw.span`ml-2 font-bold`;

const Description = tw.p`text-sm leading-loose mt-2 sm:mt-4`;

const SecondaryInfoContainer = tw.div`flex flex-col sm:flex-row mt-2 sm:mt-4`;
const IconWithText = tw.div`flex items-center mr-6 my-2 sm:my-0`;
const IconContainer = styled.div`
  ${tw`inline-block rounded-full p-2 bg-gray-700 text-gray-100`}
  svg {
    ${tw`w-3 h-3`}
  }
`;
const Text = tw.div`ml-2 text-sm font-semibold text-gray-800`;

const PrimaryButton = tw(
  PrimaryButtonBase
)`mt-auto sm:text-lg rounded-none w-full rounded sm:rounded-none sm:rounded-br-4xl py-3 sm:py-6`;
export default () => {
  // useState is used instead of useRef below because we want to re-render when sliderRef becomes available (not null)
  const [sliderRef, setSliderRef] = useState(null);
  const sliderSettings = {
    arrows: false,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
        },
      },

      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const [slotsbooked, setSlotsBooked] = useState([]);
  const [user, setUser] = useState([]);
  useEffect(() => {
    SlotsBookedService.getSlotsBooked().then((data) => {
      setSlotsBooked(data.slotsbooked);
      // console.log(slotsbooked);
      data.slotsbooked.map((slot) =>
        SlotsBookedService2.getSlotsBooked2(slot.user).then((data) => {
          console.log(data.user);
          setUser((puser) => [...puser, data.user]);
          console.log(user);
        })
      );
    });
  }, []);

  const getUserName = (index) => {
    if (user.at(index)) return user.at(index).name;
    return "";
  };
  const getUserPhone = (index) => {
    if (user.at(index)) return user.at(index).phone;
    return "";
  };

  return (
    <Container>
      <Content>
        <HeaderContent>
          <Subheading>CapiBull</Subheading>
          <Heading>Booked Slots</Heading>
        </HeaderContent>

        <TabContent>
          {slotsbooked.map((slot, index) => (
            <Card key={index}>
              {/* <CardImage imageSrc={"https://images.unsplash.com/photo-1571770095004-6b61b1cf308a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=1024&w=768&q=80"} /> */}
              <TextInfo>
                <TitleReviewContainer>
                  {/* <Title>{getUser(slot.user, index)}</Title> */}
                  <Title>{getUserName(index)}</Title>
                </TitleReviewContainer>

                <SecondaryInfoContainer>
                  <IconWithText>
                    <IconContainer>
                      <CalenderIcon />
                    </IconContainer>
                    <RatingsInfo>
                      <Rating>{slot.day}</Rating>
                    </RatingsInfo>
                  </IconWithText>
                </SecondaryInfoContainer>
                <SecondaryInfoContainer>
                  <IconWithText>
                    <IconContainer>
                      <UserIcon />
                    </IconContainer>
                    <RatingsInfo>
                      <Rating>{slot.time}</Rating>
                    </RatingsInfo>
                  </IconWithText>
                </SecondaryInfoContainer>
                <SecondaryInfoContainer>
                  <IconWithText>
                    <IconContainer>
                      <PhoneIcon />
                    </IconContainer>
                    <RatingsInfo>
                      <Rating>{getUserPhone(index)}</Rating>
                    </RatingsInfo>
                  </IconWithText>
                </SecondaryInfoContainer>
                {/* <Description>{slot.email}</Description> */}
              </TextInfo>
              {/* <PrimaryButton>Book Now</PrimaryButton> */}
            </Card>
          ))}
        </TabContent>
      </Content>
    </Container>
  );
};
