import { Router, Link } from '@reach/router';
import styled from '@emotion/styled';
import { useState } from 'react';


export default function Header() {
  const MENU_LIST = [
    { text: 'Explore', href: '/explore' },
    { text: 'Connect', href: '/user/login' },
  ];
  const [profileId, setProfileId] = useState("")
  const [navActive, setNavActive] = useState(null)

  return (
    <Nav>
      <Logo>
        <Link to={'/'}>
          
        </Link>
        <WebsiteName>monbois</WebsiteName>
      </Logo>
      <NavMenuBar onClick={() => setNavActive(!navActive)}>
        <div></div>
        <div></div>
        <div></div>
      </NavMenuBar>
      <NavMenuElements
        className={`${navActive ? 'active' : ''} nav__menu-list`}
      >
        {profileId ? (
          <NavItems>
            <a href={'/user/profile'} className={'nav__link'}>
              Profile
            </a>
          </NavItems>
        ) : (
          <NavItems>
            <a href={'/user/login'} className={'nav__link'}>
              Connect
            </a>
          </NavItems>
        )}

        <ContainerTheme className={'theme'}>
        
        </ContainerTheme>
      </NavMenuElements>
    </Nav>
  );
}

const Nav = styled.nav`
  display: flex;
  align-items: center;
  height: 70px;
  width: 100%;
  padding: 5px 2rem;
  background-color: var(--bg);
  position: sticky;
  z-index: 99;
  max-width: 1920px;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
`;

const NavMenuBar = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 6px;
  cursor: pointer;
  div {
    width: 40px;
    height: 4px;
    background-color: black;
    border-radius: 2px;
  }
  @media (min-width: 768px) {
    display: none;
  }
`;

const NavMenuElements = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  position: fixed;
  top: 60px;
  width: 288px;
  height: 25%;
  row-gap: 24px;
  right: -288px;
  padding: 24px 16px;
  border-radius: 10px;
  background-color: var(--bg);
  transition: all ease-in 300ms;

  @media (min-width: 768px) {
    position: unset;
    flex-direction: row;
    min-height: fit-content;
    width: fit-content;
    column-gap: 24px;
    align-items: center;
    width: 100%;
    margin-top: 0;
  }
`;

const NavItems = styled.div`
  .nav__link {
    font-size: 18px;
    position: relative;
    transition: ease-in-out 0.3s;
  }

  a {
    margin-right: 50px;
  }

  @media (min-width: 768px) {
    .nav__link::before {
      content: '';
      position: absolute;
      width: 0%;
      height: 3px;
      bottom: -10px;
      left: 0;
      background-color: var(--main);
      transition: ease-in-out 0.3s;
    }

    .nav__link:hover:before {
      width: 100%;
    }
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  height: 70px;
`;

const List = styled.nav`
  display: flex;
  align-items: center;
  list-style-type: none;
  gap: 1rem;
`;

const WebsiteName = styled.h1`
  display: none;
  

  @media (min-width: 768px) {
    display: block;
    font-size: 1.9rem;
    margin-left: 7px;
  }
`;

const ContainerTheme = styled.div`
  @media (min-width: 768px) {
    position: absolute;
    right: -15px;
    top: 14px;
  }
`;
