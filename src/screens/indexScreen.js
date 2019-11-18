import React, { useContext, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Context as BlogContext } from '../context/BlogContext';

const IndexScreen = ({ navigation }) => {
  const blogPosts = useContext(BlogContext);
  const { state, deleteBlogPost, getBlogPosts } = blogPosts;

  useEffect(() => {
    getBlogPosts();
    // any time we focus back to this screen (go back or) we call getBlogPosts
    const listener = navigation.addListener('didFocus', () => {
      getBlogPosts();
    });
    // when the indexScreen unmount clean this listener
    return () => {
      listener.remove();
    };
  }, []);

  return (
    <View>
      <FlatList
        data={state}
        keyExtractor={(post) => post.title}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate('Show', { id: item.id })}>
              <View style={styles.row}>
                <Text style={styles.title}>{item.title} - {item.id}</Text>
                <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                  <Feather style={styles.icon} name="trash" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

IndexScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('Create')}>
        <Feather name="plus" style={styles.addIcon} />
      </TouchableOpacity>
    )
  };
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: 'gray',

  },
  title: {
    fontSize: 18
  },
  icon: {
    fontSize: 24
  },
  addIcon: {
    marginRight: 10,
    fontSize: 30
  }
});

export default IndexScreen;