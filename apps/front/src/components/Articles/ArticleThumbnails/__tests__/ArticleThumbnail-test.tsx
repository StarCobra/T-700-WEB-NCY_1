import React from "react";
import { act, create } from "react-test-renderer";
import ArticleThumbnail from "../ArticleThumbnail";

describe("Components > ArticleThumbnails > ArticleThumbnail", () => {
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
        root = create(<ArticleThumbnail {...test.props} />);
      });
      expect(root).toMatchSnapshot();
    });
  });
});
