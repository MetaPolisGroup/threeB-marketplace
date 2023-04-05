import { FC, ReactNode } from 'react';
import { Footer, Content } from 'components/modules';
import Head from 'next/head';
import Sidebar from 'components/elements/navigation/NavBar/NavBar';
import { Layout } from 'antd';


const Default: FC<{ children: ReactNode; pageName: string }> = ({ children, pageName }) => (
  <Layout>
    <Head>
      <title>{` Three B | ${pageName}`}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Sidebar>
      <Content />
      {children}
    </Sidebar>
    <Footer />
  </Layout>
);

export default Default;
