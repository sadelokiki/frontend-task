import React from 'react';
import NotesRoutes from '../routes';
import Home from '../components/home';
import CreateNote from '../components/createnote';
import { MemoryRouter } from 'react-router'
import { Route } from 'react-router-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

let pathMap = {};
describe('routes using array of routers', () => {
  beforeAll(() => {
    const component = shallow(<NotesRoutes />);
    pathMap = component.find(Route).reduce((pathMap, route) => {
      const routeProps = route.props();
      pathMap[routeProps.path] = routeProps.component;
      return pathMap;
    }, {});
  })

  it('should show Home component for /router', () => {
    expect(pathMap['/']).toBe(Home);
  })

  it('should show CreateNote component for /router', () => {
    expect(pathMap['/notes']).toBe(CreateNote);
  })
})