import React from "react";
import { act, create } from "react-test-renderer";
import Component from "../Layout";

describe("Components > GlobalSetting > Layout", () => {
  const tests = [
    {
      description: "default props",
      props: {},
    },
  ];
  tests.forEach((test) => {
    it(`should render the component ${test.description}`, async () => {
      let root;

      await act(async () => {
        root = create(<Component {...test.props} />);
      });

      expect(root).toMatchSnapshot();
    });
  });
});
