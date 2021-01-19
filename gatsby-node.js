const fetch = require(`node-fetch`)

exports.createPages = async ({ actions, graphql, reporter }) => {
    const { createPage } = actions
  
    const blogPostTemplate = require.resolve(`./src/components/blogTemplate.js`)
  
    const result = await graphql(`
      {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          limit: 1000
        ) {
          edges {
            node {
              frontmatter {
                slug
                isbn
                genre
              }
            }
          }
        }
      }
    `)
  
    // Handle errors
    if (result.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query.`)
      return
    }
  
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.slug,
        component: blogPostTemplate,
        context: {
          // additional data can be passed via context
          slug: node.frontmatter.slug,
          isbn: node.frontmatter.isbn,
          genre: node.frontmatter.genre
        },
      })
    })
  }

  exports.sourceNodes = async ({
    actions: { createNode },
    createContentDigest,
  }) => {
    // get data from GitHub API at build time
    const result = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:9780062316097`)
    const resultData = await result.json()
    // create node for build time data example in the docs
    createNode({
      myBook: resultData,
      // required fields
      id: `bookshelf`,
      parent: null,
      children: [],
      internal: {
        type: `bookshelf`,
        contentDigest: createContentDigest(resultData),
      },
    })
  }