import React from "react";
import { act, create } from "react-test-renderer";
import Component from "../OneArticle";
import { MemoryRouter } from "react-router-dom";

describe("Components > Articles > OneArticle", () => {
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
        root = create(
          <MemoryRouter>
            <Component {...test.props} />
          </MemoryRouter>,
        );
      });

      expect(root).toMatchSnapshot();
    });
  });
});
