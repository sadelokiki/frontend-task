import React, { Component } from 'react';
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import NotesGallery from '../notesgallery';

class Dashboard extends Component {
  constructor(props, ctx) {
    super(props, ctx)
    this.state = {
      notes: props.notes,
      query: "",
      foundNotes: [],
    }
    this.param = window.location.pathname
  }

  componentDidMount() {
    this.setState({
      notes: this.props.notes
    });
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      notes: nextProps.notes
    });
  }

  render () {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">iNote</Navbar.Brand>
        <Nav className="mr-auto">
        </Nav>
        <Form inline>
          <FormControl onChange={this.onSearchChange.bind(this)} type="text" placeholder="Search" className="mr-sm-2" />
        </Form>
      </Navbar>
      <NotesGallery {...this.props} notes={this.state.notes}/>
    </div>
    ) 
  }

  onSearchChange(e) {
  let currentList = [];
  let filteredList = [];

  // Check if search bar is not empty
  if (e.target.value !== "") {
    currentList = this.props.notes;
    filteredList = currentList.filter(note => {
      const lc = note.title.toLowerCase();
      const filter = e.target.value.toLowerCase();
      return lc.includes(filter);
    });
  } else {
      filteredList = this.props.notes;
    }
    // Set the filtered state 
    this.setState({
      notes: filteredList
    });
  }

}


export default Dashboard;