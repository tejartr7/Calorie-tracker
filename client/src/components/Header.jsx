import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, useLocation } from 'react-router-dom';
function Header() {
    const [expanded, setExpanded] = useState(false);
    const [small, setSmall] = useState(false);
    const location = useLocation(); // Get the current location
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('mail');
        window.location.reload();
    };
    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth <= 1000) {
                setSmall(true);
            } else {
                setSmall(false);
            }
        };

        // Initial call to set the `small` state based on the screen width
        handleResize();

        // Add an event listener to update `small` when the window is resized
        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Navbar collapseOnSelect expand="lg" bg="" variant="light">
            <Container className='fw-bold'>
                <Navbar.Brand href="/">Brand name</Navbar.Brand>
                {small ? <Button className="bg-black text-white" onClick={handleLogout}>Logout</Button> : null}
                <Navbar.Toggle
                    aria-controls="responsive-navbar-nav"
                    onClick={() => setExpanded(!expanded)}
                />
                <Navbar.Collapse id="responsive-navbar-nav" in={expanded}>
                    <Nav className="ml-auto">
                        <Nav.Link as={NavLink} to="/" exact isActive={() => location.pathname === "/"}>Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/tracker" isActive={() => location.pathname.includes("/tracker")}>Tracker</Nav.Link>
                        <Nav.Link as={NavLink} to="/chart" isActive={() => location.pathname.includes("/chart")}>Chart</Nav.Link>
                        <Nav.Link as={NavLink} to="/about" isActive={() => location.pathname.includes("/about")}>About</Nav.Link>
                        <Nav.Link as={NavLink} to="/contact" isActive={() => location.pathname.includes("/contact")}>Contact us!</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                {!small ? <Button className="bg-black text-white" onClick={handleLogout}>Logout</Button> : null}
            </Container>
        </Navbar>
    );
}
export default Header;