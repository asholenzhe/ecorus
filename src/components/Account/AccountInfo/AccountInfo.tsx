import "./account_info.css";
import { useDispatch } from "react-redux";
import { clearCredentials } from "../../../features/userSlice";
import {useNavigate} from "react-router-dom";

interface AccountInfoProps {
    name: string;
    tel: string;
    mail: string;
}

export default function AccountInfo(props: AccountInfoProps) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function handleLogout() {
        dispatch(clearCredentials());
        navigate('/');
    }

    return (
        <section className="account">
            <img src="./src/assets/avatar.svg" alt="Avatar" />
            <div className="account__info">
                <h2>{props.name}</h2>
                <div className="account__address">
                    <h3>{props.tel}</h3>
                    <h3>{props.mail}</h3>
                </div>
            </div>
            <button onClick={handleLogout}>Выйти</button>
        </section>
    );
}
