import React, { Component } from 'react';
import Layout from '../components/layout'

export default class Page extends Component {
    render() {
        const {data} = this.props
        return (
            <Layout>
                <h1>{data.wordpressPage.title}</h1>
                <div
                    dangerouslySetInnerHTML={{
                        __html: data.wordpressPage.content,
                    }}
                >
                </div>
            </Layout>
        )
    }
};

export const query = graphql`
    query PageQuery($slug: String!) {
        wordpressPage(slug: {eq: $slug }) {
            title
            slug
            content
        }
    }
`