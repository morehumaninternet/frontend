import React from 'react'
import {MHIRotatingLogo} from '../components/new-landing-page/rotating-Logo'
import Hero from '../components/new-landing-page/hero'
import {Layout} from '../components/shared/layout'
import { blue } from '@material-ui/core/colors'

export default () => {
    return (
        <Layout>
            <h2 style={{color: '#164176', textAlign: 'center', padding: '2rem 0'}}>
                Animation Testing Page - Rotating Logos
            </h2>
            <div className="new-hero" style={{padding: '4rem 0'}}>
                <MHIRotatingLogo />
            </div>
        </Layout>
    )
}
