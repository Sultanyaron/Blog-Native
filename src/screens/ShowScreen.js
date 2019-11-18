import React, { useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { Context as BlogContext } from '../context/BlogContext';

const ShowScreen = ({ navigation }) => {
  const { state } = useContext(BlogContext);

  const blogPost = state.find((Post) => Post.id === navigation.getParam('id'));
  
  return (
    <View>
      <Text>{blogPost.title}</Text>
      <Text>{blogPost.content}</Text>
    </View>
  );
};

ShowScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('Edit', { id: navigation.getParam('id') })}>
        <EvilIcons name="pencil" size={35} />
      </TouchableOpacity>
    )
  };
};

export default ShowScreen;