import React from 'react'
import Directory from '../../components/directory/directory.component.jsx'
// import './homepage.styles.scss'
import {HomePageContainer} from './homepage.styled'

const HomePage = ()=> {
    return(
        // <div className="homepage">
        //     <Directory />
        // </div>
        <HomePageContainer>
            <Directory />
        </HomePageContainer>
    )
}

export default HomePage