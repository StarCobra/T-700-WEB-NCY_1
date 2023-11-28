import React from "react";
import {act, create} from "react-test-renderer";
import LogoSideBar from "../Logo";

describe("Components > CryptoArray > CryptoArrayDisplay", () => {
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
                root = create(<LogoSideBar {...test.props} />);
            });
            expect(root).toMatchSnapshot();
        });
    });
});
