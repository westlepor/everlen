# EverLens

## Installation & Setup

1.  **Start developing.**

    Navigate into your project’s directory and start it up.

    ```shell
    cd everlens
    yarn
    yarn develop
    ```

2.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!

    _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql)._

3.  **Log in using Okta credentials**

    Comment out the `MAINTENANCE_MESSAGE` environment variable to "disable" maintenance mode.

## Testing

1.  **Storybook**

    Run storybook. Then storybook will run at `http://localhost:6006`

    ```shell
    yarn storybook
    ```

2.  **Integration and Unit Testing**

    To run the cypress tests:

    ```shell
    yarn test:e2e
    ```

    To run the JEST tests:

    ```shell
    yarn test
    ```

## What's inside?

A quick look at the top-level files and directories you'll see in project.

    .
    ├── node_modules
    ├── src
        └── components
            |── atoms
            └── molecules
                └── common
        |── contexts
        |── pages
        |── styles
        |── tests
        └── utils
    └── stories

1.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

2.  **`/stories`**: This directory will contain all storybook files.

## Deploy

* Deploys are handled by AWS Amplify

* Merges to the staging branch deploy to the pre-production location

* Merges to the master branch deploy to the production location

## Technologies

Lens is built with:
* [Gatsby](https://gatsbyjs.com)
* [Apollo](https://www.apollographql.com/docs/react/)
* [Hasura](https://hasura.io)

## Operational Handbook

To get deeper information about the project architecture, runtime infrastructure, and troubleshooting guides see the EverLens Operational Handbook