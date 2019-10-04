import React, { PureComponent } from "react";
import Button from '@material-ui/core/Button';

export default class Question extends PureComponent {
  constructor() {
    super();

    this.state = { animate: false, selected: false };
  }
  select = index => {
    if (this.props.index === -1) {
      this.props.select(index);
      this.setState({ animate: true, selected: true });
      setTimeout(this.animate, 1000);
    }
  };

  animate = () => {
    this.setState({ animate: false });
    this.reset();
  };

  reset = () => {
      const add = this.props.index === this.props.obj.correctAnswerIndex;
      this.setState({ selected: true }, () => {
        this.props.onChange(add);
      })
      
  }

  render() {
    const { props } = this;

    const errorColor = "#FF0000";
    const correctColor = "#00FF00";
    const chosenColor = "#0000FF";

    const getColor = (index) => {
      

      if (this.state.animate) {
        if (index === this.props.index) {
          return chosenColor;
        }
        return "";
      }

      if (this.props.index !== -1) {
        if (index === this.props.obj.correctAnswerIndex) {
            return correctColor;
        }

        if (index === this.props.index) {
            return errorColor;
        }
      }
    }

    return (
      <React.Fragment>
        <div className="question" style={{fontSize: 20}}>
          <h2 className="title">{props.obj.questionTitle}</h2>
          {props.obj.questionContent}
        </div>


        <div>

        {props.children}
      
        <div className="answers">
          <Button
            style={{ backgroundColor: getColor(0) }}
            onClick={() => this.select(0)}
          >
            {props.obj.answerOne}
          </Button>
          <Button
            style={{ backgroundColor: getColor(1) }}
            onClick={() => this.select(1)}
          >
            {props.obj.answerTwo}
          </Button>
          <Button
            style={{ backgroundColor: getColor(2) }}
            onClick={() => this.select(2)}
          >
            {props.obj.answerThree}
          </Button>
          <Button
            style={{ backgroundColor: getColor(3) }}
            onClick={() => this.select(3)}
          >
            {props.obj.answerFour}
          </Button>
        </div>
        </div>
      </React.Fragment>
    );
  }
}
