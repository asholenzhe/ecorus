import './collection_points.css'
import {NavLink} from "react-router";

type CollectionPointsItemProps = {
    title: string,
    subtitle: string,
    link: string,
    imagePath: string,
}

export function CollectionPointsItem ({title, subtitle, link, imagePath}: CollectionPointsItemProps) {
    return (
        <div className="card">
            <div className="card-container">
                <div className="card-container__text">
                    <h3>{title}</h3>
                    <p>{subtitle}</p>
                </div>
                <NavLink to={link} className="card-container__btn">
                    <img src="./src/assets/collection_points-btn.svg" alt="Button"/>
                </NavLink>
            </div>
            <img src={imagePath} className="card__img" alt="Map image"/>
        </div>
    )
}