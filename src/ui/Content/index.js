import React from 'react';
import {Helmet} from 'react-helmet';

import Wrapper from './Wrapper';
import PageHeader from './PageHeader';
import {Container} from '../Layout';

export default ({pageTitle, meta, children, ...rest}) => {
  const title = `${pageTitle} | Tested by Norseal`;

  return (
    <Container padded>
      <Wrapper {...rest}>
        <Helmet>
          <title>{title}</title>

          <meta name="twitter:title" content={title} />
        </Helmet>

        {pageTitle && (
          <PageHeader>
            <h1>{pageTitle}</h1>
          </PageHeader>
        )}

        {children}
      </Wrapper>
    </Container>
  );
};
