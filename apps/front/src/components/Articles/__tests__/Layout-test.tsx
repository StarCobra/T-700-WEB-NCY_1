import React from "react";
import { act, create } from "react-test-renderer";
import Layout from "../Layout";

describe("Components > Articles > Layout", () => {
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
        root = create(<Layout {...test.props} />);
      });
      expect(root).toMatchSnapshot();
    });
  });
});
