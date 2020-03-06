import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Landing extends Component {
    render() {
        return (
            <div class="landing">
                <div class="dark-overlay landing-inner text-light">
                <div class="container">
                    <div class="row">
                    <div class="col-md-12 text-center">
                        <h1 class="display-3 mb-4">ソーシャルネットワーク
                        </h1>
                        <p class="lead">新しい開発者プロファイルを作って、共有と投稿して, 他の開発者から助けを得るための</p>
                        <hr />
                        <Link to="register" class="btn btn-lg btn-info mr-2">サインアップ</Link>
                        <Link to="login" class="btn btn-lg btn-light">ログイン</Link>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}
