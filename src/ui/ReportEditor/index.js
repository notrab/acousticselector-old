import React, {Component} from 'react'
import {compose, gql, graphql} from 'react-apollo'
import {push} from 'react-router-redux'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import DrawerModal from '../DrawerModal'
import ScrollView from '../ReportViewer/ScrollView'
import Container from './Container'
import Loading from '../ReportViewer/Loading'
import SealEditor from './SealEditor'
import ProductFinder from '../ReportCreator/ProductFinder'

class ReportEditor extends Component {
  goBack = () => {
    const {history} = this.props

    history.push('/', {modal: false})
  }

  render() {
    const {
      data: {loading, error, Report, allProducts, refetch},
      history,
      deleteReport,
      returnToHome,
      addHeadable,
      deleteHeadable,
      addThresholdable,
      deleteThresholdable,
      addMeetingable,
      deleteMeetingable,
      addLetterplateable,
      deleteLetterplateable,
      setIsAssessment
    } = this.props

    if (error) return <p>Error occured</p>

    if (loading)
      return (
        <DrawerModal onClose={this.goBack}>
          <Loading message="Loading report editor" />
        </DrawerModal>
      )

    const goBack = () => {
      history.push('/', {modal: false})
    }

    const confirmAndDelete = async () => {
      if (
        window.confirm('Are you sure you wish to delete this report?') === true
      ) {
        await deleteReport()
        returnToHome()
      }
    }

    const addNewSeal = async ({id, productType}) => {
      switch (productType) {
        case 'headables':
          await addHeadable({
            variables: {productId: id, reportId: Report.id}
          })
          break

        case 'thresholdables':
          await addThresholdable({
            variables: {productId: id, reportId: Report.id}
          })
          break

        case 'meetingables':
          await addMeetingable({
            variables: {productId: id, reportId: Report.id}
          })
          break

        case 'letterplateables':
          await addLetterplateable({
            variables: {productId: id, reportId: Report.id}
          })
          break

        default:
          return false
      }

      await refetch()
    }

    const toggleIsAssessment = async (id, isAssessment) => {
      if (window.confirm('Are you sure? This is one way only.') === true) {
        await setIsAssessment({
          variables: {
            id,
            isAssessment
          }
        })

        await refetch()
      }
    }

    const isAssessment = Report.isAssessment

    return (
      <DrawerModal onClose={goBack}>
        <Container>
          <ScrollView>
            <button onClick={() => confirmAndDelete()}>
              Delete this report
            </button>
            {!isAssessment && (
              <button
                onClick={() => toggleIsAssessment(Report.id, !isAssessment)}>
                Mark as assessment
              </button>
            )}

            {!loading &&
              allProducts && (
                <div>
                  <h3>Add new seal</h3>
                  <ProductFinder onSubmit={addNewSeal} products={allProducts} />
                </div>
              )}

            <SealEditor
              headables={Report.headables}
              deleteHeadable={deleteHeadable}
              thresholdables={Report.thresholdables}
              deleteThresholdable={deleteThresholdable}
              meetingables={Report.meetingables}
              deleteMeetingable={deleteMeetingable}
              letterplateables={Report.letterplateables}
              deleteLetterplateable={deleteLetterplateable}
              refetch={refetch}
              reportId={Report.id}
            />
          </ScrollView>
        </Container>
      </DrawerModal>
    )
  }
}

const Query = gql`
  query getReportDetails($id: ID!) {
    Report(id: $id) {
      id
      dbrw
      notes
      isAssessment
      headables {
        id
        product {
          id
          name
        }
      }
      thresholdables {
        id
        product {
          id
          name
        }
      }
      meetingables {
        id
        product {
          id
          name
        }
      }
      letterplateables {
        id
        product {
          id
          name
        }
      }
    }
    allProducts {
      id
      name
      slug
    }
  }
`

const deleteReportMutation = gql`
  mutation updateReport($id: ID!) {
    updateReport(id: $id, toDelete: true) {
      id
    }
  }
`

const addHeadableMutation = gql`
  mutation createHeadable($reportId: ID!, $productId: ID!) {
    createHeadable(reportId: $reportId, productId: $productId) {
      id
    }
  }
`

const deleteHeadableMutation = gql`
  mutation deleteHeadable($id: ID!) {
    deleteHeadable(id: $id) {
      id
    }
  }
`

const addThresholdableMutation = gql`
  mutation createThresholdable($reportId: ID!, $productId: ID!) {
    createThresholdable(reportId: $reportId, productId: $productId) {
      id
    }
  }
`

const deleteThresholdableMutation = gql`
  mutation deleteThresholdable($id: ID!) {
    deleteThresholdable(id: $id) {
      id
    }
  }
`

const addMeetingableMutation = gql`
  mutation createMeetingable($reportId: ID!, $productId: ID!) {
    createMeetingable(reportId: $reportId, productId: $productId) {
      id
    }
  }
`

const deleteMeetingableMutation = gql`
  mutation deleteMeetingable($id: ID!) {
    deleteMeetingable(id: $id) {
      id
    }
  }
`

const addLetterplateableMutation = gql`
  mutation createLetterplateable($reportId: ID!, $productId: ID!) {
    createLetterplateable(reportId: $reportId, productId: $productId) {
      id
    }
  }
`

const deleteLetterplateableMutation = gql`
  mutation deleteLetterplateable($id: ID!) {
    deleteLetterplateable(id: $id) {
      id
    }
  }
`

const setIsAssessmentMutation = gql`
  mutation setIsAssessment($id: ID!, $isAssessment: Boolean!) {
    updateReport(id: $id, isAssessment: $isAssessment) {
      id
      isAssessment
    }
  }
`

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      returnToHome: () => push('/')
    },
    dispatch
  )

// needs some serious refactoring
export default compose(
  connect(null, mapDispatchToProps),
  graphql(Query, {
    options: ({match}) => ({
      variables: {
        id: match.params.id
      }
    })
  }),
  graphql(deleteReportMutation, {
    options: ({match}) => ({
      variables: {
        id: match.params.id
      }
    }),
    name: 'deleteReport'
  }),
  graphql(deleteHeadableMutation, {
    name: 'deleteHeadable'
  }),
  graphql(deleteThresholdableMutation, {
    name: 'deleteThresholdable'
  }),
  graphql(deleteMeetingableMutation, {
    name: 'deleteMeetingable'
  }),
  graphql(deleteLetterplateableMutation, {
    name: 'deleteLetterplateable'
  }),
  graphql(addHeadableMutation, {
    name: 'addHeadable'
  }),
  graphql(addThresholdableMutation, {
    name: 'addThresholdable'
  }),
  graphql(addMeetingableMutation, {
    name: 'addMeetingable'
  }),
  graphql(addLetterplateableMutation, {
    name: 'addLetterplateable'
  }),
  graphql(setIsAssessmentMutation, {
    name: 'setIsAssessment'
  })
)(ReportEditor)
