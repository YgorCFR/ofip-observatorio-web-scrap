import React, { Component } from 'react';
import LocalStorage from './LocalStorage';
import PostExample from './PostExample';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false
    }
  }

  componentDidMount() {
    fetch('https://localhost:5000/api/v1/news/get-news-header/0/10/1/1')
      .then(res =>  res.json())
      .then(json =>  {
        this.setState({
          isLoaded: true,
          items: json,
        })
      });
  }
 
  render () {
    var { isLoaded, items } = this.state;
    
    if (!isLoaded) {
      return <div>Loading...</div>;
    }

    else {
      return (
        <div className="App">
            <ul>
                {
                  items.data.news.map(item => (
                    <li key={item.id}>
                      <p>{item.title}</p>
                      <p>{item.text}</p>
                    </li>
                  ))
                };  
            </ul>   
                {
                  <LocalStorage></LocalStorage>
                }
                {
                  <PostExample></PostExample>
                }
        </div>
      )
    }
  }
}

export default App;
