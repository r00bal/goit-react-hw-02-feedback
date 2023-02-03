import { Component } from 'react';
import { Statistics } from './Statistics/Statistics';
import { Section } from './Section/Section';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Notification } from './Notification/Notification';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  countTotalFeedback = () => {
    return this.state.bad + this.state.good + this.state.neutral;
  };

  countPositivePercentage = () => {
    return Math.round((this.state.good / this.countTotalFeedback()) * 100);
  };

  increaseFeedback = event => {
    const { name } = event.target;
    this.setState(state => ({ [name]: state[name] + 1 }));
  };

  render() {
    const { good, neutral, bad } = this.state;
    const total = this.countTotalFeedback;
    const positivePercentage = this.countPositivePercentage;
    return (
      <>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={this.state}
            onLeaveFeedback={this.increaseFeedback}
          />
          <h2>Statistics</h2>
          {total() === 0 ? (
            <Notification message="There is no feedback" />
          ) : (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={total()}
              positivePercentage={positivePercentage()}
            />
          )}
        </Section>
      </>
    );
  }
}
