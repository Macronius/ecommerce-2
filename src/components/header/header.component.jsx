import React from 'react'



import {connect} from 'react-redux'

import {createStructuredSelector} from 'reselect'

import {auth} from '../../firebase/firebase.utils'

import {ReactComponent as Logo} from '../../assets/crown.svg'

import './header.styles.scss'
import {
    HeaderContainer,
    LogoContainer,
    OptionsContainer,
    OptionLink,
    OptionDiv
} from './header.styled'

import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'

import {selectCartHidden} from '../../redux/cart/cart.selectors'
import {selectCurrentUser} from '../../redux/user/user.selectors'



//NOTES: alternate solution
//NOTE: by define the Link styled-component in header.styled.jsx, Link is no longer needed here
//THOUGHT: not sure I like this disconnection of Link from react-router-dom in the actual component

// import {Link} from 'react-router-dom'

// const Header = ({currentUser, hidden})=> (
//     <div className="header">
//         <Link className="logo-container" to="/">
//             <Logo className="logo" />
//         </Link>
//         <div className="options">
//             <Link className="option" to="/shop">
//                 SHOP
//             </Link>
//             <Link className="option" to="/contact">
//                 CONTACT
//             </Link>
//             {
//                 currentUser
//                 ? (
//                     <div 
//                         className="option"
//                         onClick={ ()=> auth.signOut()}
//                     >
//                         SIGN OUT
//                     </div>
//                 ) : (
//                     <Link
//                         className="option"
//                         to="/signin"
//                     >
//                         SIGN IN
//                     </Link>
//                 )
//             }
//             <CartIcon />
//         </div>
//         {
//             hidden ? null : <CartDropdown />
//         }
//     </div>
// )


const Header = ({currentUser, hidden})=> (
    <HeaderContainer>
        <LogoContainer to="/">
            <Logo className="logo" />
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to="/shop">
                SHOP
            </OptionLink>
            <OptionLink to="/contact">
                CONTACT
            </OptionLink>
            {
                currentUser
                ? (
                    <OptionDiv onClick={ ()=> auth.signOut()}>
                        SIGN OUT
                    </OptionDiv>
                    // <OptionLink as='div' onClick={ ()=> auth.signOut()}>
                    //     SIGN OUT
                    // </OptionLink>
                ) : (
                    <OptionLink to="/signin">
                        SIGN IN
                    </OptionLink>
                )
            }
            <CartIcon />
        </OptionsContainer>
        {
            hidden ? null : <CartDropdown />
        }
    </HeaderContainer>
)


const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})


export default connect(mapStateToProps)(Header)