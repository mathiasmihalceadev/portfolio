"use client";

import {useRef} from "react";
import Image from "next/image";
import Link from "next/link";
import {motion, useInView} from "framer-motion";
import projects from "../../projects.json";
import {GithubLogo, LinkedinLogo, ReadCvLogo} from "@phosphor-icons/react";

function ProjectName({children}) {
    const ref = useRef(null);
    const isInView = useInView(ref, {once: true});

    return (
        <div className="flex items-end h-full" ref={ref}>
            <span style={{
                transform: isInView ? "none" : "translatey(+36px)",
                opacity: isInView ? 1 : 0,
                transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.4s"
            }}>
                {children}
            </span>
        </div>
    )
}

export default function Home() {
    const ref = useRef(null);
    const isInView = useInView(ref, {once: true});

    return (
        <main className="px-4 py-8 xl:px-8 xl:text-center xl:pt-24">
            <section className="xl:pb-24">
                <div>
                    <div className="max-w-40 mb-8 relative xl:mx-auto">
                        <Image
                            src="/profile-picture.png"
                            alt="Example Image"
                            width={500}
                            height={300}
                            layout="responsive"
                        />
                        <motion.div
                            className="bg-stone-100 flex gap-2 items-center tracking-tighter text-lg font-medium px-4 py-1 rounded-lg absolute top-12 right-[-176px]"
                            initial={{opacity: 0, y: -20, rotate: 0}}
                            animate={{opacity: 1, y: 0, rotate: -6}}
                            transition={{duration: 0.5, ease: "easeOut"}}
                        >
                            <p>Mathias Alexander</p>
                            <div className="max-w-6">
                                <Image
                                    src="/wave.png"
                                    alt="Example Image"
                                    width={500}
                                    height={300}
                                    layout="responsive"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
                <div>
                    <h1 className="tracking-tighter text-stone-100 font-medium text-4xl mb-2">I build websites, web apps
                        and...
                        everything web related.</h1>
                    <p className="text-stone-400 tracking-tighter font-medium text-lg mb-8">Web developer, passionate
                        about
                        creating. <br/> I love a challenge and I love working with people and for people.</p>
                    <div className="flex items-center gap-6 mb-16 xl:justify-center">
                        <button className="bg-stone-100 tracking-tighter px-4 py-1 text-lg font-medium rounded-lg">Ask
                            me
                            more
                        </button>
                        <Link
                            href="/CV.pdf"
                            target="_blank"
                            rel="noopener noreferrer">
                            <ReadCvLogo className="text-white" size={28}/>
                        </Link>
                        <Link
                            href="https://www.linkedin.com/in/mathias-mihalcea-70b99a176?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                            target="_blank"
                            rel="noopener noreferrer">
                            <LinkedinLogo className="text-white" size={28}/>
                        </Link>
                        <Link
                            href="https://github.com/mathiasmihalceadev"
                            target="_blank"
                            rel="noopener noreferrer">
                        <GithubLogo className="text-white" size={28}/>
                        </Link>
                    </div>
                </div>
            </section>
            <section className="flex flex-col gap-12 xl:grid xl:grid-cols-3">
                {projects.map((project) => (
                    <div key={project.slug}>
                        <Link href={`/${project.slug}`}>
                            <div className="w-full h-64 xl:h-80 rounded-xl relative hover:-translate-y-2 duration-200"
                                 style={{
                                     backgroundImage: `url(${project.imgUrls[0]})`,
                                     backgroundSize: 'cover',
                                     backgroundPosition: 'center center',
                                     backgroundRepeat: 'no-repeat'
                                 }}>
                                <div
                                    className="rounded-xl absolute inset-0 bg-gradient-to-t from-stone-900 to-transparent"></div>
                                <ProjectName>
                                    <h2 className="text-stone-100 relative tracking-tighter font-medium text-2xl p-4">{project.name}</h2>
                                </ProjectName>
                            </div>
                        </Link>
                    </div>
                ))}
            </section>
            <section>
                <div>
                    <p className="text-stone-500 text-sm mt-12 tracking-tighter">Website built with Next.js, Tailwind CSS, Framer Motion,
                        Swiper,
                        Phosphor
                        Icons and JSON.</p>
                </div>
            </section>
        </main>
    );
}