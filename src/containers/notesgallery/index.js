import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Dashboard  from '../navbar';

class NotesGallery extends Component {

  constructor(props, ctx) {
    super(props, ctx)
    this.state = {
      notes: props.notes
    }
  }

  render() {
    return (
      <div>
        <div style={{padding: '3em 15em'}}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Created On</th>
              </tr>
            </thead>
            <tbody>
              {this.state.notes.length === 0 ? 'Click on + sign to add a new note' : 
              this.state.notes.map
                ((note, i) => {
                  return (
                  <tr key={i}>
                    <td>{i}</td>
                    <td>{note.title}</td>
                    <td>{note.createdOn}</td>
                  </tr>
                  )
                })}
            </tbody>
          </Table>
        </div>
     </div>
    )
  }
}

export default NotesGallery;