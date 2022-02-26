import React, { useContext, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { ReactComponent as FacebookIcon } from "images/facebook-icon.svg";
import { ReactComponent as TwitterIcon } from "images/twitter-icon.svg";
import { ReactComponent as YoutubeIcon } from "images/youtube-icon.svg";
import { ReactComponent as InstagramIcon } from "images/instagram-icon.svg";
import { ReactComponent as DiscordIcon } from "images/discord-icon.svg";
import AuthService from "../../Services/AuthService";
import { AuthContext } from "../../Context/AuthContext";
import { GoogleLogin } from "react-google-login";

import Header, {
  NavLink,
  NavLinks,
  LogoLink,
  NavToggle,
  DesktopNavLinks,
  PrimaryLink as PrimaryLinkBase,
} from "../headers/light.js";

const StyledHeader = styled(Header)`
  ${tw`pt-8 max-w-none w-full`}
  ${DesktopNavLinks} ${NavLink}, ${LogoLink} {
    ${tw`text-gray-100 hover:border-gray-300 hover:text-gray-300`}
  }
  ${NavToggle}.closed {
    ${tw`text-gray-100 hover:text-primary-500`}
  }
`;
const PrimaryLink = tw(PrimaryLinkBase)`rounded-full`;
const SocialLinksContainer = tw.div`mt-4 text-center lg:text-left`;
const SocialLink = styled.a`
  ${tw`cursor-pointer inline-block p-2 rounded-full bg-gray-100 text-gray-900 hover:bg-gray-500 transition duration-300 mr-4 last:mr-0`}
  svg {
    ${tw`w-4 h-4`}
  }
`;

const Navbar = (props) => {
  const {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    isAdmin,
    setIsAdmin,
  } = useContext(AuthContext);
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);
  // console.log("navbar", user);
  const onClickLogoutHandler = () => {
    AuthService.logout().then((data) => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
      }
    });
  };
  const onClickLoginHandler = () => {
    AuthService.logout().then((data) => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
      }
    });
  };

  const unauthenticatedNavBar = () => {
    return (
      <>
        <NavLink href="/">Home</NavLink>
        {/*NavLink href="#login">Book a Slot</NavLink>
        <NavLink href="#login">Resources</NavLink>
        <NavLink href="#letstalk">Basic Stock Market Course</NavLink>*/}
        <NavLink href="#about">About</NavLink>
        <NavLink href="#letstalk">Contact Us</NavLink>
        {/* <NavLink href="#userdetails">Events</NavLink>
        <NavLink href="#userdetails">Sessions</NavLink> */}
        {/* <NavLink href="#login">Login</NavLink> */}
      </>
    );
  };

  const authenticatedNavBar = () => {
    return (
      <>
        <NavLink href="/">Home</NavLink>
        <NavLink href="#events">Events</NavLink>
        <NavLink href="#sessions">Sessions</NavLink>
        <NavLink href="#letstalk">Request/Idea Panel</NavLink>
        {/* <NavLink href="#letstalk">Basic Stock Market Course</NavLink>*/}
      {/*  <NavLink href="#about">About</NavLink>*/}
        {/* <NavLink href="/#/Todos">Todos</NavLink> */}
        {/* <NavLink onClick={onClickLogoutHandler} href="#">
          Logout
        </NavLink> */}
      </>
    );
  };
  const adminNavBar = () => {
    return (
      <>
        <NavLink href="/">Home</NavLink>
        <NavLink href="#userdetails">Events</NavLink>
        <NavLink href="#addsessions">Add Events</NavLink>
        <NavLink href="#userdetails">Sessions</NavLink>
        <NavLink href="#addsessions">Add Sessions</NavLink>
        <NavLink href="#userdetails">Team</NavLink>
        {/* <NavLink onClick={onClickLogoutHandler} href="#">
          Logout
        </NavLink> */}
      </>
    );
  };
  // const isAdmin = user ? user.email === "pc@students.iitmandi.ac.in" : false;

  const navlinks = () => {
    if (!isAuthenticated) return unauthenticatedNavBar();
    else {
      if (isAdmin) return adminNavBar();
      else return authenticatedNavBar();
    }
  };
  const handleFailure = (result) => {
    alert("Login failed. Please try again later.");
  };
  const handleLogin = (result) => {
    AuthService.login({ token: result.tokenId }).then((data) => {
      console.log(data);
      const { isAuthenticated, user, message } = data;
      if (isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        //props.history.push('/todos');
      } else {
        alert(message.msgBody);
        setMessage(message);
      }
    });
  };
  const navLinks = [
    <NavLinks key={1}> {navlinks()}</NavLinks>,
    <NavLinks key={2}>
      {/* <SocialLinksContainer> */}
      {/* <SocialLink href="https://facebook.com" target={"_blank"}>
          <FacebookIcon />
        </SocialLink> */}
      {/* <SocialLink href="https://twitter.com" target={"_blank"}>
          <TwitterIcon />
        </SocialLink> */}
      {/* <SocialLink
          href="https://www.youtube.com/channel/UCSmPXl_J3u9AmRUyveXptPw/featured"
          target={"_blank"}
        >
          <YoutubeIcon />
        </SocialLink>
        <SocialLink
          href="https://instagram.com/capibulladvisors?utm_medium=copy_link"
          target={"_blank"}
        >
          <InstagramIcon />
        </SocialLink>
        <SocialLink href="https://discord.gg/F6r2DYd6Z6"  target={"_blank"}> 
          <DiscordIcon />
        </SocialLink>
      </SocialLinksContainer> */}
      {isAuthenticated ? (
        <button><PrimaryLink onClick={onClickLogoutHandler} href="/#">
          Logout
        </PrimaryLink></button>
      ) : (
        <GoogleLogin
          render={(renderProps) => (
            <button><PrimaryLink
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              Login
            </PrimaryLink></button>
          )}
          clientId="373151948151-7ucdilvhgce7u17fv2s1vs67bbvjesh3.apps.googleusercontent.com"
          buttonText="Log in with Google"
          onSuccess={handleLogin}
          onFailure={handleFailure}
          cookiePolicy={"single_host_origin"}
        />
      )}
    </NavLinks>,
  ];

  return <StyledHeader links={navLinks} />;
};

export default Navbar;
