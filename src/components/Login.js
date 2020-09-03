import React, {Component} from 'react';
import './Login.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {signIn} from '../actions/authActions';
import {Redirect} from 'react-router-dom';
class Login extends Component{

    state = {
        email: '',
        password: ''
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.props.signIn(this.state);
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
     

    render() {
        const {authError, auth} = this.props;
        if(auth.uid) return <Redirect to="/"></Redirect>
        return (<div className="login">
            <Link to="/">
                <img
                className="login__logo"
                src="https://raw.githubusercontent.com/xemacscode/snippex/master/src/images/logo.png" 
                alt="" />
            </Link>
            <div className="login__container">
                <h1>Sign In</h1>
                <form onSubmit={this.handleSubmit}>
                    <h5>E-mail</h5>
                    <input id="email"  onChange={this.handleChange}  type="email" />
                    <h5>Password</h5>
                    <input id="password"  onChange={this.handleChange} type="password" />
                    <button type="submit" className="login__signInButton">Sign In</button>
                </form>  
                {/* <p>You can also log in with any of these services</p> */}
                <p></p>
          <button className="btn btn-danger mr-2" type="button">
            Sign in with Google
          </button>
          {/* <button className="btn btn-secondary" type="button" onClick={githubSignIn}>
            Sign in with GitHub
          </button> */}
          <hr />              
                <Link to="/signup">
                    <button className="login__registerButton">Create your Snippex Account</button>
                </Link>

            </div>
        </div>
        )
        }    
}



const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
