import { Metadata } from 'next';
import TermsPage from './client';

export const metadata: Metadata = {
  title: 'Terms of Service - Rajasthan News',
  description: 'Read our terms of service to understand the rules and regulations for using our website.',
};

export default function Page() {
  return <TermsPage />;
}






