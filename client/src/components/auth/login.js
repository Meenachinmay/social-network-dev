import React, { Component } from 'react';

class Login extends Component{ 
    render(){
        return(
        <div className="login">
            <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">ログイン</h1>
                <p className="lead text-center">あなたのアカウントでログインしてください。</p>
                <form action="dashboard.html">
                    <div className="form-group">
                    <input type="email" className="form-control form-control-lg" placeholder="メールアドレス" name="email" />
                    </div>
                    <div className="form-group">
                    <input type="password" className="form-control form-control-lg" placeholder="パスウード" name="password" />
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