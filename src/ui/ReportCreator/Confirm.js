import React, {Component} from 'react'

import Button, {PrimaryButton} from '../Button'

class Confirm extends Component {
  state = {
    isPublished: true
  }

  handlePublished = () => {
    this.setState({isPublished: !this.state.isPublished})
  }

  handleSubmit = async () => {
    const {isPublished} = this.state

    await this.props.saveValues({isPublished})
    await this.props.onSubmit()
  }

  render() {
    const {data} = this.props
    const {isPublished} = this.state
    const saveText = isPublished ? 'Publish' : 'Save for later'

    return (
      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>

        <label>
          <input
            type="checkbox"
            checked={isPublished}
            onChange={this.handlePublished}
          />
          Publish after saving?
        </label>

        <hr />

        <PrimaryButton block onClick={this.handleSubmit}>
          {saveText}
        </PrimaryButton>

        <br />

        <Button block onClick={this.props.goToPreviousStep}>
          Go back
        </Button>
      </div>
    )
  }
}

export default Confirm
