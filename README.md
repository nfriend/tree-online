# `tree`, but online

🌲 Make fancy trees with Unicode box drawing characters \
🔀 Forked from [nfriend/tree-online] (officially [gitlab:nfriend/tree-online])

<div align="center">

![](https://i.imgur.com/KBoCEyo.png)

</div>

🐙 Use on GitHub repos \
🗺️ Use on websites with `sitemap.xml` \
📄 Use Markdown-like list syntax \
🔠 Also Supports ASCII mode

It's common to explain or discuss a file system structure on text-based sites
like [StackOverflow] or [GitHub], but generating a nice-looking diagram gets
pretty tedious. This tool takes care of the heavy lifting; all you need to do is
indent your tree, and we take care of the rest.

## Usage

Head over to [jcbhmr.github.io/tree] to get started!

<div align="center">

![](https://placekitten.com/400/300)

</div>

### Example

The gist of the app is that it takes input that looks like a nested Markdown
list (or just indented) and transforms it into a fancy tree using Unicode box
drawing characters.

```
docs
  code-of-conduct.md
  contributing.md
  known-issues.md
  markdown.md
  process-promise.md
  quotes.md
examples
  background-process.mjs
  backup-github.mjs
  interactive.mjs
  parallel.mjs
```

```
.
├── docs/
│   ├── code-of-conduct.md
│   ├── contributing.md
│   ├── known-issues.md
│   ├── markdown.md
│   ├── process-promise.md
│   └── quotes.md
└── examples/
    ├── background-process.mjs
    ├── backup-github.mjs
    ├── interactive.mjs
    └── parallel.mjs
```

## Development

This project uses Next.js to construct the React-based UI. This is then
statically rendered to plain old HTML files that are then deployed to GitHub
Pages.

TODO: Add list of tech used

If you'd like to get started, all you need to do is open this project in [GitHub
Codespaces] and run `npm start` in your terminal. This will spin up a preview
site where you can play around with the code and see what happens.

<!-- prettier-ignore-start -->
[nfriend/tree-online]: https://github.com/nfriend/tree-online#readme
[gitlab:nfriend/tree-online]: https://gitlab.com/nfriend/tree-online#treenathanfriendio
<!-- prettier-ignore-end -->
