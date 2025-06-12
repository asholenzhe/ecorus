import './banner.css';

type BannerCarouselProps = {
    onPrev: () => void;
    onNext: () => void;
}

export default function BannerCarousel({onPrev, onNext}: BannerCarouselProps) {
    return (
        <div className="banner-carousel">
            <button className="carousel-btn left" onClick={onPrev}>
                <img src="./src/assets/arrow_left.svg" alt="Carousel Control Left"/>
            </button>
            <button className="carousel-btn right" onClick={onNext}>
                <img src="./src/assets/arrow_right.svg" alt="Carousel Control Right"/>
            </button>
        </div>
    )
}