import React from "react";
import { act, create } from "react-test-renderer";
import Component from "../Content";

describe("Components > Content", () => {
  const tests = [
    {
      description: "without props",
      props: {},
    },
    {
      description: "with type unique",
      props: {
        label: "Lorem Ipsum",
        options: [
          { value: "BTC", label: "Bitcoin" },
          { value: "ETH", label: "Ethereum" },
          { value: "LTC", label: "Litecoin" },
        ],
      },
    },
    {
      description: "with type multiple",
      props: {
        label: "Lorem Ipsum",
        type: "multiple",
        options: [
          { value: "BTC", label: "Bitcoin" },
          { value: "ETH", label: "Ethereum" },
          { value: "LTC", label: "Litecoin" },
        ],
      },
    },
  ];
  tests.forEach((test) => {
    it(`should render the component ${test.description}`, async () => {
      let root;

      await act(async () => {
        root = create(<Component {...test.props} />);
      });

      expect(root).toMatchSnapshot();
    });
  });
});
