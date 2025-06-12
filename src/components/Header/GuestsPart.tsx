import './header.css';

type Props = {
    onLogin: () => void;
    onLogout: () => void;
};

export default function GuestsPart({ onLogin, onLogout }: Props) {
    return (
        <>
            <button className="header__login" onClick={onLogin}>
                <img src="src/assets/login.svg" alt="Login"/>
                <h3>Войти</h3>
            </button>
            <button onClick={onLogout} className="header__logout">
                Выйти
            </button>
        </>
    );
}
