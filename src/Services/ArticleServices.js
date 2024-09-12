

import axios from "axios";

const postArticle = (data) => {
    return (axios.post("http://10.0.2.2:8001/post-article", data))

}

const CommentArticle = (data) => {
    return (axios.post("http://10.0.2.2:8001/comment-article", data))

}

const getAllArticle = () => {

    return (axios.get("http://10.0.2.2:8001/getall-article"))
}

const getArticleById = (id) => {
    return (axios.get(`http://10.0.2.2:8001/get-a-article?id=${id}`))

}

const Like = (id, data) => {
    return (axios.post(`http://10.0.2.2:8001/like-article?id=${id}`, data))

}
const UnLike = (id, data) => {
    return (axios.post(`http://10.0.2.2:8001/un-article?id=${id}`, data))

}

const CheckLike = (id, data) => {
    return (axios.post(`http://10.0.2.2:8001/checklike-article?id=${id}`,data))

}


const fillterArticle = (id) => {
    return (axios.get(`http://10.0.2.2:8001/get-article?id=${id}`))

}


const search = (id) => {
    return (axios.get(`http://10.0.2.2:8001/search-article?id=${id}`))

}
export { postArticle, getAllArticle, getArticleById, CommentArticle, Like, UnLike, CheckLike,fillterArticle,search}