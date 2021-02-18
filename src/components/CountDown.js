import React, { Component } from 'react';
import moment from 'moment';
// we imported moment. moment would be used to update the date
import Controls from './Controls';

class CountDown extends Component {
  state = {
    duration: this.getRemainingTime(),
    paused: false,
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        duration: this.getRemainingTime(),
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getRemainingTime() {
    // future date
    //this variable was set just for buhari's tenure
    let date = '2023-05-29';
    let future = moment(date);
    //end of buhari feature
    //console.log(date, future);
    //current Date
    let now = moment(),
      // the 'moment' is used to give current date.

      //year

      //!!!!!!!!!!!!!!! IMPORTANT  //the year variable was paused coz of the buhari's feature
      //year = moment({ year: now.year() + 1 }),
      //the '.year' keyword is used to get the current year so now.year would give us current date and current year.
      // now.year is supposed to run for 2020 coz thats the current year but the "+1 woould push it over to 2021"

      // differnce
      diff = future.diff(now);
    // the above method/object is supposed to give us the difference between year + 1 (2021 in this case) and current date.

    // because we want to have access to the number of days minutes hours and seconds, we need to convert that result of milliseconds to an actual duration

    // react the duration of the difference
    return moment.duration(diff);
  }

  handlePausedToggle = () => {
    this.setState((prevState, props) => {
      const paused = !prevState.paused;

      if (paused) {
        clearInterval(this.interval);
      } else {
        this.interval = setInterval(() => {
          this.setState({
            duration: this.getRemainingTime(),
          });
        }, 1000);
      }
      return { paused };
    });
  };

  render() {
    const { duration, paused } = this.state;
    return (
      <div>
        <section className='hero is-dark is-bold has-text-centered  is-fullheight'>
          <div className='hero-body'>
            <div className='container'>
              <h1 className='title'>CountDown To Buhari's Handover</h1>

              <div className='section'>
                <nav className='level'>
                  <div className='level-item has-text-centered'>
                    <div>
                      <p className='heading'>Days</p>
                      <p className='title'>{Math.floor(duration.asDays())}</p>
                    </div>
                  </div>
                  <div className='level-item has-text-centered'>
                    <div>
                      <p className='heading'>Hours</p>
                      <p className='title'>
                        {duration.hours().toString().padStart(2, '0')}
                      </p>
                    </div>
                    {/*the padStart() method is used to turn numbers to strings. the 2 in the bracket is to make the string length = to 2 and the 0 would be appended to the supposed string if its less than 2.*/}
                  </div>
                  <div className='level-item has-text-centered'>
                    <div>
                      <p className='heading'>Minutes</p>
                      <p className='title'>
                        {duration.minutes().toString().padStart(2, '0')}
                      </p>
                    </div>
                  </div>
                  <div className='level-item has-text-centered'>
                    <div>
                      <p className='heading'>Seconds</p>
                      <p className='title'>
                        {duration.seconds().toString().padStart(2, '0')}
                      </p>
                    </div>
                  </div>
                </nav>
              </div>
              <Controls
                paused={paused}
                onPausedToggle={this.handlePausedToggle}
              />
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default CountDown;
