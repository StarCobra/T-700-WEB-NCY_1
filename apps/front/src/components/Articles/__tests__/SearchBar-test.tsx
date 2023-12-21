import React from "react";
import { act, create } from "react-test-renderer";
import SearchBar from "../SearchBar";

describe("Components > Articles > SearchBar", () => {
  const tests = [
    {
      description: "without props",
      props: {},
    }
  ];
  tests.forEach((test) => {
    it(`should render the component ${test.description}`, async () => {
      let root;
      await act(async () => {
        root = create(<SearchBar {...test.props} />);
      });
      expect(root).toMatchSnapshot();
    });
  });
});
