import React from 'react';

import './activity-detail.styles.css';  
import inbound from '../../resources/images/inbound.svg';
import outbound from '../../resources/images/outbound.svg';


export default class Activity extends React.Component {

  formatDate(date) {
    var localDate = new Date(date);
      return localDate.toDateString().split(' ').slice(1).join(' ');
    }

  formatTime(time) {
      var localTime = new Date(time);
        return localTime.toLocaleTimeString().replace(/(.*)\D\d+/, '$1');
      }

  callType(type) {
        if (type === "missed") {
          return " Tried to call ";
      }
      else if (type === "answered") {
          return " called ";
      }
      return " Sent to voicemail by ";
    }

    archiveCall() {
      this.props.archive(this.props.id);
     }
    
  render () {
    const { created_at, direction, from, to, call_type } = this.props

      const type = this.callType(call_type);
      const date = this.formatDate(created_at);
      const time = this.formatTime(created_at);
      const caller = from ? from : "No Caller ID";
      const called = to ? to : "No Caller ID";
      const dir = direction === "inbound" ? inbound : outbound;

    return (
  
  <div className='activity-container'>

    <div className='date-container'>
      <p className = 'date'>{date} </p>
      <p className = 'time'>{time} </p>
    </div>

     <button type="button" className="archive-call" id="archive-call"
     onClick={this.archiveCall.bind(this)}
     
     >Archive</button>
    <div className='call-container'>
    
      <div className='icon-container'>
      <img className="icon" alt="call source" src={dir}/> 
      </div>
   
        <div className='caller-container'>
          <b>{caller}</b>
          <br/> {type + called}
        </div>
       
        
    </div>
    
    
    
  </div>
);
  }
}

