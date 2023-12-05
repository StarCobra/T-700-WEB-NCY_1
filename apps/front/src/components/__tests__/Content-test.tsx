import React from "react";
import { act, create } from "react-test-renderer";
import Content from "../Content";

describe("Components > Content", () => {
  const tests = [
    {
      description: "without props",
      props: {},
    },
    {
      description: "with title",
      props: { title: "Beautiful title" },
    },
    {
      description: "with content",
      props: { content: "Content Lorem Ipsum" },
    },
    {
      description: "with title and content",
      props: { title: "Beautiful title", content: "Content Lorem Ipsum" },
    },
  ];
  tests.forEach((test) => {
    it(`should render the component ${test.description}`, async () => {
      let root;
      await act(async () => {
        root = create(<Content {...test.props} />);
      });
      expect(root).toMatchSnapshot();
    });
  });
});
