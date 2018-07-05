import React, { Component } from "react"
import Link from "gatsby-link"
import PropTypes from "prop-types"
import Img from "gatsby-image"

class PostsTemplate extends Component {
    render() {
        const data = this.props.data

        return(
            <div>
                <h1>Articles</h1>
                {data.allWordpressPost.edges.map(({node}) => (
                    <div key={node.slug} className={"post"} style={{ marginBottom: 50 }}>
                    {node.featured_media && node.featured_media.localFile.childImageSharp.resolutions &&
                        <Img resolutions={node.featured_media.localFile.childImageSharp.resolutions}></Img>
                    }
                    
                        <Link to={'/post/' + node.slug}>
                            <h3>{node.title}</h3>
                        </Link>

                        <div className={"post-content"} dangerouslySetInnerHTML={{__html: node.excerpt}} />

                        {node.date}
                    </div>
                ))}

            </div>
        )
    }
}

PostsTemplate.propTypes = {
    data: PropTypes.object.isRequired,
    edges: PropTypes.array,
}

export default PostsTemplate

export const pageQuery = graphql`
    query postsQuery{
        allWordpressPost{
            edges{
                node{
                    id
                    title
                    excerpt
                    slug
                    date(formatString: "MMMM DD, YYYY")
                    featured_media{
                        localFile{
                            childImageSharp{
                                resolutions(width:500, height: 200){
                                    src
                                    width
                                    height
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`