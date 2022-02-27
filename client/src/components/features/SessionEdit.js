import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { motion } from "framer-motion";
import { css } from "styled-components/macro"; //eslint-disable-line
import {
    SectionHeading,
    Subheading as SubheadingBase,
} from "components/misc/Headings.js";
import { SectionDescription } from "components/misc/Typography.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import SessionService from "../../Services/SessionService";
import { ReactComponent as SignUpIcon } from "feather-icons/dist/icons/log-in.svg";
import { ReactComponent as ChevronDownIcon } from "feather-icons/dist/icons/chevron-down.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-7.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-8.svg";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import Logopdf from "../../images/icons8-financial-64.png";

const logocss = tw`w-8 h-8`;

const Subheading = tw(SubheadingBase)`mb-4 text-center`;
const Heading = tw(SectionHeading)`w-full`;

const Description = tw(SectionDescription)`items-center w-full text-center`;

const Column = tw.div`flex flex-col items-center`;
const HeaderContent = tw.div``;

const Form = tw.form`mx-auto max-w-3xl`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-600 placeholder-gray-600 text-sm focus:outline-none focus:border-gray-500 focus:bg-white mt-5 focus:placeholder-gray-500 first:mt-0`;

const SubmitButton = styled.button`
  ${tw`mt-5 px-5 tracking-wide font-semibold bg-primary-600 text-gray-100 w-2/6 py-3 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;

const NewPrimaryButton = tw(
    PrimaryButtonBase
)`bg-transparent hover:bg-red-600 text-red-600 font-semibold hover:text-white py-1 px-3 border-2 border-red-600 hover:border-transparent rounded`;

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

const SessionEdit = (props) => {
    const [session, setSession] = useState({
        title: "",
        img:"",
        date: "",
        time: "",
        mlink: "",
        description: "",
        rlink: ""
    });
    const [message, setMessage] = useState(null);
    let timerID = useRef(null);

    useEffect(() => {
        return () => {
            clearTimeout(timerID);
        };
    }, []);

    const onChange = (e) => {
        setSession({ ...session, [e.target.name]: e.target.value });
    };
    
    const [sessions, setSessions] = useState([]);
    const resetForm = () => {
        setSession({
            title: "",
            img:"",
            date: "",
            time: "",
            mlink: "",
            description: "",
            rlink: ""
        });
    };
    const history = useHistory();


    const onSubmit = (e) => {
        e.preventDefault();
        const tmpSessions = [...sessions, session];
        SessionService.editSession(session).then((data) => {
            const { message } = data;
            setMessage(message);
            resetForm();
            if (!message.msgError) {
                timerID = setTimeout(() => {
                    //   history.replace("#/sessions");
                }, 2000);
            }
        });
        setSessions(tmpSessions);
        console.log(sessions);
    };
    const inputRef = useRef();
    useEffect(() => {
        SessionService.getSessions().then((data) => {
            setSessions(data.sessions);
            console.log(sessions);
        });
    }, [inputRef]);

    function removeItemOnce(arr, value) {
        var index = arr.indexOf(value);
        if (index > -1) {
            arr.splice(index, 1);
        }
        return arr;
    }
    const deleteSession = (session) => {
        const tmpSessions = [...sessions];
        SessionService.delSession(session).then((data) => {
            const { message } = data;
            setMessage(message);
        });
        setSessions(removeItemOnce(tmpSessions, session));
    };
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(null);

    const toggleQuestion = (questionIndex) => {
        if (activeQuestionIndex === questionIndex) setActiveQuestionIndex(null);
        else setActiveQuestionIndex(questionIndex);
    };
    return (
        // <AnimationRevealPage>
        <Container tw="m-8">
            <ContentWithPaddingXl>
                <Column>
                    <HeaderContent>
                        <Subheading>ClubNation</Subheading>
                        <Heading>Update Session</Heading>
                        <p align="center">
                            <Description>
                            Update title,poster, date, time, meeting link, description, recording link</Description>
                        </p>
                    </HeaderContent>
                    <br />
                    <br />
                    <br />
                    <Form onSubmit={onSubmit}>
                        <Input
                            type="text"
                            name="title"
                            value={session.title}
                            onChange={onChange}
                            placeholder="Title"
                        />
                          <Input
                            type="url"
                            name="img"
                            value={session.img}
                            onChange={onChange}
                            placeholder="Poster Img Link"
                        />

                        <Input
                            type="text"
                            name="date"
                            value={session.date}
                            onChange={onChange}
                            placeholder="Date"
                        />  <Input
                            type="text"
                            name="time"
                            value={session.time}
                            onChange={onChange}
                            placeholder="Time"
                        />  <Input
                            type="url"
                            name="mlink"
                            value={session.mlink}
                            onChange={onChange}
                            placeholder="Meeting link"
                        />
                        <Input
                            type="text"
                            name="description"
                            value={session.description}
                            onChange={onChange}
                            placeholder="Description"
                        />
                        <Input
                            type="url"
                            name="rlink"
                            value={session.rlink}
                            onChange={onChange}
                            placeholder="Recording Link"
                        />


                        <p align="right">
                            <SubmitButton type="submit">
                                <SignUpIcon className="icon" />
                                <span className="text">Update</span>
                            </SubmitButton>
                        </p>
                    </Form>
                </Column>
            </ContentWithPaddingXl>
            <DecoratorBlob1 />
            <DecoratorBlob2 />
        </Container>
        // </AnimationRevealPage>
    );
};

export default SessionEdit;
