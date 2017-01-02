import React from 'react';
import { Link, withRouter } from 'react-router'
import auth from '../utils/auth'

import store from '../store'
import SetLogo from '../../images/set_logo.inline.svg';

//components
import Modal from './Modal'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      loggedIn: auth.loggedIn()
    }
    //const {params, children, loginModalAction, loginModal} = this.props
  }
  componentWillReceiveProps(nextProps) {
    // if we changed routes...
    if ((
      nextProps.location.key !== this.props.location.key &&
      nextProps.location.state &&
      nextProps.location.state.modal
    )) {
      // save the old children (just like animation)
      this.previousChildren = this.props.children
    }
  }
  
  updateAuth(loggedIn) {
    this.setState({
      loggedIn: !!loggedIn
    })
  }

  componentWillMount() {
    auth.onChange = this.updateAuth.bind(this)
    auth.login()
  }

  //show login/resigter modal
  setLoginModal() {
    this.props.router.push('/login')
  }

  render() {
    const { location } = this.props

    const isModal = (
      location.state &&
      location.state.modal &&
      this.previousChildren
    )
    return (
      <div className={`app ${(this.props.params.room && "game")}`}>
          <div className={this.props.params.room ? "logoTransition" : "set_logo"}>
            {this.props.location.pathname !== '/' ? <Link to="/"> <SetLogo className="small_logo"/></Link> : <SetLogo className="logo"/> 
            }
          </div> 
        <div>

          <div>
            {isModal ?
              this.previousChildren :
              this.props.children
            }

            {isModal && (
              <Modal isOpen={true} returnTo={location.state.returnTo}>
                {this.props.children}
              </Modal>
            )}

          </div>
        </div>
      </div>
    )
  }
}

export default App


