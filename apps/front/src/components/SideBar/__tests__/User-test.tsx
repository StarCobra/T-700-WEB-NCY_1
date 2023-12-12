import React from "react";
import { act, create } from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import User from "../User";

describe("Components > SideBar > User", () => {
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
            <User {...test.props} />
          </MemoryRouter>,
        );
      });
      expect(root).toMatchSnapshot();
    });
  });
});
