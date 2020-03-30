import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileAction';

class Navbar extends Component {

    onLogoutClick = (e) => {
        e.preventDefault();
        this.props.clearCurrentProfile();
        this.props.logoutUser(this.props.history);
    }

    render(){

        const { isAuthenticated , user} = this.props.auth;

        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a href="#" onClick={this.onLogoutClick.bind(this)} className="nav-link">
                        <img className="rounded-circle" src={user.avatar} alt={user.name} 
                        style={{ width: '25px', marginRight: '10px' }} 
                        title="You mush have a Gravatar connected to your email to display an image" />
                        ログアウト
                    </a>
                </li>
            </ul>
        )

        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">サインアップ</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="login">ログインする</Link>
                </li>
            </ul>
        )

        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                <Link className="navbar-brand" to="/">ソーシャルネットワーク</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                    <span className="navbar-toggler-icon"></span>
                </button>
    
                <div className="collapse navbar-collapse" id="mobile-nav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/profiles"> すべての開発者
                            </Link>
                        </li>
                    </ul>
                    { isAuthenticated ? authLinks : guestLinks }
                </div>
                </div>
            </nav>
        )
    }
}

Navbar.propsTypes = {
    logoutUser: PropTypes.func.isRequired,
    clearCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile }) (withRouter(Navbar));