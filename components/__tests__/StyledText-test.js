import React from "react";
import renderer from "react-test-renderer";

import { MonoText } from "../Text";

it(`renders correctly`, () => {
  const tree = renderer.create(<MonoText>Snapshot test!</MonoText>).toJSON();

  expect(tree).toMatchSnapshot();
});
