import React from "react";
import { act, create } from "react-test-renderer";
import OneArticleSample from "../OneArticleSample";

describe("Components > ArticleThumbnails > OneArticleSample", () => {
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
        root = create(<OneArticleSample {...test.props} />);
      });
      expect(root).toMatchSnapshot();
    });
  });
});
