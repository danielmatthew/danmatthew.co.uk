import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

export default ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark

  return (
    <div>
      <h4>{data.allMarkdownRemark.totalCount} posts</h4>

      {posts
        .filter(post => post.node.frontmatter.title.length > 0)
        .map(({ node: post }) => (
          <div key={post.id}>
            <Link to={post.fields.slug}>
              <h3>
                {post.frontmatter.title} - <span>{post.fields.date}</span>
              </h3>
              <p>{post.excerpt}</p>
            </Link>
          </div>
        ))}
    </div>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { fields: [fields___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
          }
          fields {
            slug
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
