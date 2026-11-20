---
id: 20-11-2026-new-website-v6
title: "V6 of my portfolio"
description: "Why I moved to Vue 3, Nuxt, Tailwind 4 and i18n, with a Spring Boot contact API, and why this version is built to last."
image: "https://cdn.farmeurimmo.fr/img/blog/20-11-2026-new-website-v6.jpg"
date: "2026-11-20T20:00:00.000Z"
tags:
  - Website
  - Portfolio
  - Vue
  - Nuxt
  - TailwindCSS
  - Spring Boot
author:
  name: "Farmeurimmo"
  picture: "https://cdn.farmeurimmo.fr/img/logo.png"
---

# V6 of My Portfolio

Yes, another version. But this one is different: it's meant to stay for a long time.

(Everyone says that, but this time I mean it.)

The content doesn't change much. The home page, projects, blog and contact page are still here. The difference is
under the hood.

## Tech Stack

- Vue 3
- Nuxt
- Tailwind CSS 4
- Nuxt i18n
- Spring Boot (contact form API)
- Cloudflare Pages (hosting)

## Why Vue 3?

Short answer: I switched sides. After using React for the previous version, I simply prefer Vue 3. It's more intuitive,
less verbose, and I don't have to fight the framework to do simple things.

It's also what I use every day. During my work-study program, I work full time with Vue 3, both plain Vue and Quasar,
and I've also used Vuetify. Using the same stack for my portfolio means less context switching and fewer surprises.

## Why Nuxt?

Because it gives me what I need without adding complexity:

- It's Vue 3, so same syntax, same habits
- Everything is Markdown: blog articles and projects are just `.md` files
- SEO and sitemap handled out of the box
- Cloudflare Turnstile for spam protection on the contact form
- Color mode (dark and light) without custom code
- Static generation, no SSR server to maintain

The site is fully pre-rendered and hosted on Cloudflare Pages. No server, no runtime, nothing to break at 3 AM.

## Why Tailwind 4 (again)?

You don't change a winning team. Tailwind 4 was already in V5 and it works well.

This time, though, I used it more carefully. Utility classes everywhere with no shared conventions quickly turn into a
mess, so I kept things more consistent and reused components instead of copy-pasting class lists.

## Contact Form

The contact form is backed by a small Spring Boot API hosted on a VPS. When someone sends a message, it's forwarded to
me through a Telegram bot, so I get notified instantly.

The source code is available here:
[portfolio-v6-contactform-api](https://github.com/Farmeurimmo/portfolio-v6-contactform-api)

Why Spring Boot for something this small? Because it's the backend I use at work. I run large applications on it,
on AWS and elsewhere, without issues. I know how it behaves, how to deploy it and how to debug it. Picking a familiar
tool beats picking a trendy one.

## Features

- Multilingual (French and English) with i18n
- Blog and projects written in Markdown
- Contact form with Turnstile protection and Telegram notifications
- Dark mode + light mode
- Responsive design
- Legal mentions
- Automatic sitemap
- Pre-rendered pages for SEO

## Why This Is the Last Version (for a While)

I've redesigned this site almost every year. That stops here.

Vue 3 is stable, mature and easy to maintain. The code isn't ugly, and even if I write React elsewhere, Vue stays more
intuitive to me, so coming back to this project months later won't be painful. Add static hosting on top of that and
there's very little left that can break.

The goal now is to spend time on content instead of rewrites.

## Conclusion

That's it for V6. If you have questions or feedback, use the contact form (it goes straight to my Telegram) or reach
me on social media.

Thanks for reading!