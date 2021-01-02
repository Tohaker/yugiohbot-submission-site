import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";

configure({ adapter: new Adapter() });

global.snapshot = wrapper => {
  expect(toJson(wrapper)).toMatchSnapshot();
};
