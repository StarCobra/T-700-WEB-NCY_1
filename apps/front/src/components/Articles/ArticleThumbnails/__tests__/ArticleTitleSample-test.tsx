import React from "react";
import { act, create } from "react-test-renderer";
import ArticleTitleSample from "../ArticleTitleSample";

describe("Components > ArticleThumbnails > ArticleTitleSample", () => {
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
        root = create(<ArticleTitleSample {...test.props} />);
      });
      expect(root).toMatchSnapshot();
    });
  });
});
