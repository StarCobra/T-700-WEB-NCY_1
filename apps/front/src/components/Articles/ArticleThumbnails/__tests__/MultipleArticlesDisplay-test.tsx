import React from "react";
import { act, create } from "react-test-renderer";
import MultipleArticlesDisplay from "../MultipleArticlesDisplay";

describe("Components > ArticleThumbnails > MultipleArticlesDisplay", () => {
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
        root = create(<MultipleArticlesDisplay {...test.props} />);
      });
      expect(root).toMatchSnapshot();
    });
  });
});
