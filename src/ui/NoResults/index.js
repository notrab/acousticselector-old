import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {resetFilter} from '../../ducks/options';
import Button from '../Button';

import Wrapper from '../Content/Wrapper';
import PageHeader from '../Content/PageHeader';

const NoResults = ({resetFilter}) => (
  <Wrapper center>
    <PageHeader>
      <h1>No reports found</h1>
    </PageHeader>
    <p>There are no reports matching the filter options you specified.</p>

    <Button onClick={resetFilter}>Clear Filter</Button>
  </Wrapper>
);

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      resetFilter
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(NoResults);
