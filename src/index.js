//import styles
import 'grommet/scss/vanilla/index';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from 'grommet/components/App';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import Title from 'grommet/components/Title';
import MainComponent from './MainComponent.js';

class Main extends Component {
  render() {
    return (
      <App centered={false}>
        <Header direction="row" justify="between" size="large"
          pad={{ horizontal: 'medium' }}>
          <Title>Colours of Allure</Title>
        </Header>
        <Box pad='medium'>
          <MainComponent/>
        </Box>
        <Footer primary={true} appCentered={true} direction="column"
          align="center" pad="small" colorIndex="grey-1">
          <p>
            Footer
          </p>
        </Footer>
      </App>
    );
  }
};

let element = document.getElementById('content');
ReactDOM.render(React.createElement(Main), element);

document.body.classList.remove('loading');
