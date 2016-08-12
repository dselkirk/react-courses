require("./index.css");

import React from 'react';
import ReactDOM from 'react-dom';
import SearchProfile from './src/search-profile';
import Profile from './src/profile';
import {API} from './src/utils/constants';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: 'hesmaili',
            name:'',
            avatar:'',
            location:'',
            repos:'',
            followers: '',
            following:'',
            homeUrl:'',
            notFound:''
        }
    }
    fetchProfile(username) {
        let url = `${API}/${username}`;
        fetch(url)
            .then((res) => res.json() )
            .then((data) => {
                this.setState({
                    username: data.login,
                    name: data.name,
                    avatar: data.avatar_url,
                    location: data.location,
                    repos: data.public_repos,
                    followers: data.followers,
                    following: data.following,
                    homeUrl: data.html_url,
                    notFound: data.message
                })
            })
            .catch((error) => console.log('Oops! . There Is A Problem') )
    }
    componentDidMount() {
        this.fetchProfile(this.state.username);
    }
    render() {
        return (
            <div>
                <section id="card">
                    <SearchProfile fetchProfile={this.fetchProfile.bind(this)}/>
                    <Profile data={this.state} />
                </section>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.querySelector("#myApp"));