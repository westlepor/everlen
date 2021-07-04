require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const path = require("path")

module.exports = {
  siteMetadata: {
    title: `everlywell`,
    description: `Enterprise Reporting`,
    author: `@dhamirainc`,
  },
  plugins: [
    {
      resolve: "@sentry/gatsby",
      options: {
        dsn: process.env.SENTRY_DSN,
      },
    },
    `gatsby-plugin-graphql-loader`,
    `gatsby-plugin-fontawesome-css`,
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        stylesProvider: {
          injectFirst: true,
        },
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Everywell Portal`,
        short_name: `Everlywell Portal`,
        start_url: `/`,
        background_color: `#FFFFFF`,
        theme_color: `#4ba373`,
        display: `minimal-ui`,
        icon: `src/images/logos-favicon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/app/*`] },
    },
    {
      resolve: "gatsby-plugin-root-import",
      options: {
        src: path.join(__dirname, "src"),
        pages: path.join(__dirname, "src/pages"),
        components: path.join(__dirname, "src/components"),
        apollo: path.join(__dirname, "src/apollo"),
        services: path.join(__dirname, "src/services"),
        utils: path.join(__dirname, "src/utils"),
        tests: path.join(__dirname, "src/tests"),
        styles: path.join(__dirname, "src/styles"),
        contexts: path.join(__dirname, "src/contexts"),
        queries: path.join(__dirname, "src/queries"),
        images: path.join(__dirname, "src/images"),
        hooks: path.join(__dirname, "src/hooks"),
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GA_TRACKING_ID,
        head: false,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
