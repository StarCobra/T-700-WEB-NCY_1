import React from "react";
import "jsdom-global/register";
import { act, create } from "react-test-renderer";
import KeywordFilter from "../KeywordFilter";

describe("Components > ArticleThumbnails > KeywordFilter", () => {
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
        root = create(<KeywordFilter {...test.props} />);
      });
      expect(root).toMatchSnapshot();
    });
  });
});
