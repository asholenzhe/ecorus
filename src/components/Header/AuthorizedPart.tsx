import './header.css'
import {NavLink} from "react-router";

type Props = {
    coins: number
    userName: string
}

export default function AuthorizedPart({ coins, userName}: Props) {
    return (
        <>
            <div className="header__user-info">
                <div className="header__user-coins">
                    <img src="src/assets/coin.svg" alt="Coin" className="header__icon"/>
                    <h3 className="header__coins">{coins}</h3>
                </div>
                <div className="header__user-name">
                    <img src="src/assets/avatar.svg" alt="Avatar" className="header__avatar"/>
                    <NavLink to="/profile" className="header__username">{userName}</NavLink>
                </div>
            </div>
            <div className="header__user-info--mobile">
                <div className="header__user-name--mobile">
                    <img src="src/assets/avatar.svg" alt="Avatar" className="header__avatar"/>
                    <NavLink to="/profile" className="header__username--mobile">{userName}</NavLink>
                </div>
                <div className="header__user-coins--mobile">
                    <img src="src/assets/coin.svg" alt="Coin" className="header__icon--mobile"/>
                    <h3 className="header__coins--mobile">{coins}</h3>
                </div>
            </div>
        </>

    )
}
