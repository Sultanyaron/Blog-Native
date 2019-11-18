import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'GET_BLOGPOSTS':
      return action.payload;
    case 'DELETE_BLOGPOST':
      return state.filter((blogPost) => blogPost.id !== action.payload);
    case 'EDIT_BLOGPOST':
      return state.map((post) => {
        if (post.id === action.payload.id) {
          return action.payload;
        }
        return post;
      });
    default:
      return state;
  }
};

const getBlogPosts = (dispatch) => {
  return async () => {
    const response = await jsonServer.get('/blogposts');
    dispatch({ type: 'GET_BLOGPOSTS', payload: response.data });
  };
};

const addBlogPost = () => {
  return async (title, content, callback) => {
    await jsonServer.post('/blogposts', { title, content });
    if (callback) {
      callback();
    }
  };
};

const deleteBlogPost = (dispatch) => {
  return async (id) => {
    await jsonServer.delete(`/blogposts/${id}`);
    dispatch({ type: 'DELETE_BLOGPOST', payload: id });
  };
};

const editBlogPost = (dispatch) => {
  return async (id, title, content, callback) => {
    await jsonServer.put(`/blogposts/${id}`, { title, content });

    dispatch({
      type: 'EDIT_BLOGPOST',
      payload: { id, title, content }
    });
    if (callback) {
      callback();
    }
  };
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  {
    addBlogPost,
    deleteBlogPost,
    editBlogPost,
    getBlogPosts
  },
  []// initial state
);