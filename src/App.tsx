import React from 'react';

const App: React.FC = () => {
  return (
    <div className="App p-4">
      <h1>Hello, world!</h1>
      <p>
        Welcome to <b>tree.nathanfriend.io!</b>
      </p>
      <p>
        This site is currently under construction. In the meantime, feel free to
        check out the source at{' '}
        <a href="https://gitlab.com/nfriend/tree-online">GitLab</a>!
      </p>
      <a href="https://gitlab.com/nfriend/tree-online/pipelines">
        <img
          src="https://gitlab.com/nfriend/tree-online/badges/master/pipeline.svg"
          alt="GitLab build status"
        />
      </a>
    </div>
  );
};

export default App;
