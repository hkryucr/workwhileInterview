import React from 'react';

function Choice(props) {
    let classes = ['choice'];
    if(props.selected){
        classes.push('selected');
    }

    return (
        <div className="choice">
        <button value={props.value} letter={props.letter} className={classes.join(' ')} onClick={props.handleClick}>
            <span className="letter">{props.letter} - </span> {props.choice}
        </button>
        </div>
    );
}

export default Choice;
