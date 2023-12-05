import React from "react";
import { act, create } from "react-test-renderer";
import ArticleContent from "../ArticleContent";

describe("Components > Articles > Details > ArticleContent", () => {
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
        root = create(<ArticleContent {...test.props} />);
      });
      expect(root).toMatchSnapshot();
    });
  });
});
