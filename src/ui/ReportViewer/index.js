import React, {Component} from 'react'
import {compose, gql, graphql} from 'react-apollo'
import {Helmet} from 'react-helmet'

import ScrollView from './ScrollView'
import Container from './Container'
import Summary from './Summary'
import Actions from './Actions'
import Loading from './Loading'
import Seals from './Seals'
import DrawerModal from '../DrawerModal'

class ReportViewer extends Component {
  goBack = () => this.props.history.push('/', {modal: false})

  render() {
    const {data: {loading, error, Report}} = this.props

    if (error) return <p>Error occured</p>

    if (loading)
      return (
        <DrawerModal onClose={this.goBack}>
          <Loading message="Loading report" />
        </DrawerModal>
      )

    const title = `${Report.core.thickness} ${Report.core.manufacturer
      .name} ${Report.core.name || ''}`

    return (
      <DrawerModal onClose={this.goBack}>
        <Container>
          <Helmet>
            <title>{`${title} | Acoustic Selector`}</title>
          </Helmet>

          <ScrollView>
            <Summary
              dbrw={Report.dbrw}
              core={Report.core}
              title={title}
              notes={Report.notes}
            />

            <Actions file={Report.file} />

            <Seals
              core={Report.core}
              headables={Report.headables}
              thresholdables={Report.thresholdables}
              meetingables={Report.meetingables}
              letterplateables={Report.letterplateables}
              glass={Report.glass}
              relatedTests={Report.core.reports}
            />
          </ScrollView>
        </Container>
      </DrawerModal>
    )
  }
}

const Query = gql`
  query getSealConfiguration($id: ID!) {
    Report(id: $id) {
      dbrw
      notes
      core {
        name
        thickness
        manufacturer {
          name
        }
        reports(filter: {id_not: $id}) {
          id
          dbrw
          core {
            name
            thickness
            manufacturer {
              name
            }
          }
        }
      }
      headables {
        product {
          name
          slug
        }
      }
      meetingables {
        product {
          name
          slug
        }
      }
      thresholdables {
        product {
          name
          slug
        }
      }
      letterplateables {
        product {
          name
          slug
        }
      }
      glass
      file {
        id
        url
      }
    }
  }
`

const mapQueriesToProps = graphql(Query, {
  options: ({match}) => ({
    variables: {
      id: match.params.id
    }
  })
})

export default compose(mapQueriesToProps)(ReportViewer)
