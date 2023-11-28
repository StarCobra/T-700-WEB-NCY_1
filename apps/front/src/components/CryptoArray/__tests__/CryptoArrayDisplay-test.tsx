import React from "react";
import 'jsdom-global/register';
import {act, create} from "react-test-renderer";
import CryptoArrayDisplay from "../CryptoArrayDisplay";

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
                root = create(<CryptoArrayDisplay {...test.props} />);
            });
            expect(root).toMatchSnapshot();
        });
    });
});
