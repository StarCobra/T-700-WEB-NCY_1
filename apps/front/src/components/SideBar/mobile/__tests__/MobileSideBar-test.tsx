import React from "react";
import { act, create } from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import Layout from "../MobileSideBar";

describe("Components > SideBar > mobile > MobileSideBar", () => {
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
