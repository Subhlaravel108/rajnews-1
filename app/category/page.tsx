import type { Metadata } from "next";
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Categories | Rajasthani News',
  description: 'Browse news by category from Rajasthani News.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  redirect('/');
}