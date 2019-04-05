import React, { Component } from 'react';
// import { SideNav, Nav } from "react-sidenav";
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router'
import './style.css';

class SideBar extends Component {
  constructor(props, ctx) {
    super(props, ctx)
    this.state = {
      notes: props.notes
    }
  }

  componentDidMount() {
    this.sync();
  }

  goToEditPage(id) {
    this.props.history.push(`/notes/${id}`);
  }

  goToAddPage() {
    this.props.history.push('/notes');
  }

  sync(noteId, updateNote, e) {
    let notes = this.state.notes;
    if (noteId && !updateNote && (this.state.notes.length > 0)) {
      // delete
      notes = this.state.notes.filter((note) => note.id !== noteId);
      localStorage.setItem("notes", JSON.stringify(notes));
    }
    this.setState({
      notes
    });
  }

  render () {
    const sideNavStyle = {
      height: '100%',
      width: '230px',
      position: 'fixed',
      zIndex: 1,
      top: 0,
      left: 0,
      backgroundColor: 'grey',
      overflowX: 'hidden',
      paddingTop: '20px',
    }

    const navItemStyle = {
      padding: '6px 15px 6px 15px',
      textDecoration: 'none',
      fontSize: '15px',
      color: '#000',
      display: 'block',
    }
    return (
      <div style={sideNavStyle} className="sidenav">
        <div style = {{padding: '16px'}}>All Notes
          <i className="fa fa-plus-circle" onClick={this.goToAddPage.bind(this)} style= {{float: 'right', cursor:'pointer'}} aria-hidden="true"></i>
        </div>
          { this.state.notes.length == 0 ? 'No note to show' : this.state.notes.map((note, i) => {
                  return (
                    <a  key={i}  style={navItemStyle}>
                    {note.title} 
                      <span style={{float: 'right'}}>
                        <i style={{fontWeight: '400', color: 'darkolivegreen' }} className="fas fa-edit" onClick={this.goToEditPage.bind(this, note.id)}></i>
                        <i style={{fontWeight: '400', color: '#531f1f' }} className="fas fa-times" onClick={this.sync.bind(this, note.id, null)}></i>
                      </span>
                    </a>
                  ) 
              })
        }
      </div>
    )
  }
}



export default withRouter(SideBar);