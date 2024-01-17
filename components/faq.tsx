import React, { useState } from 'react';
import { DBSingleton } from '../util/databaseSingleton';
import { Layout } from '../components/Layout';
import { FAQ } from '../types/faq';

interface FaqPageProps {
  faqs: FAQ[];
}

const FaqPage: React.FC<FaqPageProps> = ({ faqs }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    question: '',
  });

  // Filter FAQs based on search term
  const filteredFaqs = faqs.filter(faq =>
    faq.Question.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      // Send the formData to your API endpoint
      const response = await fetch('/api/submitQuestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      // Check if the request was successful
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
  
      // You can parse the response if needed
      const data = await response.json();
  
      // Reset form or handle success
      setFormData({ name: '', email: '', question: '' });
      // Optionally, update your local state or notify the user
  
    } catch (error) {
      console.error('Failed to submit question:', error);
      // Handle error (show error message, etc.)
    }
  };
  return (
    <Layout>
      <div className="faq-page">
        <h1>FAQs</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search FAQs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {filteredFaqs.map(faq => (
          <div key={faq.Id} className="faq-item">
            <h3>{faq.Question}</h3>
            <p>{faq.Answer}</p>
            {faq.Link && (
              <a href={faq.Link.url} className="faq-link">
                {faq.Link.text}
              </a>
            )}
          </div>
        ))}
      </div>
      <div className="submit-question-form">
        <h2>Submit a Question</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <textarea
            placeholder="Your Question"
            value={formData.question}
            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  const db = DBSingleton.getInstance();
  const faqs = db.getFaqs();

  return {
    props: { faqs },
  };
};

export default FaqPage;
