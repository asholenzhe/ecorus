import Banner from "../../components/Main/Banner/Banner.tsx";
import {CollectionPointsItem} from "../../components/Main/CollectionPoints/CollectionPointsItem.tsx";
import Footer from "../../components/Footer/Footer.tsx";
import "./home.css"

export default function Home() {
    return (
        <>
            <main>
                <Banner/>
                <div className="main__cards">
                    <CollectionPointsItem title={"Пункты сбора"}
                                          subtitle={"Посмотри, где в твоем городе можно сдать вторсырье на переработку"}
                                          link={"/points"} imagePath={"/src/assets/map.svg"}/>
                    <CollectionPointsItem title={"Эко Маркет"}
                                          subtitle={"Используй заработанные экокоины для покупки товаров из переработанных материалов"}
                                          link={"/market"} imagePath={"/src/assets/ecomarket.svg"}/>
                </div>
            </main>
            <Footer/>
        </>
    )
}