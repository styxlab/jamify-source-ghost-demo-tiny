import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.allGhostPost.edges[0].node
  const siteTitle = "Minimial Jamify Source Ghost"
  const { previous, next } = pageContext
  const transformedHtml = post.childHtmlRehype && post.childHtmlRehype.html
  
  console.log(`slug: ${post.slug}, length: ${transformedHtml && transformedHtml.length}`)

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.title}
        description={post.excerpt}
      />
      <article>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
          >
            {post.title}
          </h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1),
            }}
          >
            {post.published_at}
          </p>
        </header>
        <section dangerouslySetInnerHTML={{ __html:  transformedHtml || post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <footer>
          <Bio />
        </footer>
      </article>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={`/${previous.slug}/`} rel="prev">
                ← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={`/${next.slug}/`} rel="next">
                {next.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    allGhostPost(filter: {slug: { eq: $slug }})  {
      edges {
        node {
          id
          slug
          excerpt
          html
          title
          published_at
          childHtmlRehype {
            html
          }          
        }
      }
    }
  }
`
