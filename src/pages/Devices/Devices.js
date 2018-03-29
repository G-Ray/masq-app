import React from 'react'
import PropTypes from 'prop-types'

import Button from 'components/Button/Button'
import Card from 'components/Card/Card'
import Separator from 'components/Separator'
import CircleIndicator from 'components/CircleIndicator/CircleIndicator'

import './Devices.css'

function SyncStatus (props) {
  return (
    <div className='syncstatus'>
      <CircleIndicator color={props.color} />
      <p>10 days ago</p>
    </div>
  )
}

function DeviceRow (props) {
  const {device} = props
  return (
    <div>
      <Card title={device.name} color={device.color} enabled={device.enabled} onChecked={() => props.onChecked(props.index)}>
        <div className='lastsync'>
          <p>LAST SYNCHRONIZATION</p>
          <SyncStatus color={device.enabled ? device.color : '#b2b2b2'} />
        </div>
      </Card>
      <Separator />
    </div>
  )
}

export default function Devices (props) {
  const { devices } = props
  const newDeviceKey = devices.findIndex(dev => dev.new)

  return (
    <div style={{ backgroundColor: '#f5f7fa', paddingTop: '1px' }}>

      <h1 style={{marginLeft: '16px'}}>Nouvel appareil</h1>
      <div className='Devices'>
        {newDeviceKey !== -1
          ? <DeviceRow index={newDeviceKey} device={devices[newDeviceKey]} onChecked={props.onChecked} />
          : null
        }
        <Separator />
      </div>

      <h1 style={{marginLeft: '16px'}}>Mes appareils connectés à Masq</h1>
      <div className='Devices'>
        {devices.map((device, index) => (
          !device.new
            ? <DeviceRow key={index} index={index} device={device} onChecked={props.onChecked} />
            : null
        ))}
        <Separator />
        <Button label='Add a new device' />
      </div>
    </div>
  )
}

Devices.propTypes = {
  devices: PropTypes.array.isRequired, // TODO: Check properties
  onChecked: PropTypes.func
}
