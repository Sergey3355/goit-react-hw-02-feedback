import React, { Component } from 'react';

import Container from './Container';
import Section from './Section/Section';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Statistics from './Statistics/Statistics';
import Notification from './Notification/Notification';

export default class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  onLeaveFeedback = even => {
    this.setState(prevState => {
      return {
        [even]: prevState[even] + 1,
      };
    });
  };

  countTotalFeedback() {
    const { good, neutral, bad } = this.state;
    let result = good + neutral + bad;
    return result;
  }

  countPositiveFeedbackPercentage() {
    const { good } = this.state;
    const result = this.countTotalFeedback();
    const parcentage = (good * 100) / result;
    return Math.round(parcentage);
  }

  render() {
    const { good, neutral, bad } = this.state;
    const total = this.countTotalFeedback();
    const parcentage = this.countPositiveFeedbackPercentage();
    return (
      <Container>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={Object.keys(this.state)}
            onLeaveFeedback={this.onLeaveFeedback}
          />
        </Section>
        <Section title="Statistics">
          {this.countTotalFeedback() ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={total}
              positivePercentage={parcentage}
            ></Statistics>
          ) : (
            <Notification messege="There is no feedback" />
          )}
        </Section>
      </Container>
    );
  }
}
