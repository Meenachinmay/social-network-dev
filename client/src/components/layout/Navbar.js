import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

class Navbar extends Component {

    onLogoutClick = (e) => {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render(){

        const { isAuthenticated , user} = this.props.auth;

        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a href="#" onClick={this.onLogoutClick.bind(this)} className="nav-link">
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
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser }) (withRouter(Navbar));