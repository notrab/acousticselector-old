import React, {Component} from 'react'
import {gql, graphql} from 'react-apollo'
import {withRouter, Redirect} from 'react-router-dom'

import DrawerModal from '../DrawerModal'
// import Toolbar from '../ReportViewer/Toolbar';
import Inner from '../ReportViewer/Inner'
import Upload from './Upload'
import CoreData from './CoreData'
import TestData from './TestData'
import SealConfiguration from './SealConfiguration'
import Confirm from './Confirm'

class ReportCreator extends Component {
  state = {
    currentStep: 0,
    errors: {}
  }

  validateStep = () => {
    const {
      currentStep,
      coreId,
      manufacturerId,
      name,
      thickness,
      fireRating,
      doorType,
      glass
    } = this.state
    let errors = {}

    if (currentStep === 0) {
      if (!coreId) {
        errors.coreRequired = true
      }

      if (!manufacturerId) {
        errors.manufacturerRequired = true
      }

      if (!name) {
        errors.nameRequired = true
      }

      if (!thickness) {
        errors.thicknessRequired = true
      }

      if (!fireRating) {
        errors.fireRatingRequired = true
      }

      if (!doorType) {
        errors.doorTypeRequired = true
      }

      if (!glass) {
        errors.glassRequired = true
      }

      this.setState(state => ({...state, errors}))

      return Object.keys(errors).length === 0
    }

    return true
  }

  _saveValues = values => {
    this.setState({
      ...this.state,
      ...values
    })
  }

  _goToNextStep = () => {
    this.setState({
      currentStep: this.state.currentStep + 1
    })
  }

  _goToPreviousStep = () => {
    this.setState({
      currentStep: this.state.currentStep - 1
    })
  }

  _onDrop = files => {
    let data = new FormData()
    data.append('data', files[0])

    this.setState({
      uploading: true
    })

    fetch(process.env.REACT_APP_GRAPHQL_FILE_URI, {
      method: 'POST',
      body: data
    })
      .then(res => res.json())
      .then(file => {
        this.setState({
          fileId: file.id,
          uploading: false,
          fileName: file.name,
          fileSize: file.size
        })

        const testId = parseInt(file.name.split(',')[0], 10)

        if (Number.isInteger(testId)) {
          this.setState({
            testId
          })
        }

        this._goToNextStep()
      })
      .catch(e => alert('Invalid file. Try again.'))
  }

  _handleSubmit = async () => {
    const newReport = await this.props.addReport({
      variables: this.state
      // update: (store, {data: {createReport}}) => {
      //   // const data = store.readQuery({query: })
      // }
    })

    this.setState({
      currentStep: this.state.currentStep + 1,
      reportId: newReport.data.createReport.id
    })

    this.props.history.push('/')
  }

  _closeModal = () => {
    this.props.history.goBack()
  }

  renderStep = step => {
    switch (step) {
      default:
      case 0:
        return (
          <Upload
            onDrop={this._onDrop}
            goToNextStep={this._goToNextStep}
            data={this.state}
          />
        )

      case 1:
        return (
          <CoreData
            goToNextStep={this._goToNextStep}
            saveValues={this._saveValues}
            formData={this.state}
          />
        )
      case 2:
        return (
          <TestData
            goToNextStep={this._goToNextStep}
            goToPreviousStep={this._goToPreviousStep}
            saveValues={this._saveValues}
            data={this.state}
          />
        )
      case 3:
        return (
          <SealConfiguration
            goToNextStep={this._goToNextStep}
            goToPreviousStep={this._goToPreviousStep}
            saveValues={this._saveValues}
            formData={this.state}
          />
        )
      case 4:
        return (
          <Confirm
            saveValues={this._saveValues}
            goToPreviousStep={this._goToPreviousStep}
            onSubmit={this._handleSubmit}
            data={this.state}
          />
        )
      case 5:
        return (
          <Redirect
            to={{
              pathname: `/reports/${this.state.reportId}`,
              state: {modal: true}
            }}
          />
        )
    }
  }

  render() {
    const {currentStep} = this.state

    return (
      <DrawerModal onClose={this._closeModal}>
        <Inner>{this.renderStep(currentStep)}</Inner>
      </DrawerModal>
    )
  }
}

const withMutation = graphql(
  gql`
    mutation createReport(
      $dbrw: Int!
      $notes: String
      $coreId: ID
      $core: ReportcoreCore
      $doorType: String!
      $testId: Int
      $glass: String
      $fileId: ID
      $headables: [ReportheadablesHeadable!]
      $meetingables: [ReportmeetingablesMeetingable!]
      $thresholdables: [ReportthresholdablesThresholdable!]
      $letterplateables: [ReportletterplateablesLetterplateable!]
    ) {
      createReport(
        dbrw: $dbrw
        notes: $notes
        coreId: $coreId
        core: $core
        doorType: $doorType
        testId: $testId
        glass: $glass
        fileId: $fileId
        headables: $headables
        meetingables: $meetingables
        thresholdables: $thresholdables
        letterplateables: $letterplateables
      ) {
        id
      }
    }
  `,
  {
    name: 'addReport'
  }
)

export default withMutation(withRouter(ReportCreator))
