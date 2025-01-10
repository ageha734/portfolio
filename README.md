# 🏎️💨 2024 Portfolio

> Remix is a full stack web framework that lets you focus on the user interface and work back through web fundamentals to deliver a fast, slick, and resilient user experience. People are gonna love using your stuff.

This repo is rebuild and re-skin of my [NextJS][nextjs] portfolio from 2021. Both are hosted on using [Vercel][vercel] and really both are **incredible**.

That being said I am really excited to see what the future holds for Remix. Its one of those `full circle` moments where in our industry and beautifully orchestrated by Remix. More to come in a blog post, it deserves it.

**Technology:**

- [Remix][remix]
- [React](https://reactjs.org)
- [TailwindCSS](https://tailwindcss.com)
- [GraphCMS][graphcms]

## Setup

Currently the API calls are made to an external service, [GraphCMS][graphcms]. Now, until we can move to [Prisma](https://www.prisma.io/) (or something a little more portable for "local development") you'll see failed API calls 🤷‍♂️.

```bash
# 🔒 Copy the example env file
cp .env.example .env

# Install Yarn or use NPM
proto use

# 📦 Install dependencies
bun install

# 🏎️💨 Start building
bun dev
```

<!-- Links -->

[graphcms]: https://graphcms.com "GraphCMS"
