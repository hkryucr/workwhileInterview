import React from 'react';

function Title(props) {
  return (
      <div className="title">
          Question {props.currentQ} of {props.totalQ}
      </div>
  );
}

export default Title;
