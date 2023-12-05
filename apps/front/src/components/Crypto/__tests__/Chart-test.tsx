import React from "react";
import { act, create } from "react-test-renderer";
import Chart from "../Chart";

describe("Components > Crypto > Chart", () => {
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
        root = create(<Chart {...test.props} />);
      });
      expect(root).toMatchSnapshot();
    });
  });
});
