import React from "react";
import { act, create } from "react-test-renderer";
import Component from "../Layout";

describe("Components > Profile > Layout", () => {
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
        root = create(<Component {...test.props} />);
      });

      expect(root).toMatchSnapshot();
    });
  });
});
