import React from "react";
import { act, create } from "react-test-renderer";
import NewCryptoModal from "../NewCryptoModal";

describe("Components > Admin > GlobalSettingFormModals > NewCryptoModal", () => {
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
        root = create(<NewCryptoModal {...test.props} />);
      });
      expect(root).toMatchSnapshot();
    });
  });
});