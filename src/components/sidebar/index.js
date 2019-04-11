import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class SideBar extends Component {
  constructor(props, ctx) {
    super(props, ctx)
    this.state = {
      notes: props.notes
    }
  }

  componentDidMount() {
    this.setState ({
      notes: this.props.notes
    });
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
      toast.success('Note deleted!', {
        position: toast.POSITION.TOP_CENTER
      });
      // delete
      notes = this.state.notes.filter((note) => note.id !== noteId);
      localStorage.setItem("notes", JSON.stringify(notes));
    }
    this.setState({
      notes
    }, () => {
      this.props.updateNotes(this.state.notes);
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
      paddingTop: '2px',
    }

    const navItemStyle = {
      padding: '6px 15px 6px 15px',
      textDecoration: 'none',
      fontSize: '15px',
      color: '#000',
      display: 'inline',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      width: '200px',
      cursor: 'pointer'
    }
    return (
      <div style={sideNavStyle} className="sidenav">
        <div style = {{padding: '14px', borderBottom: '1px solid'}}>All Notes
          <i className="fa fa-plus-circle" onClick={this.goToAddPage.bind(this)} style= {{float: 'right', cursor:'pointer'}} aria-hidden="true"></i>
        </div>
          { this.state.notes.length == 0 ? 'No note to show' : this.state.notes.map((note, i) => {
                  return (
                    <div key={i} style={{padding: '5px 0px', cursor: 'pointer'}}>
                    <a onClick={this.goToEditPage.bind(this, note.id)} style={navItemStyle}>
                    {note.title} 
                    </a>
                    <span style={{float: 'right', padding: '0 18px'}}>
                      <i style={{fontWeight: '400', color: 'darkolivegreen' }} className="fas fa-edit" onClick= {this.goToEditPage.bind(this, note.id)}></i>
                      <i style={{fontWeight: '400', color: '#531f1f' }} className="" onClick={this.sync.bind(this, note.id, null)}>x</i>
                    </span>
                    </div>
                  ) 
              })
        }
        <ToastContainer />
      </div>
    )
  }
}



export default SideBar;