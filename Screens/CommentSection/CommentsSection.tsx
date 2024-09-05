import {
  FlatList,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CustomTextInputBox from '../Components/CustomTextInputBox';
import RenderCommenstList from '../Components/RenderCommenstList';

const CommentsSection = () => {
  const [userCommentsList, setUsercommentsList] = useState<any>([]);

  const rendercomments = () => {
    return (
      <>
        <CustomTextInputBox
          userCommentsList={userCommentsList}
          setUsercommentsList={setUsercommentsList}
        />
        <View style={styles.commentsList}>
          <FlatList
            keyboardShouldPersistTaps={'always'}
            data={userCommentsList}
            renderItem={({item, index}) => {
              return (
                <RenderCommenstList
                  MainItem={item}
                  MainIndex={index}
                  setUsercommentsList={setUsercommentsList}
                  userCommentsList={userCommentsList}
                />
              );
            }}
          />
        </View>
      </>
    );
  };

  return (
    <View style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView>
          <Text style={styles.headerText}>Comments Section</Text>
          <FlatList
            data={[1]}
            keyboardShouldPersistTaps={'always'}
            renderItem={rendercomments}
          />
          <View style={{marginBottom:100}}/>
        </ScrollView>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default CommentsSection;

const styles = StyleSheet.create({
  headerText: {
    color: 'white',
    textAlign: 'center',
    marginVertical: '5%',
    fontSize: 18,
    fontWeight: '600',
  },
  commentsList: {
    flex: 1,
    // backgroundColor:"white"
  },
});
