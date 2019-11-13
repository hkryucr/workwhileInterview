import React from 'react';

class Timer extends React.Component {
    render() {
       return (
        <div>
         <h4> Time remaining: {this.props.seconds} seconds</h4>
        </div>
      );
    }
}

export default Timer;
 