import React from "react";
import { act, create } from "react-test-renderer";
import FullArticleDisplay from "../FullArticleDisplay";

describe("Components > FullArticle > FullArticleDisplay", () => {
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
        root = create(<FullArticleDisplay {...test.props} />);
      });
      expect(root).toMatchSnapshot();
    });
  });
});
