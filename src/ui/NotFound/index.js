import React from 'react'

import Content from '../Content'

export default ({ title = 'Not Found' }) => (
  <Content pageTitle={title} center>
    <p>Sorry this page could not be found.</p>
  </Content>
)
