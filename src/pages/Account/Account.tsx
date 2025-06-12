import AccountInfo from "../../components/Account/AccountInfo/AccountInfo.tsx";
import Tabs from "../../components/Account/Tabs/Tabs.tsx";
import "./account.css";
import Footer from "../../components/Footer/Footer.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store.tsx";

export default function Account() {

    const {name } = useSelector((state: RootState) => state.user);

    return (
        <>
        <section className="account__wrapper" >
            <div>
                <h1>Личный кабинет</h1>
                <AccountInfo name={name ?? "Алексей"} tel={"+7 (917) 888 88 88"} mail={name ?? "ivanov@gmail.com"}/>
            </div>
            <Tabs/>
        </section>
        <Footer />
        </>
    )
}