import React from "react";
import { act, create } from "react-test-renderer";
import ArticleSampleContent from "../ArticleSampleContent";

describe("Components > ArticleThumbnails > ArticleSampleContent", () => {
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
        root = create(<ArticleSampleContent {...test.props} />);
      });
      expect(root).toMatchSnapshot();
    });
  });
});
