import React from "react";
import { act, create } from "react-test-renderer";
import Array from "../Array";

describe("Components > Crypto > Array", () => {
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
        root = create(<Array {...test.props} />);
      });
      expect(root).toMatchSnapshot();
    });
  });
});
