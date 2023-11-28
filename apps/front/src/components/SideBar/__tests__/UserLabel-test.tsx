import React from "react";
import {act, create} from "react-test-renderer";
import UserLabel from "../UserLabel";

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
                root = create(<UserLabel {...test.props} />);
            });
            expect(root).toMatchSnapshot();
        });
    });
});
