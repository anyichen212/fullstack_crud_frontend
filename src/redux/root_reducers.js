import React from 'react'
import { connect } from 'react-redux'

export const root_reducers = (props) => {
  return (
    <div>root_reducers</div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(root_reducers)