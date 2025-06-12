import './banner.css';

type BannerSlideProps = {
    title: string;
    subtitle: string;
    ctaLink: string;
    ctaText: string;
    imageUrl: string;
    text: string;
    backgroundColor: string;
    isActive: boolean;
}

export default function BannerSlide({title, subtitle, ctaLink, ctaText, imageUrl, text, isActive, backgroundColor}: BannerSlideProps ) {
    return (
        <div
            className={`banner-slide ${isActive ? 'active' : 'hidden'}`}
            style={{backgroundColor} as React.CSSProperties}>
                <div className="banner-slide__text">
                    <h2 className="banner-slide__title">{title}</h2>
                    <p className="banner-slide__subtitle">{subtitle}</p>
                    <a href={ctaLink} className="banner-slide__btn">
                        {ctaText}
                    </a>
                </div>
                <img
                    src={imageUrl}
                    alt={text}
                    className="banner-slide__image"
                />
        </div>
    )
}