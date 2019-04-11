import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import Dashboard  from '../navbar';
import SideBar from '../sidebar';

class Home extends Component {

  constructor(props, ctx) {
    super(props, ctx);
    this.state = {
      notes:  JSON.parse(localStorage.getItem("notes")) || [],
      updatedNotes: JSON.parse(localStorage.getItem("notes")) || []
    }
  }

  getUpdatedNotes(notes) { 
    this.setState({
      updatedNotes: notes
    })
  }

  render() {
    return (
      <div>
        <Row>
          <Col  md={2}>
            <SideBar updateNotes={this.getUpdatedNotes.bind(this)} notes = {this.state.notes} {...this.props}/>
          </Col>
          <Col style={{paddingLeft: '0'}} md={10}>
          <Dashboard notes = {this.state.updatedNotes} {...this.props}/>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Home;
