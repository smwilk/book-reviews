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
    getNodesByType,
    createContentDigest,
  }) => {
    // get already parsed Markdown file data nodes
    const allMarkdownRemarks = getNodesByType("MarkdownRemark")

    // fetch book information from Google Books API
    let fetchBookResults = await Promise.all(
      allMarkdownRemarks.map(async (remark) => { 
        const result = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${remark.frontmatter.isbn}`)
        return result.json()
      })
    )

    // transfrom the books API data, add isbn for convenience
    const resultData = fetchBookResults.map((result, i) => {
      return {
        ...result.items[0], isbn: allMarkdownRemarks[i].frontmatter.isbn
      }
    })

    // create node for build time data example in the docs
    createNode({
      bookShelfData: resultData,
      // required fields
      id: `bookshelf`,
      parent: null,
      children: [],
      internal: {
        type: `bookshelf`,
        contentDigest: createContentDigest(resultData),
      },
    })

    resultData.forEach(result => {
      createNode({
        bookData: result,
        // required fields
        id: result.isbn,
        parent: `bookshelf`,
        children: [],
        internal: {
          type: `book`,
          contentDigest: createContentDigest(result),
        },
      })
    })
  }