import React, { Component } from 'react';
import {Container, Card, Form, Row, Col, Button} from 'react-bootstrap'
import uuidv1 from 'uuid/v1';
import Dashboard  from '../navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class CreateNote extends Component {

  constructor(props, ctx) {
    super(props, ctx);
    this.state = {
      note: {},
      notes: []
    };
    this.createdOn;
    this.title = "";
    this.description = "";
    this.param = props.match.params.id || null;
  }
  
  componentWillMount() {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    if (this.param) {
      let note = this.fetchNote(this.param);
      this.setState({ note, notes })
    } 
  }

  onTitleChange(e) {
    this.title = e.target.value;
  }
  
  onDescriptionChange(e) {
    this.description = e.target.value;
  }

  getNoteDetails() {
    let form = !this.param ? {
      id: uuidv1(),
      title: this.title,
      description: this.description,
      createdOn: Date.now()
    } : {
      id: this.param,
      title: this.title || this.state.note.title,
      description: this.description || this.state.note.description,
      createdOn: this.state.note.createdOn || Date.now()
    }
    return form;
  }

  fetchNote(id) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    if(notes.length > 0) {
      return notes.filter((note) => note.id === id)[0];
    }
  }

  noteIsValid() {
    return this.title && this.description;
  }

  submitNote() {
    let formData = this.getNoteDetails();
    
    if(this.noteIsValid()) {
      this.saveToLocalStorage(formData);
      this.props.history.push('/')
    } else {
      toast.error('All fields are required!', {
        position: toast.POSITION.TOP_CENTER
      });
    }
  }

  updateNote(id) {
    let data = this.getNoteDetails();
    if (data && id) {
     let notes = this.state.notes.map((note) => {
        if (note.id === id) {
          return data;
        }
        return note;
      }); 
      toast.success('Note updated!', {
        position: toast.POSITION.TOP_CENTER
      });
      localStorage.setItem("notes", JSON.stringify(notes));
      this.props.history.push('/')
    }
  }

  saveToLocalStorage(note) {
    let existingNotes = localStorage.getItem('notes');
    let updatedNotes = []
    if (existingNotes) {
      updatedNotes = JSON.parse(localStorage.getItem("notes"));
    }
    updatedNotes.push(note);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  }

  onSubmit(e) {
    e.preventDefault();
    !this.param ? this.submitNote() : this.updateNote(this.param)
  }



  renderForm() {
    return (
      <div>
      <Dashboard/>
      <Container>
        <Row>
          <Col>
          </Col>
            <Col style={{padding: '80px 0px'}} xs={12} md={4}>
              <Card className="center">
                <Card.Body>

                  <Form onSubmit={this.onSubmit.bind(this)}>
                  <Form.Group controlId="formBasicTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" onChange={this.onTitleChange.bind(this)} placeholder="Enter title" />
                  </Form.Group>

                  <Form.Group controlId="formBasicDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows="3" onChange={this.onDescriptionChange.bind(this)} placeholder="Enter description" />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                  </Form>

                </Card.Body>
              </Card>
          </Col>
        <Col></Col>
        </Row>
        <ToastContainer />
      </Container>
      </div>
    )
  }

  renderUpdateForm() {
    return (
      <div>
      <Dashboard/>
      <Container>
        <Row>
          <Col></Col>
            <Col style={{padding: '80px 0px'}} xs={12} md={4}>
              <Card className="center">
                <Card.Body>

                  <Form onSubmit={this.onSubmit.bind(this)}>
                    <Form.Group controlId="formBasicTitle">
                      <Form.Label>Title</Form.Label>
                      <Form.Control type="text" defaultValue={ this.state.note.title}  onChange={this.onTitleChange.bind(this)} placeholder="Enter title"/>
                    </Form.Group>

                    <Form.Group controlId="formBasicDescription">
                      <Form.Label>Description</Form.Label>
                      <Form.Control as="textarea" rows="3" defaultValue={ this.state.note.description} onChange={this.onDescriptionChange.bind(this)} placeholder="Enter description" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form>

                </Card.Body>
              </Card>
          </Col>
        <Col></Col>
        </Row>
      </Container>
      </div>
    )
  }

  render() {
    return (
      <div className="">
        { !this.param ? this.renderForm() : (this.state.note ?this.renderUpdateForm() : 'no note found' )}
      </div>
    )
  }
}

export default CreateNote;