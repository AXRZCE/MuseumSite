/*********************************************************************************
*  WEB422 – Assignment 6
*
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Aksharajsinh Parmar   Student ID: 140204223   Date: [Enter Date]
********************************************************************************/
// components/Layout.js
import { Container } from 'react-bootstrap';
import MainNav from './MainNav';

export default function Layout({ children }) {
  return (
    <>
      <MainNav />
      {/* Two line breaks to ensure content starts below the fixed navbar */}
      <br />
      <br />
      <Container>
        {children}
      </Container>
      <br />
    </>
  );
}
