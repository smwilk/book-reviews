module.exports = {
    siteMetadata: {
      title: `gatsby-example-using-markdown-pages`,
      description: `Start your new blog using markdown files`,
      author: `@gatsbyjs`,
    },
    plugins: [
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `markdown-pages`,
          path: `${__dirname}/src/markdown-pages`,
        },
      },
      `gatsby-transformer-remark`,
      `gatsby-plugin-react-helmet`,
      `gatsby-plugin-material-ui`,
      `gatsby-plugin-postcss`,
      `gatsby-plugin-image`,
      `gatsby-plugin-sharp`,
      `gatsby-plugin-extract-schema`
    ],
  }