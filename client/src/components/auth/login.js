import React, { Component } from 'react';

import axios from 'axios';

import classnames from 'classnames';

class Login extends Component{ 

    constructor(){
        super();

        this.state = {
            email: '',
            password: '',
            errors: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState({[ e.target.name ]: e.target.value })
    }

    onSubmit(e){
        e.preventDefault();

        const loggedInUser = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post('/api/users/login', loggedInUser)
            .then(response => console.log(response.data))
            .catch(error => this.setState({ errors: error.response.data }));
    }

    render(){

        const { errors } = this.state;

        return(
        <div className="login">
            <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">ログイン</h1>
                <p className="lead text-center">あなたのアカウントでログインしてください。</p>
                <form onSubmit={ this.onSubmit }>
                    <div className="form-group">
                    <input type="email" className={classnames('form-control form-control-lg', {'is-invalid': errors.email})} placeholder="メールアドレス" name="email" value={ this.state.email } onChange={ this.onChange }/>
                        {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                    </div>
                    <div className="form-group">
                    <input type="password" className={classnames('form-control form-control-lg', {'is-invalid': errors.password})} placeholder="パスウード" name="password" value={ this.state.password } onChange={ this.onChange }/>
                        {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                    </div>
                    <input type="submit" className="btn btn-info btn-block mt-4" />
                </form>
                </div>
            </div>
            </div>
        </div>
        );
    }
}

export default Login;