import React from "react";
import { act, create } from "react-test-renderer";
import Menus from "../Menus";

describe("Components > SideBar > Menu", () => {
  const tests = [
    {
      description: "generic",
      props: {},
    },
  ];
  tests.forEach((test) => {
    it(`should render the component ${test.description}`, async () => {
      let root;
      await act(async () => {
        root = create(<Menus {...test.props} />);
      });
      expect(root).toMatchSnapshot();
    });
  });
});
