// pages/faq.tsx

import React from 'react';
import FaqPage from '../components/faq'; // Import FaqPage from components
import { DBSingleton } from '../util/databaseSingleton';
import { FAQ } from '../types/faq';

interface FaqPageProps {
  faqs: FAQ[];
}

// The page component now only fetches the data and passes it to the imported component
const FaqPageContainer: React.FC<FaqPageProps> = ({ faqs }) => {
  return <FaqPage faqs={faqs} />;
};

export async function getStaticProps() {
  const db = DBSingleton.getInstance();
  const faqs = db.getFaqs();

  return {
    props: { faqs },
  };
};

export default FaqPageContainer;
