import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import moment from 'moment';

class NotesGallery extends Component {

  constructor(props, ctx) {
    super(props, ctx)
    this.state = {
      notes: props.notes
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

  goToEditPage(id) {
    this.props.history.push(`/notes/${id}`);
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      notes: nextProps.notes
    });
  }


  render() {
    return (
      <div>
        { this.param === '/' ? <div style={{padding: '3em 15em'}}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Created On</th>
              </tr>
            </thead>
            <tbody>
              {this.state.notes && this.state.notes.length == 0 ? <tr></tr> : 
              this.state.notes.map
                ((note, i) => {
                  return (
                  <tr style={{cursor: 'pointer'}} key={i} onClick={this.goToEditPage.bind(this, note.id)} >
                    <td>{i}</td>
                    <td>{note.title}</td>
                    <td>{moment(note.createdOn).format('MMMM Do YYYY, h:mm:ss a')}</td>
                  </tr>
                  )
                })}
            </tbody>
          </Table>
        </div> : ''}
     </div>
    )
  }
}

export default NotesGallery;