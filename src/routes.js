import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import Home from './components/home';
import CreateNote from './components/createnote';


export default class NotesRoutes extends Component {
  render() {
    return (
        <div className="routes">
          <Route exact path='/' component={Home} />
          <Route exact path='/notes' component={CreateNote} />
          <Route exact path='/notes/:id' component={ CreateNote } />
      </div>
    )
  }
}