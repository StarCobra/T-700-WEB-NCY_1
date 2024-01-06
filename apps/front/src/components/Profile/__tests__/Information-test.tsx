import React from "react";
import { act, create } from "react-test-renderer";
import Component from "../Information";

describe("Components > Profile > Information", () => {
  const tests = [
    {
      description: "generic",
      props: {
        resource: {},
      },
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
