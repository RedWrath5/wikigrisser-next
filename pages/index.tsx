import { gql } from "@apollo/client";
import { GetStaticProps } from "next";
import { Layout } from "../components/Layout";
import { client } from "../lib/apollo";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const WordPressPageComponent = ({ result }: { result: WordPressPage }) => {
  return (
    <>
      {result.enqueuedStylesheets.nodes.map((node) => (
        <link
          key={node.src}
          rel="stylesheet"
          type="text/css"
          href={node.src}
          media="screen"
        />
      ))}
      <link
        rel="stylesheet"
        type="text/css"
        href="https://www.leyviur.net/wp-content/plugins/elementor/assets/css/frontend.min.css?ver=3.2.2"
        media="screen"
      />
      <div className="home page-template page-template-template page-template-page page-template-fullwidth page-template-templatepagefullwidth-php page page-id-46 wp-custom-logo boldgrid-ppb ast-single-post ast-inherit-site-logo-transparent astra-hfb-header ast-desktop ast-plain-container ast-no-sidebar astra-3.2.0 ast-full-width-primary-header ast-normal-title-enabled elementor-default elementor-kit-9 elementor-page elementor-page-46 boldgrid-editor-template e--ua-blink e--ua-chrome e--ua-webkit ast-mouse-clicked">
        <div className="hfeed site" id="page">
          <div id="content" className="site-content">
            <div className="ast-container">
              <main className="main bg-custom-template " role="main">
                <div className="bge-content-main">
                  <article
                    id="post-46"
                    className="bg-page-article post-46 page type-page status-publish ast-article-single"
                    dangerouslySetInnerHTML={{ __html: result.content }}
                  ></article>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Home = ({ result }: { result: WordPressPage }) => {
  const pageTarget = React.createRef<HTMLDivElement>();

  useEffect(() => {
    console.log("foo");
    if (!pageTarget.current!.shadowRoot) {
      pageTarget.current?.attachShadow({ mode: "open" });
      const targetElement = pageTarget?.current?.shadowRoot;
      if (targetElement)
        ReactDOM.render(
          <WordPressPageComponent result={result} />,
          targetElement
        );
    }
  });
  return (
    <Layout>
      <div
        className="bg-black flex justify-center"
        style={{ width: "100%" }}
        ref={pageTarget}
      ></div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const result = await client.query<{ page: WordPressPage }>({
    query: gql`
      {
        page(id: "cG9zdDo0Ng==") {
          id
          title
          content
          enqueuedStylesheets {
            nodes {
              handle
              src
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      result: result.data.page,
    },
  };
};

export default Home;

interface WordPressPage {
  id: string;
  title: string;
  content: string;
  enqueuedStylesheets: {
    nodes: { src: string }[];
  };
}
