import React, {Component} from 'react'
import Dropzone from 'react-dropzone'

import Button from '../Button'

class Upload extends Component {
  handleSubmit = async () => {
    await this.props.goToNextStep()
  }

  render() {
    const {
      goToNextStep,
      onDrop,
      data: {uploading, fileId, fileName, fileSize}
    } = this.props

    return (
      <div style={{height: '100%'}}>
        <Dropzone
          onDrop={onDrop}
          disableClick={true}
          multiple={false}
          style={{
            height: 'calc(100% - 6rem)',
            width: '100%',
            borderWidth: '0.2rem',
            borderStyle: 'dashed',
            borderColor: fileId ? '#6F9F3B' : '#ccc',
            backgroundColor: fileId ? '#DFEDCF' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            marginBottom: '1.5rem',
            color: fileId ? '#6F9F3B' : '#E3623A'
          }}
          activeStyle={{
            borderColor: '#E3623A',
            backgroundColor: 'rgba(227, 98, 58, 0.1)'
          }}>
          {uploading && <h3>Uploading file</h3>}

          {!uploading &&
            fileId && (
              <span>
                <strong>{fileName}</strong>
                <br />
                {fileSize} bytes
              </span>
            )}

          {!uploading && !fileId && <p>Click or drag file to upload</p>}
        </Dropzone>

        <Button block onClick={goToNextStep}>
          Continue without uploading
        </Button>
      </div>
    )
  }
}

export default Upload
