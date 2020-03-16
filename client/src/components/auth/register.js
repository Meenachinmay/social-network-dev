import React, { Component } from 'react';

import axios from 'axios';

import classnames from 'classnames';

class Register extends Component{ 
    constructor(){
        super();

        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value })
    }

    onSubmit(e){
        e.preventDefault();

        const newUser ={
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }

        axios.post('/api/users/register', newUser)
            .then(response => console.log(response.data))
            .catch(error => this.setState({ errors: error.response.data }));
    }

    render(){

        const { errors } = this.state;

        return(
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">サインアップ</h1>
                            <p className="lead text-center">新しいアカウントを作成する</p>
                            <form onSubmit={ this.onSubmit }>
                                <div className="form-group">
                                <input type="text" className={classnames('form-control form-control-lg', {'is-invalid': errors.name})} placeholder="お名前" name="name" value={ this.state.name } onChange={ this.onChange } />
                                    {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                                </div>
                                <div className="form-group">
                                <input type="email" className={classnames('form-control form-control-lg', {'is-invalid': errors.email})} placeholder="メールアドレス" name="email" value={ this.state.email } onChange={ this.onChange } />
                                <small className="form-text text-muted">このサイトはグラバターを使っていますので、グラバタープロファイル写真を使いたいならグラバターメールを使って下さい。</small>
                                    {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                                </div>
                                <div className="form-group">
                                <input type="password" className={classnames('form-control form-control-lg', {'is-invalid': errors.password})} placeholder="パスワード" name="password" value={ this.state.password } onChange={ this.onChange } />
                                    {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                                </div>
                                <div className="form-group">
                                <input type="password" className={classnames('form-control form-control-lg', {'is-invalid': errors.password2})} placeholder="パスウード　認証する" name="password2" value={ this.state.password2 } onChange={ this.onChange } />
                                    {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)}
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

export default Register;