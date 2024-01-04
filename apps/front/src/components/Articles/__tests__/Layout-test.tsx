// Layout.test.js

import React from "react";
import { act, create } from "react-test-renderer";
import Layout from "../Layout";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../Select", () => {
  return jest.fn(({ options, handleChange }) => (
    <select onChange={(e) => handleChange(e.target.value)}>
      {options.map((option: any) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  ));
});

describe("Components > Articles > Layout", () => {
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
