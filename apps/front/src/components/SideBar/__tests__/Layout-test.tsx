import React from "react";
import { act, create } from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import Layout from "../Layout";

describe("Components > SideBar > Layout", () => {
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
            <Layout {...test.props} />
          </MemoryRouter>,
        );
      });
      expect(root).toMatchSnapshot();
    });
  });
});
