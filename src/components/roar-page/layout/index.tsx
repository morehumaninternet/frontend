import React from 'react'
import Header from './header'
import Footer from './footer/'

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
    return (
        <>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </>
    )
}

export default Layout
