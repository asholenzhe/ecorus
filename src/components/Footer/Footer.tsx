import "./footer.css";

export default function Footer(){
    return (
        <footer>
            <div className="contact-info">
                <address className="mail">
                    <img src="./src/assets/mail_logo.svg" alt="Mail logo"/>
                    <a href="info@ecorus.ru">info@ecorus.ru</a>
                </address>
                <address className="tel">
                    <img src="./src/assets/tel_logo.svg" alt="Telephone logo"/>
                    <a href="+7 (800) 880-88-88">+7 (800) 880-88-88</a>
                </address>
            </div>
        </footer>
    )
}