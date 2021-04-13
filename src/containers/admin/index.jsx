import React, { Component } from 'react'
import { connect } from 'react-redux'
import { demo1 } from '../../redux/actions/test'

class Admin extends Component {

    componentDidMount() {
        console.log(this.props);
    }

    render() {
        return (
            <div>
                Admin..
            </div>
        )
    }
}

export default connect(
    state => ({ peiqi: state.test }),
    {
        demo1
    }
)(Admin)
