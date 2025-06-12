export interface BannerSlide  {
    id: number;
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    imageUrl: string;
    text: string;
    backgroundColor: string;
}

export const bannerSlides: BannerSlide[] = [
    {
        id: 1,
        title: 'Сделаем мир чище',
        subtitle: 'Сдай макулатуру или старую одежду и получи скидку на покупку товаров из переработанных материалов',
        ctaText: 'Условия сервиса',
        ctaLink: '/service',
        imageUrl: './src/assets/banner_img1.svg',
        text: 'Banner Slide 1',
        backgroundColor: '#B3EDC8',
    },
    {
        id: 2,
        title: 'А вы знали…',
        subtitle: 'что среднее время разложения пластмассовых изделий колеблется от 400 до 700 лет,  а полиэтиленовых пакетов — от 100 до 200 лет? ',
        ctaText: 'Узнать больше',
        ctaLink: '/facts',
        imageUrl: './src/assets/banner_img2.svg',
        text: 'Banner Slide 2',
        backgroundColor: '#FFE48F',
    },
    {
        id: 3,
        title: 'Что с масками?',
        subtitle: 'Медицинские маски не обязательно должны становиться отходами.Их тоже можно сдать на переработку.',
        ctaText: 'Пункт сбора масок',
        ctaLink: '/masks',
        imageUrl: './src/assets/banner_img3.svg',
        text: 'Banner Slide 3',
        backgroundColor: '#BFF0DE',
    },
];