import React, { useContext } from 'react';
// import {
//   View,
//   Text,
//   TextInput
// } from 'react-native';
import BlogPostForm from '../components/BlogPostForm';
import { Context as BlogContext } from '../context/BlogContext';

const EditScreen = ({ navigation }) => {
  const { state, editBlogPost } = useContext(BlogContext);
  const id = navigation.getParam('id');
  const blogPost = state.find((post) => post.id === id);

  return (
    <BlogPostForm
      initialValues={{ title: blogPost.title, content: blogPost.content }}
      onSubmit={(title, content) => {
        editBlogPost(id, title, content, () => navigation.pop());
      }}
    />
  );
};

export default EditScreen;