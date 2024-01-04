import React from 'react'
import { ColorRing } from 'react-loader-spinner'
const LoadingSong = () => {
  return (
    <ColorRing
        visible={true}
        height="20"
        width="20"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#333']}
    />
  )
}

export default LoadingSong