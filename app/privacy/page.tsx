import { Metadata } from 'next';
import PrivacyPage from './client';

export const metadata: Metadata = {
  title: 'Privacy Policy - Rajasthan News',
  description: 'Read our privacy policy to understand how we collect, use, and protect your personal information.',
};

export default function Page() {
  return <PrivacyPage />;
}






