import React, { useState, useEffect } from 'react'
import ArticlesList from '../component/ArticlesList';
import CommentsList from '../component/CommentsList';
import articleContent from './article-content'
import NotFoundPage from './NotFoundPage';
import UpvotesSection from '../component/UpvotesSection';
import AddCommentForm from '../component/AddCommentForm';

const ArticlePage = ({ match }) => {
    const name = match.params.name;
    const article = articleContent.find(article => article.name === name);
    const otherArticles = articleContent.filter(article => article.name !== name)

    const [articleInfo, setArticleInfo ] = useState({upvotes: 0, comments: [] })

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`/api/articles/${name}`)
            const body = await result.json()
            setArticleInfo(body)
        }
        fetchData()
    }, [name])
    if (!article) return <NotFoundPage/>
    return (
        <>
        <h1>{article.title}</h1>
        <UpvotesSection articleName = {name} upvotes = {articleInfo.upvotes} setArticleInfo={setArticleInfo} />
        {article.content.map((paragraph, key) => (
            <p key={key}>{paragraph}</p>
        ))}
        <CommentsList comments={articleInfo.comments}/>
        <AddCommentForm articleName={name} setArticleInfo={setArticleInfo}/>
        <h3>Other Articles:</h3>
        <ArticlesList articles = {otherArticles}/>
        </>
    );
}
export default ArticlePage;