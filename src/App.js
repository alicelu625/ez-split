import React, {Component} from 'react';
import {connect} from 'react-redux';

import Start from './Pages/Start/Start';
import AddItems from './Pages/AddItems/AddItems';
import Layout from './shared/Layout/Layout';

class App extends Component {
  render() {
    let currentComponent = <Start/>
    if (this.props.currentPage === 1) {
      currentComponent = <AddItems/>
    }
    return (
      <Layout>
        {currentComponent}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentPage: state.currentPage
  }
}

export default connect(mapStateToProps)(App);
