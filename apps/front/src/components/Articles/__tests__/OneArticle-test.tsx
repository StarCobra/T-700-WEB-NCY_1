import React from "react";
import { act, create } from "react-test-renderer";
import OneArticle from "../OneArticle";

describe("Components > Articles > OneArticle", () => {
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
        root = create(<OneArticle {...test.props} />);
      });
      expect(root).toMatchSnapshot();
    });
  });
});
