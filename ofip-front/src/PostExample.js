import React, { Component } from 'react';


class PostExample extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            url: '',
            vehicleId: 4,
            keyWordId: 8,
            title: ''
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        let data  = {
            text: this.state.text,
            url: this.state.url,
            vehicleId: this.state.vehicleId,
            keyWordId: this.state.keyWordId,
            title: this.state.title
        };

        console.log(data);
    }

    handleChange(prop, val) {
        this.setState({
            [prop]: val
        })
    }

    render () {
        return  (
            <div className="App">
                <form onSubmit={ (e) => this.handleSubmit(e)}>
                    <div>
                        <textarea
                            type="text"
                            name="textarea"
                            placeholder="Texto da notícia..."
                            value={this.state.text}
                            onChange={(e) => this.handleChange('text', e.target.value)}
                        ></textarea>
                    </div>
                    <div>
                        <input
                            type='text'
                            placeholder="Url da notícia..."
                            value={this.state.url}
                            onChange={(e) => this.handleChange('url', e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder='Título da notícia...'
                            value={this.state.title}
                            onChange={(e) => this.handleChange('title', e.target.value)}
                        />
                    </div>
                    <input type="submit" value="Submit form"/>
                </form>
            </div>
        )
    }
}


export default PostExample