import React from "react";
import 'jsdom-global/register';
import {act, create} from "react-test-renderer";
import SelectCrypto from "../SelectCrypto";

describe("Components > CryptoArray > SelectCrypto", () => {
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
                root = create(<SelectCrypto {...test.props} />);
            });
            expect(root).toMatchSnapshot();
        });
    });
});
