import React, {Component} from 'react';
import {connect} from 'react-redux';

import Start from './Pages/Start/Start';
import AddItems from './Pages/AddItems/AddItems';
import Layout from './hoc/Layout/Layout';
import ClaimItems from './Pages/ClaimItems/ClaimItems';
import Tax from './Pages/Tax/Tax';
import AdditionalFees from "./Pages/AdditionalFees/AdditionalFees";

class App extends Component {
  render() {
    let currentComponent = <Start/>
    if (this.props.currentPage === 1) {
      currentComponent = <AddItems/>
    }
    else if (this.props.currentPage === 2) {
      currentComponent = <ClaimItems/>
    }
    else if (this.props.currentPage === 3) {
      currentComponent = <Tax/>
    } else if (this.props.currentPage === 4) {
      currentComponent = <AdditionalFees/>
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
