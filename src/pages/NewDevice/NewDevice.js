import React from 'react'
import { Link } from 'react-router-dom'

import { Chevron } from 'icons'
import { Button, QRCode } from 'components'

import './NewDevice.css'

export default class NewDevice extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      image: '',
      lastname: '',
      firstname: '',
      username: ''
    }
  }

  onChange (field, event) {
    this.setState({[field]: event.target.value})
  }

  onImageChange (event) {
    const reader = new window.FileReader()
    const file = event.target.files[0]
    reader.addEventListener('load', () => {
      this.setState({image: reader.result})
    })
    reader.readAsDataURL(file)
  }

  render () {
    const style = {color: 'var(--main-highlight-color)'}

    return (
      <div className='NewDevice'>
        <Link to='devices' className='goback'>
          <Chevron transform='rotate(90)' color='#458bf8' />
          <h3>Go back to the devices list</h3>
        </Link>
        <div className='container'>
          <QRCode image='http://www.datafakegenerator.com/temp/test409236e0431d1d4dcf66ffba56d9d43c.png' />
          <p className='link'>{'QWA.NT/0BJ8ZX'}</p>
          <p>Scan your QR Code on the devices you want to sync with</p>
          <p style={style}>OR</p>
          <p>Receive a link by email</p>
          <Button secondary label='Send link by email' />
        </div>
      </div>
    )
  }
}

NewDevice.propTypes = {
}
