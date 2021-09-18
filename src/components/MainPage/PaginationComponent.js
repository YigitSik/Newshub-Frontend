import React, { useState, useEffect } from 'react'
import { setCurrentArticles, setCurrentPage } from '../../redux/articleSlice';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from '@material-ui/core/TablePagination';


export default function PaginationComponent() {

    const dispatch = useDispatch();

    const currentPage = useSelector((state) => state.article.currentPage)
    const currentArticle = useSelector((state) => state.article.currentArticles)
    const article = useSelector((state) => state.article.articles)


    const [articlesPerPage, setArticlesPerPage] = useState(10);
    const [totalArticles, setTotalArticles] = useState(null);
    const [indexOfLastArticle, setIndexOfLastArticle] = useState((currentPage) * articlesPerPage);
    const [indexOfFirstArticle, setIndexOfFirstArticle] = useState(indexOfLastArticle - articlesPerPage);




    useEffect(() => {

        if (article != null) {
            setTotalArticles(article.articles.length);

            if (article != null) {
                var elements = article.articles.slice(indexOfFirstArticle, indexOfLastArticle);
                dispatch(setCurrentArticles(elements));
            }

        }

    }, [article])

    useEffect(() => {
        setIndexOfLastArticle(currentPage * articlesPerPage);
    }, [currentPage])

    useEffect(() => {
        setIndexOfFirstArticle(indexOfLastArticle - articlesPerPage);
    }, [indexOfLastArticle])

    useEffect(() => {
        if (article != null) {
            var elements = article.articles.slice(indexOfFirstArticle, indexOfLastArticle);
            dispatch(setCurrentArticles(elements));
        }
        console.log(indexOfFirstArticle);
        console.log(indexOfLastArticle);
    }, [indexOfFirstArticle])

    const handleChangePage = (event, newPage) => {

        dispatch(setCurrentPage(newPage + 1));
        console.log(newPage + 1);

    };


    return (
        <div >
            <Pagination
                onPageChange={handleChangePage}
                rowsPerPage={articlesPerPage}
                rowsPerPageOptions={[]}
                count={totalArticles}
                color="primary"
                page={currentPage - 1}
                style={{ display: "flex", justifyContent: "center", color: "white" }}
            />
        </div >
    )
}
