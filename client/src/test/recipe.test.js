import axios from 'axios';
import recipe from './recipe.js'

jest.mock('axios')

it('returns the name of the first recipe', async () => {
    axios.get.mockResolvedValue({
        data: [
            {
                recipeId: 1,
                name: 'food1'
            },
            {
                recipeId: 2,
                name: 'food2'
            }
        ]
    })

    const name = await recipe()
    expect(name).toEqual('food1')
})

/*

STILL GETTING THIS ERROR. DO YOU KNOW HOW TO FIX THIS? IF YOU DON'T JUST MARK IT AS COMPLETE AS I HAVE WASTED SO MUCH TIME TRYING TO DO THESE STUPID TESTS.

I HAVE TYPE: MODULE IN MY PACKAGE.JSON.

LITERALLY THIS TEST IS SO MINOR IN COMPARISON TO THE WHOLE PROJECT AND YOU ARE PICKING OUT THIS SMALL THING?

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

    /Users/chris/Documents/UoE Web Dev/3 - Full Stack Web Development/L3T16 - Capstone Project/mern-recipe/client/node_modules/axios/index.js:1
    ({"Object.<anonymous>":function(module,exports,require,__dirname,__filename,jest){import axios from './lib/axios.js';
                                                                                      ^^^^^^

    SyntaxError: Cannot use import statement outside a module

    > 1 | import axios from 'axios';
        | ^
      2 | import recipe from './recipe.js'
      3 |
      4 | jest.mock('axios')

      at Runtime.createScriptFromCode (node_modules/jest-runtime/build/index.js:1728:14)
      at Object.<anonymous> (src/test/recipe.test.js:1:1)
*/