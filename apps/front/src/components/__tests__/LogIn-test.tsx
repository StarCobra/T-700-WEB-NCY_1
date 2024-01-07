import React from "react";
import { act, create } from "react-test-renderer";
import Component from "../LogIn";
import { MemoryRouter } from "react-router-dom";

describe("Components > LogIn", () => {
  const tests = [
    {
      description: "default props",
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
            </MemoryRouter>);
      });

      expect(root).toMatchSnapshot();
    });
  });
});
