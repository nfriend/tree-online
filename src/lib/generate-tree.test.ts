import { generateTree } from './generate-tree';
import { mockInput } from './mock-input';
import { parseInput } from './parse-input';

describe('generateTree', () => {
  it('returns an UTF-8 representation of the provided FileStructure object', () => {
    const actual = generateTree(parseInput(mockInput));

    const expected = `
.
├── my-app
│   ├── src
│   │   ├── index.html
│   │   ├── main.ts
│   │   └── main.scss
│   ├── build
│   │   ├── index.html
│   │   ├── main.js
│   │   └── main.css
│   ├── .prettierrc.json
│   ├── .gitlab-ci.yml
│   └── README.md
└── empty dir

    `.trim();

    expect(actual).toEqual(expected);
  });

  it('returns an ASCII representation of the provided FileStructure object', () => {
    const actual = generateTree(parseInput(mockInput), { charset: 'ascii' });

    const expected = `
.
|-- my-app
|   |-- src
|   |   |-- index.html
|   |   |-- main.ts
|   |   \`-- main.scss
|   |-- build
|   |   |-- index.html
|   |   |-- main.js
|   |   \`-- main.css
|   |-- .prettierrc.json
|   |-- .gitlab-ci.yml
|   \`-- README.md
\`-- empty dir

    `.trim();

    expect(actual).toEqual(expected);
  });

  it('does not render lines for parent directories that have already printed all of their children', () => {
    const input = `

grandparent
  parent
    child
  parent
    child
      grandchild

    `;

    const actual = generateTree(parseInput(input));

    const expected = `
.
└── grandparent
    ├── parent
    │   └── child
    └── parent
        └── child
            └── grandchild

        `.trim();

    expect(actual).toEqual(expected);
  });
});
