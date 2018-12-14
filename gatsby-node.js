/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path');

exports.createPages = ({ graphql, boundActionCreators }) => {
    const { createPage } = boundActionCreators;
    return new Promise((resolve, reject) => {
        graphql(
            `
            {
                allWordpressPage {
                    edges {
                      node {
                        id
                        slug
                        title
                      }
                    }
                }
                allWordpressPost {
                    edges {
                      node {
                        slug
                      }
                    }
                  } 
            }
            `
        ).then(result => {
        if(result.errors) {
            console.log(result.errors);
            reject(result.errors);
        }
        result.data.allWordpressPage.edges.forEach(({node}) => {
            createPage({
                path: node.slug,
                component: path.resolve("./src/template/page.js"),
                context: {
                    slug: node.slug,
                },
            })
        })
        result.data.allWordpressPost.edges.forEach(({node}) => {
            createPage({
                path: `posts/${node.slug}`,
                component: path.resolve("./src/template/post.js"),
                context: {
                    slug: node.slug,
                },
            })
        })
        resolve();
        })
    })
}

