import {React, useState, useEffect} from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import Navbar from "./Navbar";
import AnimationRevealPage from "../../helpers/AnimationRevealPage.js";
import StatsCount from "../../Services/StatsService.js"
const Container = styled.div`
  ${tw`relative -mx-8 -mt-8 bg-center bg-cover h-screen min-h-144`}
  background-image: url("https://user-images.githubusercontent.com/79650423/148645553-b67f6585-83f2-4259-bf58-ff8f6223354b.jpeg");
`;

const OpacityOverlay = tw.div`z-10 absolute inset-0 bg-black opacity-75`;

const HeroContainer = tw.div`z-20 relative px-6 sm:px-8 mx-auto h-full flex flex-col`;
const Content = tw.div`px-4 flex flex-1 flex-col justify-center items-center`;

const Heading = styled.h1`
  ${tw`text-2xl text-center sm:text-2xl lg:text-4xl xl:text-5xl font-black text-gray-100 leading-snug -mt-24 sm:mt-0`}
  span {
    ${tw`inline-block mt-2`}
  }
`;

const PrimaryAction = tw.button`rounded-full px-8 py-3 mt-10 text-sm sm:text-base sm:mt-16 sm:px-8 sm:py-4 bg-gray-100 font-bold shadow transition duration-300 bg-primary-500 text-gray-100 hocus:bg-primary-700 hocus:text-gray-200 focus:outline-none focus:shadow-outline`;


export default () => {

  const [noOfUsers, setNoOfUsers] = useState([]);
  useEffect(() => {
    StatsCount.getStats().then((data) => {
      setNoOfUsers(data.noOfUsers);
      console.log(noOfUsers);
      console.log(data.noOfUsers);
    });
  }, []);

  return (
    <Container>
      <OpacityOverlay />
      <HeroContainer>
        <Navbar />
        <Content>
          <Heading>
            Number of Users: {noOfUsers}
            <br />
          </Heading>
           
        </Content>
      </HeroContainer>
    </Container>
  );
};
