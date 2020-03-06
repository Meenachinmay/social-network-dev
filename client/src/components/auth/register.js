import React, { Component } from 'react';

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

        console.log(newUser);
    }

    render(){
        return(
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">サインアップ</h1>
                            <p className="lead text-center">新しいアカウント作成する</p>
                            <form onSubmit={ this.onSubmit }>
                                <div className="form-group">
                                <input type="text" className="form-control form-control-lg" placeholder="お名前" name="name" value={ this.state.name } onChange={ this.onChange } />
                                </div>
                                <div className="form-group">
                                <input type="email" className="form-control form-control-lg" placeholder="メールアドレス" name="email" value={ this.state.email } onChange={ this.onChange } />
                                <small className="form-text text-muted">このサイトはグラバターを使っていますので、グラバタープロファイル写真を使いたいならグラバターメールを使って下さい。</small>
                                </div>
                                <div className="form-group">
                                <input type="password" className="form-control form-control-lg" placeholder="パスワード" name="password" value={ this.state.password } onChange={ this.onChange } />
                                </div>
                                <div className="form-group">
                                <input type="password" className="form-control form-control-lg" placeholder="パスウード　認証する" name="password2" value={ this.state.password2 } onChange={ this.onChange } />
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