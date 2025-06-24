'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';

const images = [
    '/images/product1.jpg',
    '/images/product6.jpg',
    '/images/product4.jpg',
    '/images/product9.jpg',
    '/images/product8.jpg',
    '/images/product3.jpg',
    '/images/product5.jpg',
    '/images/product7.jpg',
    '/images/product2.jpg',
];

const Advertisement = () => {
    return (
        <section className="w-full max-w-6xl mx-auto p-8 bg-white rounded-xl shadow-lg mb-2">
            <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 5000 }}
                pagination={{ clickable: true }}
                loop
                spaceBetween={30}
                className="rounded-xl shadow"
            >
                {images.map((src, idx) => (
                    <SwiperSlide key={idx}>
                        <Image
                            src={src}
                            alt={`Slide ${idx + 1}`}
                            width={1200}
                            height={400}
                            className="w-full h-[400px] object-cover rounded-xl cursor-grab"
                            priority={idx === 0}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Advertisement;
