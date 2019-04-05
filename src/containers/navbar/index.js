import React, { Component } from 'react';
import { Navbar, Nav, Form, Button, FormControl } from 'react-bootstrap';
import NotesGallery from '../notesgallery';

class Dashboard extends Component {
  constructor(props, ctx) {
    super(props, ctx)
    console
    this.state = {
      notes: props.notes,
      query: "",
      foundNotes: [],
    }
  }

  render () {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">iNote</Navbar.Brand>
        <Nav className="mr-auto">
        </Nav>
        <Form inline onSubmit={this.searchNote.bind(this)}>
          <FormControl onChange={this.onSearchChange.bind(this)} type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form>
      </Navbar>
      <NotesGallery notes={this.state.notes}/>
    </div>
    )
  }

  onSearchChange(e) {
    let query = e.target.value
    this.setState({ query });
  }

  onSubmit(e) {
    e.preventDefault();
    this.searchNote();
    this.props.history.push('/home');
  }

  searchNote() {
    let foundNotes = this.state.notes.filter((note) => {
      if (note.title == this.state.query ) {
        return note;
      }
    });
    this.setState({ 
      foundNotes 
    }, () => {
      console.log( foundNotes, this.state.notes, 'title')
    });
  }

}

export default Dashboard;