'use client';

import React from 'react';

export function Contact() {
  const contactInfo = {
    email: 'vaibhavarya338@gmail.com',
    handle: '@vaibhav.aryaa',
    socials: [
      { name: 'LinkedIn', url: 'https://www.linkedin.com/in/vaibhav-arya-737772324/' },
      { name: 'Youtube', url: 'https://www.youtube.com/@vibhavary1399' },
      { name: 'Instagram', url: 'https://www.instagram.com/vaibhav.aryaa/' },
      { name: 'Discord', url: 'https://discord.com/users/vaibhav.aryaa' },
      { name: 'Github', url: 'https://github.com/vaibhav-aryaaa' },
      { name: 'X', url: 'https://x.com/VaibhavArya338' },
    ],
  };

  return (
    <div className="mx-auto mt-12 w-full max-w-3xl">
      {/* Main contact card */}
      <div className="rounded-2xl bg-neutral-100 p-6 shadow-sm ring-1 ring-neutral-200/50 dark:bg-neutral-900/50 dark:ring-neutral-800">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200/80 pb-4 mb-4 dark:border-neutral-800">
          <h2 className="text-2xl font-semibold text-foreground">Contacts</h2>
          <span className="text-sm text-muted-foreground">{contactInfo.handle}</span>
        </div>

        {/* Email */}
        <p
          className="text-blue-400 text-base mb-4 cursor-pointer font-semibold hover:underline dark:text-blue-400"
          onClick={() => window.open(`mailto:${contactInfo.email}`, '_blank')}
        >
          {contactInfo.email}
        </p>

        {/* Social Links as pill-shaped gray cards */}
        <div className="flex flex-wrap gap-4">
          {contactInfo.socials.map((social) => (
            <div
              key={social.name}
              className="bg-gray-200 dark:bg-gray-800 rounded-full px-4 py-2 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors text-sm text-muted-foreground"
              onClick={() => window.open(social.url, '_blank')}
            >
              {social.name}
            </div>
          ))}
        </div>
      </div>

      {/* Descriptive text */}
      <p className="mt-6 text-base text-center text-muted-foreground leading-relaxed">
        You can reach me through the contact info above! Feel free to hit me up anytime, I’d be happy to chat! What's on your mind?
      </p>
    </div>
  );
}

export default Contact;