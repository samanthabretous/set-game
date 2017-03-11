import React, { Component, PropTypes } from 'react';
import GSAP from 'react-gsap-enhancer';
import auth from '../utils/auth';

class LoginModal extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.switchPath = this.switchPath.bind(this);
  }
  componentDidMount() {
    this.switchAnim = this.addAnimation(switchAnim);
  }

  componentDidUpdate() {
    this.switchAnim.tweenTo(this.getCurrentPage());
  }

  getCurrentPage() {
    return this.props.location.pathname.indexOf('register') === -1
      ? 'login'
      : 'register';
  }

  handleChange(event) {
    const { loginFormErrors, loginErrorAction, formUsernameAction, formEmailAction, formPasswordAction, username, email, password, loginFormErrorsAction } = this.props;

    const whichTarget = () => {
      switch (event.target.name) {
        case 'username':
          formUsernameAction(event.target.value);
          break;
        case 'email':
          formEmailAction(event.target.value);
          break;
        case 'password':
          formPasswordAction(event.target.value);
          break;
        default:
          break;
      }
    };

    if (loginFormErrors[event.target.name]) {
      const errors = Object.assign({}, loginFormErrors);
      delete errors[event.target.name];
      whichTarget();
      loginFormErrorsAction(errors);
    } else {
      whichTarget();
    }
  }

  handleSubmit() {
    const { username, email, password,loginFormErrorsAction, loginLoadingAction, loginErrorAction, router, location } = this.props;

    const isRegistered = this.getCurrentPage() === 'login';
    // form validation
    const errors = {};
    if (username === '') errors.username = 'Can not be empty';
    if (!isRegistered) {
      if (email.indexOf('@') === -1 && email.indexOf('.' === -1)) errors.email = 'Must be a vaild email';
    }
    if (password.length < 6) errors.password = 'Password must be at least 6 characters long';
    loginFormErrorsAction(errors);

    // before sending form request to back end check to make sure there are no errors
    const isValid = Object.keys(errors).length === 0;
    if (isValid) {
      // display loading signal
      loginLoadingAction(true);
      // confirm create login info and send user to next page
      auth.login(isRegistered, username, email, password, (loggedIn) => {
        if (!loggedIn) {
          return loginErrorAction(true);
        }

        if (location.state && location.state.nextPathname) {

          // if(location.state.nextPathname === '/play'){

          // } else {
            /* trying to access an authorized page after login
            * it will redirect to the give path or go back to home
            */
            router.replace(location.state.nextPathname);
          // }
        } else {
          router.replace('/play');
        }
      });
    }
  }

  switchPath() {
    const pathTo =
      `/${this.getCurrentPage() === 'register' ? 'login' : 'register'}`;
    this.props.router.replace({
      pathname: pathTo,
      state: { modal: true},
    });
  }
  showPlay() {
    this.props.router.replace({
      pathname: '/play',
      state: { modal: true },
    });
  }
  renderInput(type, variable) {
    const { loginFormErrors, username, email, password } = this.props;
    return (
      <div className={`input ${!!loginFormErrors[variable] ? 'error' : ''}`}>
        <label htmlFor={`${type}`}></label>
        <input
          id={type}
          type={type === 'password' ? 'password' : 'text'}
          onChange={this.handleChange}
          name={`${type}`}
          value={variable}
          placeholder={`Enter ${type}`}
        />
        <span>{loginFormErrors[variable]}</span>
      </div>
    );
  }

  render() {
    const { username, email, password, loading, isRegistered } = this.props;

    return (
      <div className="materialContainer">
        <div className="box">
          <div className="title">LOGIN</div>
          {this.renderInput('username', username)}
          {this.renderInput('password')}
          <div className="button login">
            <button onClick={this.handleSubmit}>
              <span>GO</span><i className="fa fa-check" />
            </button>
          </div>
          <a href="" className="pass-forgot">Forgot your password?</a>
        </div>

        <div className="overbox">
          <div onClick={this.switchPath}>
            <div name="switch" className="material-button alt-2">
              <span className="shape" />
            </div>
          </div>
          <div className="register-content">
            <div className="title">REGISTER</div>
            {this.renderInput('username', username)}
            {this.renderInput('email', email)}
            {this.renderInput('password', password)}
            <div className="button">
              <button onClick={this.handleSubmit}><span>NEXT</span></button>
            </div>
          </div>
        </div>
        <div className="play">
          <button style={{ backgroundColor: 'red' }} className="playBtn" onClick={this.showPlay} />
        Play
       </div>

      </div>
    );
  }
}

LoginModal.propTypes = {
  location: PropTypes.object.isRequired,
};

export default GSAP(LoginModal);

const switchAnim = ({ target }) => {
  const shape = target.find({ className: 'shape' });
  const box = target.find({ className: 'box' });
  const registerContent = target
     .find({ className: 'register-content' })
     .findAllInChildren();
  const switchButton = target.find({ name: 'switch' });
  const playBtn = target.find({ className: 'playBtn' });
  return new TimelineMax()
    .pause()
    .add('login')
    .to(switchButton, 0.3, {
      left: '160px',
      top: '160px',
      ease: Sine.easeInOut,
    }, 'login')
    .add('middle')
    .to(switchButton, 0.4, {
      left: '0px',
      width: '100%',
      height: '100%',
      top: '0',
      borderRadius: '10px',
      ease: Sine.easeInOut,
    })
    .to(box, 0.4, {
      scale: 0.94,
      y: '-=29',
      ease: Sine.easeInOut,
    }, 'middle')
    .staggerFromTo(registerContent, 0.32, { scale: 0.95 }, {scale: 1, autoAlpha: 1 }, 0.032)
    .to(shape, 0.55, {
      xPercent: 43,
      yPercent: -43,
      rotation: 45,
      ease: Sine.easeInOut,
    }, 'middle')
    .add('register');
};
