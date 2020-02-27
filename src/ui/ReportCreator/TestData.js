import React, {Component} from 'react'

import Button from '../Button'
import {InputGroup, TextInput, ErrorNotice} from '../Form'

class TestData extends Component {
  state = {
    isAssessment: this.props.data.isAssessment || false,
    errors: {},
    testId: this.props.data.testId || null,
    dbrw: this.props.data.dbrw || null,
    notes: this.props.data.notes || null
  }

  validateStep = () => {
    const {isAssessment, testId, dbrw} = this.state
    let errors = {}

    if (!isAssessment && !testId) {
      errors.testIdRequired = true
    }

    if (!dbrw) {
      errors.dbrwRequired = true
    }

    this.setState({errors})

    return Object.keys(errors).length === 0
  }

  handleSubmit = async e => {
    e.preventDefault()

    await this.props.saveValues(this.state)

    if (!this.validateStep()) return

    this.props.goToNextStep()
  }

  render() {
    const {isAssessment, errors, testId, dbrw, notes} = this.state

    const dbrwPlaceholder = isAssessment ? 'Estimated' : 'Tested'

    return (
      <div>
        <h2>Test Data</h2>

        <textarea
          name="notes"
          placeholder="Notes"
          defaultValue={notes}
          onChange={e =>
            this.setState({
              [e.target.name]: e.target.value
            })}
        />

        <label>
          <input
            type="checkbox"
            checked={isAssessment}
            onChange={() =>
              this.setState({
                isAssessment: !isAssessment
              })}
          />Assessed?
        </label>

        {!isAssessment && (
          <div>
            <InputGroup invalid={errors.testIdRequired}>
              <TextInput
                name="testId"
                type="number"
                placeholder="Test ID"
                defaultValue={testId}
                onChange={e =>
                  this.setState({
                    [e.target.name]: parseInt(e.target.value, 10)
                  })}
              />

              {errors &&
                errors.testIdRequired && (
                  <ErrorNotice>Test ID required</ErrorNotice>
                )}
            </InputGroup>

            <InputGroup>
              <TextInput
                name="testDate"
                type="date"
                onChange={e =>
                  this.setState({
                    [e.target.name]: e.target.value
                  })}
              />
            </InputGroup>
          </div>
        )}

        <InputGroup invalid={errors.dbrwRequired}>
          <TextInput
            type="number"
            name="dbrw"
            defaultValue={dbrw}
            onChange={e =>
              this.setState({[e.target.name]: parseInt(e.target.value, 10)})}
            placeholder={`${dbrwPlaceholder} dBRw`}
          />
          {errors &&
            errors.dbrwRequired && <ErrorNotice>dBRw required</ErrorNotice>}
        </InputGroup>

        <hr />

        <Button primary onClick={this.handleSubmit}>
          Save & continue
        </Button>

        {/* <Button onClick={this.props.goToPreviousStep}>Go back</Button> */}
      </div>
    )
  }
}

export default TestData
