import { Metadata } from 'next';
import ContactPage from './client';

export const metadata: Metadata = {
  title: 'Contact Us - Rajasthan News',
  description: 'Get in touch with Rajasthan News. Send us your queries, feedback, or news tips.',
  keywords: 'contact, rajasthan news, get in touch, feedback, news tips',
};

export default function Page() {
  return <ContactPage />;
}







