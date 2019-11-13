import Choice from './Choice.js'
import React from 'react';

class Choices extends React.Component {
    renderChoice = (i, ranNum)=>{                
        return(
            <Choice 
            value={ranNum}
            letter={i+1} 
            choice={this.props.choices[ranNum]} 
            handleClick={this.props.handleClick}
            selected={this.props.correctAnswer === ranNum}/>
        )
    }
    
    render (){
        const choiceOrder = this.props.choiceOrder;
        return (
            <>        
                {this.renderChoice(0, choiceOrder[0])}
                {this.renderChoice(1, choiceOrder[1])}
                {this.renderChoice(2, choiceOrder[2])}
                {this.renderChoice(3, choiceOrder[3])}
            </>
        );
    }
}

export default Choices;
