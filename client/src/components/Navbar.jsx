import React, { useState } from 'react';
import {gsap} from "gsap";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

gsap.fromTo(".navbartop",

{opacity: 1, y: -100},

{opacity: 1, y: 0, duration: 1, delay: 1});

export default function App() {
  const [showNav, setShowNav] = useState(false);

  return (
    <MDBNavbar expand='lg' light bgColor='light' className='navbartop'>
      <MDBContainer fluid>
        <MDBNavbarBrand><Link to="/">Home</Link></MDBNavbarBrand>
        <MDBNavbarToggler
          type='button'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowNav(!showNav)}
        >
          {/* <MDBIcon icon='bars' fas /> */}
        </MDBNavbarToggler>
        <MDBCollapse navbar show={showNav}>
          <MDBNavbarNav>
            <MDBNavbarItem > 
              <Link to="/add"><MDBNavbarLink>Add</MDBNavbarLink></Link>
            </MDBNavbarItem>
            <MDBNavbarItem >
              <Link to="https://github.com/Abhiram2144" target='_blank'><MDBNavbarLink>Reach out to me</MDBNavbarLink></Link>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}