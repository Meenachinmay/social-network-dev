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
    }

    render(){
        return(
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">サインアップ</h1>
                            <p className="lead text-center">新しいアカウント作成する</p>
                            <form>
                                <div className="form-group">
                                <input type="text" className="form-control form-control-lg" placeholder="お名前" name="name" value={ this.state.name } />
                                </div>
                                <div className="form-group">
                                <input type="email" className="form-control form-control-lg" placeholder="メールアドレス" name="email" value={ this.state.email } />
                                <small className="form-text text-muted">このサイトはグラバターを使っていますので、グラバタープロファイル写真を使いたいならグラバターメールを使って下さい。</small>
                                </div>
                                <div className="form-group">
                                <input type="password" className="form-control form-control-lg" placeholder="パスワード" name="password" value={ this.state.password }/>
                                </div>
                                <div className="form-group">
                                <input type="password" className="form-control form-control-lg" placeholder="パスウード　認証する" name="password2" value={ this.state.password2 }/>
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