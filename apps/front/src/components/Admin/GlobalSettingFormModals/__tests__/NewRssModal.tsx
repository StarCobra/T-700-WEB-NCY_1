import React from "react";
import { act, create } from "react-test-renderer";
import NewRssModal from "../NewRssModal";

describe("Components > Admin > GlobalSettingFormModals > NewRssModal", () => {
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
        root = create(<NewRssModal {...test.props} />);
      });
      expect(root).toMatchSnapshot();
    });
  });
});