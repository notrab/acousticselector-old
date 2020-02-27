import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {monoFont} from '../../utils/fonts'
import media from '../../utils/media'
import ProductPreview from '../ProductPreview'

const Wrapper = styled.div`padding: 1.5rem;`

const SubHeading = styled.h3`
  color: ${({theme}) => theme.orange};
  font-size: 2rem;
  font-weight: 400;
  margin: 3rem 0 1rem;
  text-align: center;

  ${media.tablet`
    font-size: 2.7rem;
    margin-top: 3rem;
    text-align: left;
  `};
`

const RelatedTest = styled.div`
  margin-bottom: 1.5rem;

  > a {
    display: flex;
    padding: 1.5rem;
    border-radius: 3px;
    border-width: 1px;
    border-style: solid;
    border-color: ${props => props.theme.blue};
    text-decoration: none;
    align-items: center;
    color: ${({theme}) => theme.grey};

    span:first-child {
      margin-right: 3rem;
      text-align: center;

      > strong {
        color: ${({theme}) => theme.orange};
        font-family: ${monoFont};
        font-weight: 500;
      }
    }

    span:last-child {
      color: ${({theme}) => theme.darkBlue};
    }
  }
`

const Text = styled.p`margin: 0;`

const SealConfiguration = ({
  core,
  headables,
  thresholdables,
  meetingables,
  letterplateables,
  glass,
  relatedTests
}) => (
  <Wrapper>
    {headables &&
      headables.length > 0 && (
        <div>
          <SubHeading>Head &amp; Jambs</SubHeading>
          {headables.map((headable, index) => (
            <ProductPreview key={index} {...headable.product} />
          ))}
        </div>
      )}

    {thresholdables &&
      thresholdables.length > 0 && (
        <div>
          <SubHeading>Threshold</SubHeading>
          {thresholdables.map((thresholdable, index) => (
            <ProductPreview key={index} {...thresholdable.product} />
          ))}
        </div>
      )}

    {meetingables &&
      meetingables.length > 0 && (
        <div>
          <SubHeading>Meeting stile</SubHeading>
          {meetingables.map((meetingable, index) => (
            <ProductPreview key={index} {...meetingable.product} />
          ))}
        </div>
      )}

    {letterplateables &&
      letterplateables.length > 0 && (
        <div>
          <SubHeading>Letterplate</SubHeading>
          {letterplateables.map((letterplate, index) => (
            <ProductPreview key={index} {...letterplate.product} />
          ))}
        </div>
      )}

    {glass && (
      <div>
        <SubHeading>Glass</SubHeading>
        <Text>{glass}</Text>
      </div>
    )}

    {relatedTests &&
      relatedTests.length > 0 && (
        <div>
          <SubHeading>Related Tests</SubHeading>

          {relatedTests.map((report, index) => (
            <RelatedTest key={index}>
              <Link
                key={report.id}
                to={{
                  pathname: `/reports/${report.id}`,
                  state: {modal: true}
                }}>
                <span>
                  <strong>{report.dbrw}</strong> dBRw
                </span>
                <span>
                  {report.core.thickness} {report.core.manufacturer.name}{' '}
                  {report.core.name}
                </span>
              </Link>
            </RelatedTest>
          ))}
        </div>
      )}
  </Wrapper>
)

export default SealConfiguration
