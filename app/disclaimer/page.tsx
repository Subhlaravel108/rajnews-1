import { Metadata } from 'next';
import DisclaimerPage from './client';

export const metadata: Metadata = {
  title: 'Disclaimer - Rajasthan News',
  description: 'Read our disclaimer to understand the limitations and responsibilities regarding the content on our website.',
};

export default function Page() {
  return <DisclaimerPage />;
}






