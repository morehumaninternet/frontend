import React from 'react'
import {MHIRotatingLogo} from '../components/new-landing-page/rotating-Logo'
import Hero from '../components/new-landing-page/hero'
import {Layout} from '../components/shared/layout'

export default () => {
    return (
        <Layout>
            <h2>Animation Testing - Rotating Logos</h2>
            <MHIRotatingLogo />
        </Layout>
    )
}
