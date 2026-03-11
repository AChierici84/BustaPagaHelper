This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## OpenAI Integration

The endpoint `src/app/api/explain/route.ts` can use OpenAI to generate richer explanations.

Create a `.env.local` file in the project root with:

```bash
OPENAI_API_KEY=your_api_key_here
# optional (default: gpt-4.1-mini)
OPENAI_MODEL=gpt-4.1-mini
```

If `OPENAI_API_KEY` is not set, the app automatically falls back to the local glossary.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Sample

<img width="1839" height="815" alt="Screenshot 2026-03-11 102119" src="https://github.com/user-attachments/assets/0ec9109a-375c-46b7-95df-23c8f91f1fb6" />
<img width="1824" height="472" alt="Screenshot 2026-03-11 102142" src="https://github.com/user-attachments/assets/933c0585-cf55-45fd-9538-a38bbf4b0bd2" />
<img width="1841" height="651" alt="Screenshot 2026-03-11 102202" src="https://github.com/user-attachments/assets/0f160568-e1d8-47b7-9664-f20f2f07d1f1" />
<img width="1859" height="700" alt="Screenshot 2026-03-11 102310" src="https://github.com/user-attachments/assets/c24b2044-09e6-4c05-8c6d-924f7757af55" />
<img width="1840" height="770" alt="Screenshot 2026-03-11 102349" src="https://github.com/user-attachments/assets/44e7edba-5bf1-4a25-97ea-675234d1d70d" />
<img width="1831" height="592" alt="Screenshot 2026-03-11 102422" src="https://github.com/user-attachments/assets/ebe6513b-27cf-4c1c-9dc7-ef0b21528ff5" />

