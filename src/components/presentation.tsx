'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

export function Presentation() {
  const profile = {
    name: 'Vaibhav Arya',
    age: '21 years old',
    location: 'Gadarpur, Uttarakhand, India',
    description:
      "Hey 👋\nI'm Vaibhav, an aspiring AI/ML Engineer and B.Tech student. I'm passionate about building great products, hitting the gym, and all things tech. Currently focused on acing my first internship!",
    src: '/profile-vaibhav.png',
    fallbackSrc:
      'https://www.canva.com/design/DAGcSdZSNuA/GBsw-ONnH89N-s6EmfYkVQ/edit?utm_content=DAGcSdZSNuA&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
  };

  const tags = ['AI', 'Machine Learning', 'Developer', 'GGSIPU', 'Delhi', 'Sport'];

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const paragraphAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        delay: 0.2,
      },
    },
  };

  return (
    <div className="mx-auto w-full max-w-5xl py-6 font-sans">
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        {/* Image section */}
        <div className="relative mx-auto aspect-square w-full max-w-sm">
          <div className="relative h-full w-full overflow-hidden rounded-2xl">
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
              className="h-full w-full"
            >
              <Image
                src={profile.src}
                alt={profile.name}
                width={500}
                height={500}
                className="h-full w-full object-cover object-center"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = profile.fallbackSrc;
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* --- THIS IS THE UPDATED PART --- */}
        <div className="flex flex-col">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            {/* Name style updated */}
            <h1 className="text-3xl font-bold text-foreground md:text-4xl">
              {profile.name}
            </h1>
            <div className="mt-2 flex flex-col gap-1 md:flex-row md:items-center md:gap-3">
              {/* Age and Location style updated */}
              <p className="text-neutral-600 dark:text-neutral-400">{profile.age}</p>
              <div className="bg-neutral-400 hidden h-1.5 w-1.5 rounded-full md:block" />
              <p className="text-neutral-600 dark:text-neutral-400">{profile.location}</p>
            </div>
          </motion.div>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={paragraphAnimation}
            className="text-foreground mt-6 leading-relaxed whitespace-pre-line"
          >
            {profile.description}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-6 flex flex-wrap gap-2"
          >
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Presentation;