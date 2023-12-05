import React from "react";
import { act, create } from "react-test-renderer";
import SideBarLogo from "../Logo";

describe("Components > SideBar > Logo", () => {
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
        root = create(<SideBarLogo {...test.props} />);
      });
      expect(root).toMatchSnapshot();
    });
  });
});
