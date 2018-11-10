import * as Adapter from 'enzyme-adapter-react-16'
import { configure } from 'enzyme'
import 'jest-enzyme';

configure({ adapter: new Adapter() })
