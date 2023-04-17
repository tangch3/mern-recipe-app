import React from 'react';
import App from '../App.js'
import renderer from 'react-test-renderer'

test('renders correctly', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot()
})

/*
Test suite failed to run

    Jest encountered an unexpected token

    Jest failed to parse a file. This happens e.g. when your code or its dependencies use non-standard JavaScript syntax, or when Jest is not configured to support such syntax.

    Out of the box Jest supports Babel, which will be used to transform your files into valid JS based on your Babel configuration.

    By default "node_modules" folder is ignored by transformers.

    Here's what you can do:
     • If you are trying to use ECMAScript Modules, see https://jestjs.io/docs/ecmascript-modules for how to enable it.
     • If you are trying to use TypeScript, see https://jestjs.io/docs/getting-started#using-typescript
     • To have some of your "node_modules" files transformed, you can specify a custom "transformIgnorePatterns" in your config.
     • If you need a custom transformation specify a "transform" option in your config.
     • If you simply want to mock your non-JS modules (e.g. binary assets) you can stub them out with the "moduleNameMapper" config option.

    You'll find more details and examples of these config options in the docs:
    https://jestjs.io/docs/configuration
    For information about custom transformations, see:
    https://jestjs.io/docs/code-transformation

    Details:

    /Users/chris/Documents/UoE Web Dev/3 - Full Stack Web Development/L3T16 - Capstone Project/mern-recipe/client/src/App.css:1
    ({"Object.<anonymous>":function(module,exports,require,__dirname,__filename,jest){.App {
                                                                                      ^

    SyntaxError: Unexpected token '.'

    > 1 | import './App.css';
        | ^
      2 | import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
      3 | import { Home } from './pages/home.js';
      4 | import { Auth } from './pages/auth.js';

      at Runtime.createScriptFromCode (node_modules/jest-runtime/build/index.js:1728:14)
      at Object.<anonymous> (src/App.js:1:1)
      at Object.<anonymous> (src/test/App.test.js:2:1)
      at TestScheduler.scheduleTests (node_modules/@jest/core/build/TestScheduler.js:333:13)
      at runJest (node_modules/@jest/core/build/runJest.js:404:19)
      at _run10000 (node_modules/@jest/core/build/cli/index.js:320:7)
      at runCLI (node_modules/@jest/core/build/cli/index.js:173:3)

Test Suites: 1 failed, 1 total
Tests:       0 total
Snapshots:   0 total
Time:        0.359 s


I have spent 10 hours trying to work this out. I don't know what is going on. If you cannot tell me, then you might as well mark it as complete and I have written out the exact same test as Level 2 Task 17.


*/