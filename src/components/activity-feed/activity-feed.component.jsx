import React from 'react';

import Activity  from '../activity-detail/activity-detail.component'

import './activity-feed.styles.css';

export default class ActivityFeed extends React.Component {

  constructor() {
    super();
    this.state = {
        calls: []
    };
}

componentDidMount() {
  this.fetchCalls();
}

fetchCalls() {
  fetch('https://aircall-job.herokuapp.com/activities')
    .then(response => response.json())
    .then(activities => this.setState({ calls: activities }))
}

archiveCall(id) {
  fetch(`https://aircall-job.herokuapp.com/activities/${id}`, {
  method: "POST",
   headers: {
     'Accept' : 'application/json',
     "Content-Type": "application/json"
   },

   body: JSON.stringify({
     is_archived: true
   })
   
 }).then(this.fetchCalls.bind(this));
  
 }

archiveAll() {
  for (var i = 0; i < this.state.calls.length; i++) {
      this.archiveCall(this.state.calls[i].id);
  }
}

resetAll() {
  fetch('https://aircall-job.herokuapp.com/reset', {
      method: 'GET'
  }).then(this.fetchCalls.bind(this));
}

 


render() {

  const calls = [];
  for (var i = 0; i < this.state.calls.length; i++) {
      const { is_archived } = this.state.calls[i];
      if (!is_archived) {
        calls.push(this.state.calls[i]);
      
      }
    }

const ActivityComponent = calls.map((call) => {
  return <Activity key={call.id} archive={this.archiveCall.bind(this)} {...call}/>
      
});


  return (
      <div className ='activity-feed'>
          
              <button  className="archive-button" onClick={this.archiveAll.bind(this)}>
                  Archive all calls
              </button>

              <button className="archive-button" onClick={this.resetAll.bind(this)}>
                  Unarchive all calls
              </button>
          
          <ul className="activities">{ActivityComponent}</ul>
      </div>
  );
}
}




