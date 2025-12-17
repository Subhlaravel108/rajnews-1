import type { Metadata } from "next";
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Articles | Rajasthani News',
  description: 'Browse all articles and news stories from Rajasthani News.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  redirect('/');
}