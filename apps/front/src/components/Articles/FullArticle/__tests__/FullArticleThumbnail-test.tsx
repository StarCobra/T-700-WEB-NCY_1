import React from "react";
import { act, create } from "react-test-renderer";
import FullArticleThumbnail from "../FullArticleThumbnail";

describe("Components > FullArticle > FullArticleThumbnail", () => {
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
        root = create(<FullArticleThumbnail {...test.props} />);
      });
      expect(root).toMatchSnapshot();
    });
  });
});
