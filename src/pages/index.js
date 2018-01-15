import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

import About from '../components/About';

export default ({ data }) => {
  const siteTitle = data.site.siteMetadata.title;
  const { edges: posts } = data.allMarkdownRemark;

  return (
    <div>
      <Helmet title={siteTitle} />
      <About />
      <h2>Words</h2>
      {posts
        .filter(post => post.node.frontmatter.title.length > 0)
        .map(({ node: post }) => (
          <div key={post.id}>
            <Link to={post.fields.slug}>
              <h3>{post.frontmatter.title}</h3>
            </Link>
          </div>
        ))}
      <section>
        <h2>Talks</h2>
        <article class="mb1">
          <h3 class="mb0">Hydrahack, March 2017</h3>
          <p>A lightning talk about web components, side projects, and taking care of yourself.</p>
        </article>
        <article class="mb1">
          <h3 class="mb0">"Guided By Voices" – Codelicious, July 2016</h3>
          <p>A short talk demonstrating the difference in experience for screenreader users when a site has been created sympathetically.</p>
        </article>
      </section>
    </div>
  );
};

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [fields___date], order: DESC }
      limit: 10
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
