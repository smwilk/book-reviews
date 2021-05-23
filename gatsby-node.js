const fetch = require(`node-fetch`)

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
  type ImageLinks {
    thumbnail: String
  }

  type VolumeInfo {
    title: String
    subtitle: String
    publisher: String
    publishedDate: String
    description: String
    pageCount: Int
    printType: String
    averageRating: Int
    ratingsCount: Int
    maturityRating: String
    allowAnonLogging: Boolean
    contentVersion: String
    language: String
    previewLink: String
    infoLink: String
    canonicalVolumeLink: String
    imageLinks: ImageLinks
    authors: [String]
  }

  type BookData {
    isbn: String
    volumeInfo: VolumeInfo
  }

  type Book implements Node {
    bookData: BookData
    id: ID!
    parent: Node
    children: [Node!]!
    internal: Internal!
  }

  type BookShelfData implements Node {
    isbn: String
    volumeInfo: VolumeInfo
    id: ID!
    parent: Node
    children: [Node!]!
    internal: Internal!
  }

  type Bookshelf implements Node {
    BookShelfData: [BookShelfData]
    id: ID!
    parent: Node
    children: [Node!]!
    internal: Internal!
  }

  type book implements Node {
    id: ID!
    parent: Node
    children: [Node!]!
    internal: Internal!
    bookData: bookBookData
  }

  type bookBookData {
    kind: String
    id: String
    etag: String
    selfLink: String
    volumeInfo: bookBookDataVolumeInfo
    saleInfo: bookBookDataSaleInfo
    accessInfo: bookBookDataAccessInfo
    searchInfo: bookBookDataSearchInfo
    isbn: String
  }

  type bookBookDataVolumeInfo {
    title: String
    subtitle: String
    authors: [String]
    publisher: String
    publishedDate(
      formatString: String
      fromNow: Boolean
      difference: String
      locale: String
    ): Date
    description: String
    industryIdentifiers: [bookBookDataVolumeInfoIndustryIdentifiers]
    readingModes: bookBookDataVolumeInfoReadingModes
    pageCount: Int
    printType: String
    categories: [String]
    averageRating: Float
    ratingsCount: Int
    maturityRating: String
    allowAnonLogging: Boolean
    contentVersion: String
    panelizationSummary: bookBookDataVolumeInfoPanelizationSummary
    imageLinks: bookBookDataVolumeInfoImageLinks
    language: String
    previewLink: String
    infoLink: String
    canonicalVolumeLink: String
  }

  type bookBookDataVolumeInfoIndustryIdentifiers {
    type: String
    identifier: String
  }

  type bookBookDataVolumeInfoReadingModes {
    text: Boolean
    image: Boolean
  }

  type bookBookDataVolumeInfoPanelizationSummary {
    containsEpubBubbles: Boolean
    containsImageBubbles: Boolean
  }

  type bookBookDataVolumeInfoImageLinks {
    smallThumbnail: String
    thumbnail: String
  }

  type bookBookDataSaleInfo {
    country: String
    saleability: String
    isEbook: Boolean
    listPrice: bookBookDataSaleInfoListPrice
    retailPrice: bookBookDataSaleInfoRetailPrice
    buyLink: String
    offers: [bookBookDataSaleInfoOffers]
  }

  type bookBookDataSaleInfoListPrice {
    amount: Int
    currencyCode: String
  }

  type bookBookDataSaleInfoRetailPrice {
    amount: Int
    currencyCode: String
  }

  type bookBookDataSaleInfoOffers {
    finskyOfferType: Int
    listPrice: bookBookDataSaleInfoOffersListPrice
    retailPrice: bookBookDataSaleInfoOffersRetailPrice
  }

  type bookBookDataSaleInfoOffersListPrice {
    amountInMicros: Int
    currencyCode: String
  }

  type bookBookDataSaleInfoOffersRetailPrice {
    amountInMicros: Int
    currencyCode: String
  }

  type bookBookDataAccessInfo {
    country: String
    viewability: String
    embeddable: Boolean
    publicDomain: Boolean
    textToSpeechPermission: String
    epub: bookBookDataAccessInfoEpub
    pdf: bookBookDataAccessInfoPdf
    webReaderLink: String
    accessViewStatus: String
    quoteSharingAllowed: Boolean
  }

  type bookBookDataAccessInfoEpub {
    isAvailable: Boolean
    acsTokenLink: String
  }

  type bookBookDataAccessInfoPdf {
    isAvailable: Boolean
  }

  type bookBookDataSearchInfo {
    textSnippet: String
  }

  type bookshelf implements Node {
    id: ID!
    parent: Node
    children: [Node!]!
    internal: Internal!
    bookShelfData: [bookshelfBookShelfData]
  }

  type bookshelfBookShelfData {
    kind: String
    id: String
    etag: String
    selfLink: String
    volumeInfo: bookshelfBookShelfDataVolumeInfo
    saleInfo: bookshelfBookShelfDataSaleInfo
    accessInfo: bookshelfBookShelfDataAccessInfo
    searchInfo: bookshelfBookShelfDataSearchInfo
    isbn: String
  }

  type bookshelfBookShelfDataVolumeInfo {
    title: String
    subtitle: String
    authors: [String]
    publisher: String
    publishedDate(
      formatString: String

      fromNow: Boolean

      # Returns the difference between this date and the current time. Defaults to "milliseconds" but you can also pass in as the measurement "years", "months", "weeks", "days", "hours", "minutes", and "seconds".
      difference: String

      # Configures the locale Moment.js will use to format the date.
      locale: String
    ): Date
    description: String
    industryIdentifiers: [bookshelfBookShelfDataVolumeInfoIndustryIdentifiers]
    readingModes: bookshelfBookShelfDataVolumeInfoReadingModes
    pageCount: Int
    printType: String
    categories: [String]
    averageRating: Float
    ratingsCount: Int
    maturityRating: String
    allowAnonLogging: Boolean
    contentVersion: String
    panelizationSummary: bookshelfBookShelfDataVolumeInfoPanelizationSummary
    imageLinks: bookshelfBookShelfDataVolumeInfoImageLinks
    language: String
    previewLink: String
    infoLink: String
    canonicalVolumeLink: String
  }

  type bookshelfBookShelfDataVolumeInfoIndustryIdentifiers {
    type: String
    identifier: String
  }

  type bookshelfBookShelfDataVolumeInfoReadingModes {
    text: Boolean
    image: Boolean
  }

  type bookshelfBookShelfDataVolumeInfoPanelizationSummary {
    containsEpubBubbles: Boolean
    containsImageBubbles: Boolean
  }

  type bookshelfBookShelfDataVolumeInfoImageLinks {
    smallThumbnail: String
    thumbnail: String
  }

  type bookshelfBookShelfDataSaleInfo {
    country: String
    saleability: String
    isEbook: Boolean
    listPrice: bookshelfBookShelfDataSaleInfoListPrice
    retailPrice: bookshelfBookShelfDataSaleInfoRetailPrice
    buyLink: String
    offers: [bookshelfBookShelfDataSaleInfoOffers]
  }

  type bookshelfBookShelfDataSaleInfoListPrice {
    amount: Int
    currencyCode: String
  }

  type bookshelfBookShelfDataSaleInfoRetailPrice {
    amount: Int
    currencyCode: String
  }

  type bookshelfBookShelfDataSaleInfoOffers {
    finskyOfferType: Int
    listPrice: bookshelfBookShelfDataSaleInfoOffersListPrice
    retailPrice: bookshelfBookShelfDataSaleInfoOffersRetailPrice
  }

  type bookshelfBookShelfDataSaleInfoOffersListPrice {
    amountInMicros: Int
    currencyCode: String
  }

  type bookshelfBookShelfDataSaleInfoOffersRetailPrice {
    amountInMicros: Int
    currencyCode: String
  }

  type bookshelfBookShelfDataAccessInfo {
    country: String
    viewability: String
    embeddable: Boolean
    publicDomain: Boolean
    textToSpeechPermission: String
    epub: bookshelfBookShelfDataAccessInfoEpub
    pdf: bookshelfBookShelfDataAccessInfoPdf
    webReaderLink: String
    accessViewStatus: String
    quoteSharingAllowed: Boolean
  }

  type bookshelfBookShelfDataAccessInfoEpub {
    isAvailable: Boolean
    acsTokenLink: String
  }

  type bookshelfBookShelfDataAccessInfoPdf {
    isAvailable: Boolean
  }

  type bookshelfBookShelfDataSearchInfo {
    textSnippet: String
  }
  `
  createTypes(typeDefs)
}

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
      // Handle google books fetch volumes returning no results
      if (result.totalItems === 0) {
        throw new Error('Google books API could not find book')
      }
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