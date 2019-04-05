import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import Dashboard  from '../navbar';
import SideBar from '../sidebar';
// import NotesGallery from '../notesgallery';
// import './style.css';

class Home extends Component {

  constructor(props, ctx) {
    super(props, ctx);
    this.notes = JSON.parse(localStorage.getItem("notes")) || [];;
  }

  render() {
    return (
      <div>
        <Row>
          <Col  md={2}>
            <SideBar notes = {this.notes} />
          </Col>
          <Col style={{paddingLeft: '0'}} md={10}>
          <Dashboard notes = {this.notes} />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Home;
