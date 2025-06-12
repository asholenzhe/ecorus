import { useState, useEffect } from 'react';
import './header.css';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router';
import { AppDispatch, RootState } from '../../app/store';
import { clearCredentials } from '../../features/userSlice';
import AuthorizedPart from './AuthorizedPart';
import GuestsPart from './GuestsPart';
import { Modal } from '../Modal/Modal';
import { fetchCities } from '../../api/city';
import { setCities, setCity } from '../../features/citySlice';

export default function Header() {
    const selectedCity = useSelector((state: RootState) => state.city.selected);
    const cities = useSelector((state: RootState) => state.city.cities);
    const dispatch = useDispatch<AppDispatch>();
    const { token, balance, name } = useSelector((state: RootState) => state.user);
    const city = useSelector((state: RootState) => state.city.selected?.name);

    const [isAuthModalOpen, setAuthModalOpen] = useState(false);
    const [modalInitialMode, setModalInitialMode] = useState<'login' | 'register' | 'email' | 'confirm'>('login');

    const openModal = (mode: 'login' | 'register' | 'email' | 'confirm' = 'login') => {
        setModalInitialMode(mode);
        setAuthModalOpen(true);
    };
    const closeModal = () => setAuthModalOpen(false);

    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(open => {
            const newState = !open;
            if (newState) {
                document.body.classList.add('mobile-menu-open');
            } else {
                document.body.classList.remove('mobile-menu-open');
            }
            return newState;
        });
    };

    useEffect(() => {
        return () => {
            document.body.classList.remove('mobile-menu-open');
        };
    }, []);

    useEffect(() => {
        fetchCities()
            .then(data => {
                dispatch(setCities(data.map(c => ({ id: c.id, name: c.name }))));
                const savedId = Number(localStorage.getItem('cityId'));
                const initial = data.find(c => c.id === savedId) || data[0];
                dispatch(setCity({ id: initial.id, name: initial.name }));
            })
            .catch(err => console.error('Ошибка загрузки городов', err));
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(clearCredentials());
        localStorage.removeItem('token');
    };

    const handleCityChange = (cityId: number) => {
        const city = cities.find(c => c.id === cityId);
        if (city) {
            dispatch(setCity(city));
            localStorage.setItem('cityId', cityId.toString());
        }
        toggleMobileMenu();
    };

    const handleNavClick = () => {
        if (isMobileMenuOpen) {
            toggleMobileMenu();
        }
    };

    return (
        <>
            <nav className="header">
                <NavLink to="/" className="header__logo">
                    <img src="src/assets/logo.svg" alt="Logo" />
                </NavLink>
                <ul className="header__nav">
                    <li className="header__nav-link"><NavLink to="/">Главная</NavLink></li>
                    <li className="header__nav-link"><NavLink to="/points">Пункты Сбора</NavLink></li>
                    <li className="header__nav-link"><NavLink to="/market">ЭкоМаркет</NavLink></li>
                    <li className="header__nav-link"><NavLink to="/about">О сервисе</NavLink></li>
                </ul>
                <div className="header__right">
                    <div className="header__location">
                        <img src="src/assets/geo.svg" alt="Geo" className="header__icon" />
                        <h3 className="header__location-text">{city || 'Ваш город'}</h3>
                    </div>

                    {token ? (
                        <AuthorizedPart coins={balance} userName={name!} />
                    ) : (
                        <GuestsPart onLogin={() => openModal('login')} onLogout={handleLogout} />
                    )}

                    <img
                        src="src/assets/menu.svg"
                        alt="Menu"
                        className="header__menu"
                        onClick={toggleMobileMenu}
                    />
                </div>
            </nav>

            {isMobileMenuOpen && (
                <div className="mobile-drawer">
                    <div className="mobile-drawer-header">
                        <div className="drawer-close" onClick={toggleMobileMenu}>
                            <img src="/src/assets/close.svg" alt="Close"/>
                        </div>
                    </div>
                    <div className="mobile-acc-wrapper">
                        {token ? (
                            <AuthorizedPart coins={balance} userName={name!}/>
                        ) : (
                            <GuestsPart onLogin={() => openModal('login')} onLogout={handleLogout}/>
                        )}
                    </div>

                    <ul className="mobile-nav-list">
                        <li><NavLink to="/" onClick={handleNavClick}>Главная</NavLink></li>
                        <li><NavLink to="/points" onClick={handleNavClick}>Пункты сбора</NavLink></li>
                        <li><NavLink to="/market" onClick={handleNavClick}>ЭкоМаркет</NavLink></li>
                        <li><NavLink to="/about" onClick={handleNavClick}>О сервисе</NavLink></li>
                    </ul>

                    <div className="mobile-location">
                        <img src="src/assets/geo.svg" alt="Геолокация"/>
                        <select
                            value={selectedCity?.id || ''}
                            onChange={e => handleCityChange(Number(e.target.value))}
                        >
                            {cities.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}

            <div>
                <Modal isOpen={isAuthModalOpen} onClose={closeModal} initialMode={modalInitialMode}/>
            </div>
        </>
    );
}
