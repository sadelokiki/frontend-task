import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import Home from './containers/home';
import CreateNote from './containers/createnote';


export default class NotesRoutes extends Component {
  render() {
    return (
        <div className="routes">
          {/* <Home/> */}
          <Route exact path='/home' component={Home} />
          <Route exact path='/notes' component={CreateNote} />
          <Route exact path='/notes/:id' component={ CreateNote } />
      </div>
    )
  }
}