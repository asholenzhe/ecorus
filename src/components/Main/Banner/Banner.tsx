import { useState, useRef } from 'react'
import './banner.css'
import { bannerSlides } from './BannerSlideData'
import BannerCarousel  from './BannerCarousel'
import BannerSlide from "./BannerSilde.tsx";

export default function Banner() {
    const [current, setCurrent] = useState(0)
    const touchStartX = useRef<number | null>(null)
    const touchEndX   = useRef<number | null>(null)
    const minSwipeDist = 50

    const onPrev = () => setCurrent(prev => prev === 0 ? bannerSlides.length - 1 : prev - 1)
    const onNext = () => setCurrent(prev => prev === bannerSlides.length - 1 ? 0 : prev + 1)

    function handleTouchStart(e: React.TouchEvent) {
        touchStartX.current = e.targetTouches[0].clientX
    }

    function handleTouchMove(e: React.TouchEvent) {
        touchEndX.current = e.targetTouches[0].clientX
    }

    function handleTouchEnd() {
        if (touchStartX.current !== null && touchEndX.current !== null) {
            const dist = touchStartX.current - touchEndX.current
            if (dist > minSwipeDist) onNext()
            else if (dist < -minSwipeDist) onPrev()
        }
        touchStartX.current = null
        touchEndX.current   = null
    }

    return (
        <section className="banner">
            <div
                className="banner-wrapper"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {bannerSlides.map((slide, index) => (
                    <BannerSlide
                        key={slide.id}
                        {...slide}
                        isActive={index === current}
                    />
                ))}
            </div>

            <BannerCarousel onPrev={onPrev} onNext={onNext}/>
        </section>
    )
}
