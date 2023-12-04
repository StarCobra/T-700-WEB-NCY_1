import React from "react";
import { act, create } from "react-test-renderer";
import SideBar from "../SideBar";

describe("Components > SideBar > SlideBar", () => {
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
        root = create(<SideBar {...test.props} />);
      });
      expect(root).toMatchSnapshot();
    });
  });
});
