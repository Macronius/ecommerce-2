import React from 'react';
import {connect} from 'react-redux'

import { createStructuredSelector } from 'reselect';
import {selectDirectorySections} from '../../redux/directory/directory.selectors'

import MenuItem from '../menu-item/menu-item.component.jsx'
import '../directory/directory.styles.scss'
import '../menu-item/menu-item.styles.scss'

const Directory = ({sections})=> (
    <div className="directory-menu">
        {
            sections.map( ({id, ...otherSectionProps})=> (
                <MenuItem 
                    key={id} 
                    {...otherSectionProps}
                />
            ))
        }
    </div>
)


const mapStateToProps = createStructuredSelector(
    {
        sections: selectDirectorySections,
    }
)

export default connect(mapStateToProps)(Directory);

//QUESTION: why mapStateToProps instead of mapDispatchToProps?
//?ANSWER: because no action created to dispatch?