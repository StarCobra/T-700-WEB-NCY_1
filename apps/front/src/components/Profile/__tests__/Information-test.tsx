import React from "react";
import { act, create } from "react-test-renderer";
import Information from "../Information";

describe("Components > Profile > Information", () => {
  const tests = [
    {
      description: "generic",
      props: {
        resource: {},
      },
    },
  ];

  tests.forEach((test) => {
    it(`should render the component ${test.description}`, async () => {
      await act(async () => {
        const root = create(<Information {...test.props} />);
        expect(root).toMatchSnapshot();
      });
    });
  });
});
