import React, { useState, useEffect } from "react";
import ResourceService from "../../Services/ResourceService";
import { motion } from "framer-motion";
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
import { ReactComponent as ChevronDownIcon } from "feather-icons/dist/icons/chevron-down.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-7.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-8.svg";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import Logopdf from "../../images/icons8-financial-64.png";

const logocss =tw`w-8 h-8`;
const NewPrimaryButton = tw(
  PrimaryButtonBase
)`bg-transparent hover:bg-red-600 text-red-600 font-semibold hover:text-white py-2 px-8 border-2 border-red-600 hover:border-transparent rounded`;

// const NewPrimaryButton = styled(PrimaryButtonBase)(props => [
//   tw`bg-transparent hover:bg-red-600 text-red-600 font-semibold hover:text-white py-1 px-3 border-2 border-red-600 hover:border-transparent rounded`,

// ]);

const Subheading = tw(SubheadingBase)`mb-4 text-center`;
const Heading = tw(SectionHeading)`w-full`;
const Description = tw(SectionDescription)`w-full text-center`;

const Column = tw.div`flex flex-col items-center`;
const HeaderContent = tw.div``;

const FAQSContainer = tw.dl`mt-12 max-w-4xl w-full relative`;
const FAQ = tw.div`cursor-pointer select-none mt-5 px-8 sm:px-10 py-5 sm:py-4 rounded-lg text-gray-800 hover:text-gray-900 bg-gray-200 hover:bg-gray-300 transition duration-300`;
const Question = tw.dt`flex justify-between items-center`;
const QuestionText = tw.span`mx-6 text-lg lg:text-xl font-semibold`;
const QuestionToggleIcon = motion(styled.span`
  ${tw`ml-2 transition duration-300`}
  svg {
    ${tw`w-6 h-6`}
  }
`);
const Answer = motion(tw.dd`text-sm sm:text-base leading-relaxed`);

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-56 w-56 opacity-15 transform translate-x-2/3 -translate-y-12 text-teal-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-64 w-64 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;

export default ({
  subheading = "CapiBull",
  heading = "Resources and References",
  description = "Here are some resources and tools which will help you to manage and understand your finances easily.",

  primaryButtonText = "Learn More",
  primaryButtonUrl = "https://timerse.com",
}) => {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(null);

  const toggleQuestion = (questionIndex) => {
    if (activeQuestionIndex === questionIndex) setActiveQuestionIndex(null);
    else setActiveQuestionIndex(questionIndex);
  };
  const [resources, setResources] = useState([]);
  useEffect(() => {
    ResourceService.getResources().then((data) => {
      setResources(data.resources);
      console.log(resources);
    });
  }, []);

  return (
    // <AnimationRevealPage>
      <Container tw="m-8">
        <ContentWithPaddingXl>
          <Column>
            <HeaderContent>
              {subheading && <Subheading>{subheading}</Subheading>}
              <Heading>{heading}</Heading>
              <p align="center">
                {description && <Description>{description}</Description>}
              </p>
            </HeaderContent>
            <FAQSContainer>
              {resources.map((resource, index) => (
                <FAQ>
                  <Question
                    key={index}
                    onClick={() => {
                      toggleQuestion(index);
                    }}
                    className="group"
                  >
                    <img src={Logopdf} alt="logo" css = {logocss}/>
                    <QuestionText>{resource.title}</QuestionText>
                    <QuestionToggleIcon
                      variants={{
                        collapsed: { rotate: 0 },
                        open: { rotate: -180 },
                      }}
                      initial="collapsed"
                      animate={
                        activeQuestionIndex === index ? "open" : "collapsed"
                      }
                      transition={{
                        duration: 0.02,
                        ease: [0.04, 0.62, 0.23, 0.98],
                      }}
                    >
                      <ChevronDownIcon />
                    </QuestionToggleIcon>
                  </Question>
                  <Answer
                    variants={{
                      open: { opacity: 1, height: "auto", marginTop: "16px" },
                      collapsed: { opacity: 0, height: 0, marginTop: "0px" },
                    }}
                    initial="collapsed"
                    animate={
                      activeQuestionIndex === index ? "open" : "collapsed"
                    }
                    transition={{
                      duration: 0.3,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    }}
                  >
                    <p
                      key={index}
                      onClick={() => {
                        toggleQuestion(index);
                      }}
                      className="group"
                    >
                      {resource.description}
                      <br />
                      <br />
                    </p>
                    <p align="right">
                      <NewPrimaryButton
                        as="a"
                        target="_blank"
                        href={resource.media}
                      >
                        {(primaryButtonText = "View")}
                      </NewPrimaryButton>
                    </p>
                  </Answer>
                </FAQ>
              ))}
            </FAQSContainer>
          </Column>
        </ContentWithPaddingXl>
        <DecoratorBlob1 />
        <DecoratorBlob2 />
      </Container>
    // </AnimationRevealPage>
  );
};
