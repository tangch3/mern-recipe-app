import React from 'react';
import Pagefortesting from '../pages/pagefortesting.js';
import renderer from 'react-test-renderer';

/*
 * To perform a snapshot test, we will construct a tree variable that contains the DOM tree of the rendered component <App /> which is in JSON format.
 * expect(tree).toMatchSnapshot() will create a snapshot of which will be saved.
 * In order to return a JSON object of the rendered DOM tree as a snapshot, the .toJSON() method is used.
 */

test('Renders without crashing?', () => {
  const tree = renderer.create(<Pagefortesting />).toJSON();
  expect(tree).toMatchSnapshot();
});