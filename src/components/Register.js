import React, {Component} from 'react';
import '../styles/Register.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {signUp} from '../actions/authActions';
import {Redirect} from 'react-router-dom';
class Register extends Component {



    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.props.signUp(this.state);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }


    render () 
        {
        const {authError, auth} = this.props;    
        if(auth.uid) return <Redirect to="/"></Redirect>
        return(<div className="login">
            <Link to="/">
                <img
                className="login__logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png" 
                alt="" />
            </Link>
            <div className="login__container">
                <h1>Sign Up</h1>
                <div className="red-text center">
                        {authError ? <p>{authError}</p> : null}
                </div>
                <form onSubmit={this.handleSubmit}>
                    <h5>First Name</h5>                    
                    <input id="firstname" onChange={this.handleChange}  type="text" />
                    <h5>Last Name</h5>      
                    <input id="lastname" onChange={this.handleChange}  type="text" />
                    <h5>E-mail</h5>
                    <input id="email"  onChange={this.handleChange}  type="email" />
                    <h5>Password</h5>
                    <input id="password"  onChange={this.handleChange} type="password" />
                    <button type="submit" className="login__signInButton">Sign Up</button>
                </form>
                <p>
                    By signing-in you agree to DORSU's Terms and Conditions.
                </p>
                <p>
                    Already have an account?  <Link to="/login"><button className="login__registerButton">Login</button></Link>
                </p>
                

            </div>
        </div>
        )
        }
    
}

const mapStateToProps = (state) => {
    return {        
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Register)

