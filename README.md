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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Notion CMS

The Writing and Lessons sections can read from a Notion data source in production. If Notion env vars are missing or a Notion request fails, the app falls back to the local MDX files in `content/writing` and `content/lessons`.

Both listing pages support URL-based search, filters, and pagination:

- `/writing?q=docker&category=Technical&tag=devops&page=2`
- `/lessons?q=auth&severity=Medium&tag=deployment&page=2`

Create one Notion database/data source, then share it with your Notion integration. Use these properties:

| Property | Type | Notes |
| --- | --- | --- |
| `Name` | Title | Display title |
| `Type` | Select | `Writing` or `Lesson` |
| `Status` | Select or Status | `published` renders publicly |
| `Visibility` | Select or Status | `public` renders publicly; omit or leave empty to default public |
| `Slug` | Text | URL slug, for example `docker-finally-clicked` |
| `Date` | Date | Sort date |
| `Tags` | Multi-select | Card/detail tags |
| `Excerpt` | Text | Writing card summary; also a fallback for lesson text |
| `Category` | Select or Text | Writing only |
| `Mood` | Select or Text | Writing only |
| `Severity` | Select or Text | Lesson only: `Low`, `Medium`, `High`, or `Critical` |
| `System` | Text | Lesson only |
| `Lesson` | Text | Lesson only |
| `RelatedProject` | Text | Optional project slug |
| `RelatedLesson` | Text | Optional related lesson slug for Writing |

Each Notion row is one post. Write the post body inside the Notion page content, not in a database property.

Set these environment variables locally and in deployment:

```bash
NOTION_TOKEN=secret_xxx
NOTION_CONTENT_DATA_SOURCE_ID=your_data_source_id
NOTION_REVALIDATE_SECONDS=3600
```

`NOTION_REVALIDATE_SECONDS` is optional and controls the server-side cache window for Notion reads.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
