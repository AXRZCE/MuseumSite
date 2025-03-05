/*********************************************************************************
*  WEB422 – Assignment 4
*
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
*  Name: Aksharajsinh Parmar   Student ID: 140204223   Date: [Your Date]
********************************************************************************/

import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '@/components/Layout';
import { SWRConfig } from 'swr';

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  return res.json();
};

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  );
}
