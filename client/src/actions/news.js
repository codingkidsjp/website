// @flow
export const GET_POSTS = 'GET_POSTS'
export const getPosts = (offset: number) => ({ type: GET_POSTS, offset })

export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'
export const getPostsSuccess = (list: Array<Object>, total: number) => ({ type: GET_POSTS_SUCCESS, list, total})

export const GET_POSTS_FAILED = 'GET_POSTS_FAILED'
export const getPostsFailed = (error: string) => ({ type: GET_POSTS_FAILED, error })

export const GET_POST = 'GET_POST'
export const getPost = (id: string) => ({ type: GET_POST, id })

export const GET_POST_SUCCESS = 'GET_POST_SUCCESS'
export const getPostSuccess = (item: Object) => ({ type: GET_POST_SUCCESS, item})

export const GET_POST_FAILED = 'GET_POST_FAILED'
export const getPostFailed = (error: string) => ({ type: GET_POST_FAILED, error })
