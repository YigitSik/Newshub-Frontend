import React from 'react'
import { Button,Navbar,Nav,NavDropdown,Form,FormControl } from 'react-bootstrap'

export default function SearchBar() {
    return (


        <div>

            <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
                <Navbar.Brand href="#">News Hub</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="mr-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                        className="me-auto"
                    >
                        <Nav.Link href="#action1">Business</Nav.Link>
                        <Nav.Link href="#action2">Entertainment</Nav.Link>
                        <Nav.Link href="#action3">General</Nav.Link>
                        <Nav.Link href="#action4">Health</Nav.Link>
                        <Nav.Link href="#action5">Science</Nav.Link>
                        <Nav.Link href="#action6">Sports</Nav.Link>
                        <Nav.Link href="#action7">Technology</Nav.Link>
                        <NavDropdown title="Sources" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
                        </NavDropdown>
                        
                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="mr-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                    </Nav>
                    <Nav >
                        <Nav.Link href="#action4">SignOut</Nav.Link>
                        <Nav.Link href="#action5">SignIn</Nav.Link>
                        <Nav.Link href="#action5">SignUp</Nav.Link>
                        <Nav.Link href="#action5">Favourites</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>


        </div>
    )
}
