import CreateNote from '../components/createnote';
import App from '../app.js';
import React from 'react';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount, shallow } from 'enzyme';
import SideBar from '../components/sidebar';
import NotesGallery from '../components/notesgallery';
import Dashboard from '../components/navbar';
import Home from '../components/home';

Enzyme.configure({ adapter: new Adapter() })

let props, nextProps, e, mockLocalStorage, note, event;
beforeEach(() => {
  jest.mock('moment', () => () => ({format: () => '2018–01–30T12:34:56+00:00'}));
  props = {
    notes: [
      {
        id: 1,
        title: 'Susan Adelokiki',
        description: 'This is a test for the first note'
      },
      {
        id: 2,
        title: 'Susan B',
        description: 'This is a test for the second note'
      },
      {
        id: 3,
        title: 'Susan C',
        description: 'This is a test for the third note'
      }
    ],
    history: {
      push: jest.fn()
    },
    match: {
      params: {
        id: 1
      }
    },
    match2: {
      params: {
        id: null
      }
    },
    updateNotes: () => {

    }
  },
  nextProps = {
    notes: [
      {
        id: 1,
        title: 'Susan Adelokiki',
        description: 'This is a test for the first note'
      },
      {
        id: 2,
        title: 'Susan B',
        description: 'This is a test for the second note'
      },
      {
        id: 3,
        title: 'Susan C',
        description: 'This is a test for the third note'
      },
      {
        id: 4,
        title: 'Susan C',
        description: 'This is a test for the third note'
      }
    ]

  },
  e = {
    target: {
      value: 'Susan Adelokiki'
    }
  }, 
  mockLocalStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    crear: jest.fn()
  },
  global.localStorage = mockLocalStorage
  note = {
    title: 'First note',
    description: 'First note in history'
  },
  event = { preventDefault: () => {} };
  jest.spyOn(event, 'preventDefault');
  
});

describe(' App Componeont', () => {
  it('renders App Component', () => {
    const component = shallow(<App/>);
    expect(component).toHaveLength(1);
  })
})

describe(' Home Componeont', () => {
  it('renders Home Component', () => {
    const component = shallow(<Home/>);
    expect(component).toHaveLength(1);
  })
})

describe(' CreateNote Componeont', () => {
  it('renders CreateNote Component', () => {
    const component = shallow(<CreateNote match={props.match2}/>);
    expect(component).toHaveLength(1);
  })
})

describe('Sidebar Component', () => {

  it('shows a list of notes', () => {
    const component = shallow(<SideBar updateNotes= {props.updateNotes} notes = {props.notes}/>);
    const wrapper = component.instance();
    expect(wrapper.state.notes.length).toEqual(3)
    expect(wrapper.state.notes[0].title).toBe('Susan Adelokiki')
    expect(wrapper.state.notes[0].description).toBe('This is a test for the first note')
  });

  it('should go to Edit Page', () => {
    const component = shallow(<SideBar updateNotes= {props.updateNotes} history = {props.history} notes = {props.notes}/>);
    const wrapper = component.instance();
    wrapper.goToEditPage('1');
    expect(wrapper.props.history.push.mock.calls[0]).toEqual([ ('/notes/1') ]);
  })

  it('should go to Add Page', () => {
    const component = shallow(<SideBar updateNotes= {props.updateNotes} history = {props.history} notes = {props.notes}/>);
    const wrapper = component.instance();
    wrapper.goToAddPage();
    expect(wrapper.props.history.push.mock.calls[0]).toEqual([ ('/notes') ]);
  })

  it('should sync', () => {
    const component = shallow(<SideBar updateNotes= {props.updateNotes} notes = {props.notes}/>);
    const wrapper = component.instance();
    wrapper.sync();
    expect(wrapper.state.notes.length).toEqual(3);
  })

  it('should delete a note', () => {
    const component = shallow(<SideBar updateNotes= {props.updateNotes} notes = {props.notes}/>);
    const wrapper = component.instance();
    wrapper.sync(1);
    expect(wrapper.state.notes.length).toEqual(2);
  });
});

describe('Notes Gallery Component', () => {

  it('should set state', () => {
    const component = shallow(<NotesGallery notes = {props.notes}/>);
    const wrapper = component.instance();
    wrapper.componentDidMount();
    expect(wrapper.state.notes.length).toEqual(3);

    wrapper.componentWillReceiveProps(nextProps);
    expect(wrapper.state.notes.length).toEqual(4);
  })
})

describe('Navbar Component', () => {

  it('should search', () => {
    const component = shallow(<Dashboard match={props.match} notes = {props.notes}/>);
    const wrapper = component.instance();
    wrapper.componentWillReceiveProps(nextProps);
    expect(wrapper.state.notes.length).toEqual(4);

    wrapper.onSearchChange(e);

    if (e.target.value == '') {
      expect(wrapper.state.notes.length).toEqual(3);
    } else {
      expect(wrapper.state.notes.length).toEqual(1)
    }
  });
})

describe('CreateNote Component', () => {
  
  it('should update title onTitleChange', () => {
    const component = shallow(<CreateNote match={props.match2}/>);
    const wrapper = component.instance();
    expect(wrapper.title).toBe('');
    wrapper.onTitleChange(e);
    expect(wrapper.title).toBe('Susan Adelokiki');
  });

  it('should update description onDescriptionChange', () => {
    const component = shallow(<CreateNote match={props.match2}/>);
    const wrapper = component.instance();
    expect(wrapper.description).toBe('');
    wrapper.onDescriptionChange(e);
    expect(wrapper.description).toBe('Susan Adelokiki');
  });

  it('should save note to localStorage', () => {
    const component = shallow(<CreateNote match={props.match2}/>);
    const wrapper = component.instance();
    global.localStorage.clear();
    wrapper.saveToLocalStorage(note);
    let existingNotes = JSON.parse(global.localStorage.getItem('notes'));
    expect(existingNotes[0].title).toBe('First note');
    global.localStorage.clear();
  });

  it('should fetch a note', () => {
    const component = shallow(<CreateNote history = {props.history} match={props.match}/>);
    const wrapper = component.instance();
    expect(wrapper.param).not.toBe(null);
  });

  it('should call submitNote when there is no param', () => {
    const component = shallow(<CreateNote history = {props.history} match={props.match}/>);
    const wrapper = component.instance();
    let id = wrapper.props.match.params.id;
    if(!id) {
      expect(wrapper.submitNote()).toBeCalled();
    }
  })

  it('should call updateNote when there is param', () => {
    const component = shallow(<CreateNote history = {props.history} match={props.match2}/>);
    const wrapper = component.instance();
    let id = wrapper.props.match.params.id;
    if(id) {
      expect(wrapper.updateNote).not.toBeCalled();
    }
  })
});