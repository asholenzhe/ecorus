import './App.css'
import Account from "./pages/Account/Account.tsx";
import {Route, Routes} from "react-router";
import Home from "./pages/Home/Home.tsx";
import Market from "./pages/Market/Market.tsx";
import {CollectionPoints} from "./pages/CollectionPoints/CollectionPoints.tsx";
import Header from "./components/Header/Header.tsx";


export function App() {
  return (
    <>
        <Header/>
        <Routes>
            <Route path="/market"  element={<Market/>} />
            <Route path="/" element={<Home/>} />
            <Route path="/profile" element={<Account/>} />
            <Route path="/points" element={<CollectionPoints/>} />
        </Routes>
    </>
  )
}
