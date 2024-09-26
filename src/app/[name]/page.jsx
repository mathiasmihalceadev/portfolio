"use client";

import Image from "next/image";
import {notFound, usePathname} from "next/navigation";
import projects from "../../../projects.json";
import {Navigation, Pagination, Scrollbar, A11y, EffectFade, Autoplay} from 'swiper/modules';
import {
    ArrowRight,
    ArrowLeft,
    Link as LinkIcon,
    CaretRight,
    CaretLeft,
    ReadCvLogo,
    LinkedinLogo, GithubLogo
} from "@phosphor-icons/react";
import {motion} from "framer-motion";

import {Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import Link from "next/link";
import {useState} from "react";

const imageLoader = ({src, width, quality}) => {
    return `https://example.com/${src}?w=${width}&q=${quality || 75}`
}

export default function Project() {
    // const [nextLink, setNextLink] = useState("");
    // const [prevLink, setPrevLink] = useState("");
    const pathName = usePathname();

    const slug = pathName.slice(1);

    const project = projects.find((p) => p.slug === slug);

    if (!project) {
        return notFound();
    }

    const index = projects.findIndex((p) => p.slug === slug);

    console.log(index);

    const nextLink = index+1 < projects.length ? projects[index+1].slug : "";
    const prevLink = index > 0 ? projects[index-1].slug : "";

    const fadeInVariant = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariant}
            transition={{ duration: 0.5 }} // Adjust duration as needed
        >
        <main className="text-white tracking-tighter px-4 xl:px-8 xl:max-w-[1020px] xl:mx-auto">
            <section>
                <div className="flex justify-between items-center pb-8 pt-6 xl:py-8">
                    <Link href="/">
                        <div><p>mathias.dev</p></div>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/Resume%20Mathias%20Alexander%20Mihalcea.pdf"
                            target="_blank"
                            rel="noopener noreferrer">
                            <ReadCvLogo className="text-white transition transform hover:translate-y-[-4px] duration-200" size={24}/>
                        </Link>
                        <Link
                            href="https://www.linkedin.com/in/mathias-mihalcea/"
                            target="_blank"
                            rel="noopener noreferrer">
                            <LinkedinLogo className="text-white transition transform hover:translate-y-[-4px] duration-200" size={24}/>
                        </Link>
                        <Link
                            href="https://github.com/mathiasmihalceadev"
                            target="_blank"
                            rel="noopener noreferrer">
                            <GithubLogo className="text-white transition transform hover:translate-y-[-4px] duration-200" size={24}/>
                        </Link>
                    </div>
                </div>
            </section>
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
            <section>
                <div className={`grid mt-6 w-full ${prevLink && nextLink ? 'grid-cols-2' : 'grid-cols-1'}`}>
                    {prevLink &&
                        <Link href={`/${prevLink}`}>
                            <button className="flex items-center gap-2 bg-stone-100 tracking-tighter px-3 py-1 text-lg font-medium rounded-lg text-stone-900 transition transform hover:translate-y-[-4px] duration-200">
                                <CaretLeft width={14} height={14} weight="bold" />
                                <span>Previous project</span>
                            </button>
                        </Link>
                    }
                    {nextLink &&
                        <Link className="justify-self-end" href={`/${nextLink}`}>
                            <button className="flex items-center gap-2 bg-stone-100 tracking-tighter px-3 py-1 text-lg font-medium rounded-lg text-stone-900 transition transform hover:translate-y-[-4px]">
                                <span>Next project</span>
                                <CaretRight width={14} height={14} weight="bold" />
                            </button>
                        </Link>
                    }
                </div>
            </section>
            <section>
                <div>
                    <p className="text-stone-500 text-sm mt-12 tracking-tighter mb-4">Website built with Next.js, Tailwind
                        CSS, Framer Motion,
                        Swiper,
                        Phosphor
                        Icons and JSON.</p>
                </div>
            </section>
        </main>
        </motion.div>
    );
}

