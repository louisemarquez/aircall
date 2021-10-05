import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Header.jsx';
import ActivityFeed from '../src/components/activity-feed/activity-feed.component'

const App = () => {
  return (
    <div className='container'>
      <Header/>
      <div className="container-view">
        <ActivityFeed/>
      </div>
    </div>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;