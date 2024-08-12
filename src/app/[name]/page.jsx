"use client";

import Image from "next/image";
import {notFound, usePathname} from "next/navigation";
import projects from "../../../projects.json";
import {Navigation, Pagination, Scrollbar, A11y, EffectFade, Autoplay} from 'swiper/modules';
import {ArrowRight, ArrowLeft, Link as LinkIcon} from "@phosphor-icons/react";

import {Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import Link from "next/link";

const imageLoader = ({src, width, quality}) => {
    return `https://example.com/${src}?w=${width}&q=${quality || 75}`
}

export default function Project() {
    const pathName = usePathname();

    const slug = pathName.slice(1);

    console.log(slug);

    const project = projects.find((p) => p.slug === slug);

    if (!project) {
        return notFound();
    }

    return (
        <main className="text-white tracking-tighter px-8 py-8 xl:max-w-[1020px] xl:mx-auto">
            <div className="container-box relative mb-6">
                <div className="small-container aspect-video">
                    <Swiper
                        className="rounded-3xl"
                        modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade, Autoplay]}
                        slidesPerView={1}
                        loop={true}
                        onSwiper={(swiper) => console.log(swiper)}
                        navigation={{nextEl: ".arrow-right", prevEl: ".arrow-left"}}
                        onSlideChange={() => console.log('slide change')}
                        autoplay={{
                            delay: 3000, // Delay between transitions (in ms)
                            disableOnInteraction: false, // Optional: continues autoplay after user interaction
                        }}
                    >
                        {project.imgUrls.map((url, index) => (
                            <SwiperSlide key={index}>
                                <div
                                    className="relative w-full overflow-hidden aspect-video"> {/* Added overflow-hidden */}
                                    <Image
                                        src={url}
                                        alt="Example Image"
                                        fill={true}
                                        style={{objectFit: "cover", objectPosition: "center", borderRadius: "24px"}}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <button
                    className="arrow-left arrow ml-2 bg-stone-800/40 p-2 rounded-full backdrop-blur-sm hover:bg-stone-800 duration-200">
                    <ArrowLeft
                        size={28}
                        weight="bold"/>
                </button>
                <button
                    className="arrow-right arrow mr-2 bg-stone-800/40 p-2 rounded-full backdrop-blur-sm hover:bg-stone-800 duration-200">
                    <ArrowRight size={28} weight="bold"/></button>
            </div>
            <h1 className="tracking-tighter text-stone-100 font-medium text-3xl mb-2 xl:text-4xl">{project.name}</h1>
            <ul className="mb-2 flex flex-wrap">
                {project.technologies.map((technology) => (
                    <li key={technology}
                        className="mr-2 mb-2 bg-stone-100 text-stone-900 font-semibold py-1 px-2 rounded-lg">{technology}</li>
                ))}
            </ul>
            {project.url &&
                <span className="flex gap-2 items-center mb-4 hover:underline">
                <LinkIcon className="color-stone-100" size={20}/>
                <Link
                    href={project.url}
                    className="text-lg"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                See project
                </Link>
            </span>
            }
            <div className="text-stone-400 tracking-tighter font-medium text-lg">
                <div dangerouslySetInnerHTML={{__html: project.description}}/>
            </div>
        </main>
    );
}

