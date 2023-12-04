import React from "react";
import { act, create } from "react-test-renderer";
import CryptoChart from "../CryptoChart";

describe("Components > CryptoChart > CryptoChart", () => {
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
        root = create(<CryptoChart {...test.props} />);
      });
      expect(root).toMatchSnapshot();
    });
  });
});
