import React, {Component} from 'react';
import {connect} from 'react-redux';

import Start from './Pages/Start/Start';
import AddItems from './Pages/AddItems/AddItems';
import Layout from './hoc/Layout/Layout';
import ClaimItems from './Pages/ClaimItems/ClaimItems';

class App extends Component {
  render() {
    let currentComponent = <Start/>
    if (this.props.currentPage === 1) {
      currentComponent = <AddItems/>
    }
    else if (this.props.currentPage === 2) {
      currentComponent = <ClaimItems/>
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
