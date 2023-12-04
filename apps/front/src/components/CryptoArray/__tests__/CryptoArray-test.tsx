import React from "react";
import { act, create } from "react-test-renderer";
import CryptoArray from "../CryptoArray";

describe("Components > CryptoArray > CryptoArray", () => {
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
        root = create(<CryptoArray {...test.props} />);
      });
      expect(root).toMatchSnapshot();
    });
  });
});
