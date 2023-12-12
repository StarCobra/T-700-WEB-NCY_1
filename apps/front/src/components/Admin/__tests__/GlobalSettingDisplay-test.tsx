import React from "react";
import { act, create } from "react-test-renderer";
import GlobalSettings from "../GlobalSettingDisplay";

describe("Components > Admin > GlobalSettingDisplay", () => {
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
        root = create(<GlobalSettings {...test.props} />);
      });
      expect(root).toMatchSnapshot();
    });
  });
});