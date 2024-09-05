import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
const initialData = {
  isName: false,
  isReplyText: false,
};
const CustomTextInputBox = ({
  userCommentsList,
  setUsercommentsList,
  isEdit,
  index,
  handleDropDown,
  isReply,
  isNestedEdit,
  nestedIndex
}: any) => {
  const [userName, setUserName] = useState('');
  const [userComment, setUserComment] = useState('');
  const [validation, setValidation] = useState(initialData);
console.log(nestedIndex,"lkjhgfghjk")
console.log(index,"inde")
  const checkValidation = () => {
    const isValidName = userName?.trim()?.length === 0;
    const isValidComment = userComment?.trim()?.length === 0;
    if (isValidName && isValidComment) {
      setValidation({
        ...validation,
        isReplyText: true,
        isName: true,
      });
    } else if (isValidName) {
      setValidation({
        ...validation,
        isName: true,
      });
    } else if (isValidComment) {
      setValidation({
        ...validation,
        isReplyText: true,
      });
    } else {
      return true;
    }
  };

  const handleText = () => {
    if (checkValidation()) {
      if (isEdit) {
        const updatedComments: any = [...userCommentsList];
        const updatedData = updatedComments.map((val:any, index:any) =>
          index === index
            ? { ...val, Reply: userComment }
            : val
        );
        // console.log(JSON.stringify(updatedData),"updatedCommentsupdatedComments")
        setUsercommentsList(updatedData);
        setUserComment('');
        setUserName('');
        handleDropDown();
      } else if (isReply) {
        const comments = {
          Name: userName,
          Reply: userComment,
          Date: userCommentsList[index]?.Date ?? new Date(),
        };
        const updatedComments = [...userCommentsList];
        updatedComments[index] = {
          ...updatedComments[index],
          isNestedReply: [
            ...(updatedComments[index].isNestedReply || []),
            comments,
          ],
        };
        setUsercommentsList(updatedComments);
        setUserComment('');
        setUserName('');
        handleDropDown();
      }else if (isNestedEdit) {
        const comments = {
          Name: userName,
          Reply: userComment,
          Date: userCommentsList[index]?.Date ?? new Date(),
        };
        const updatedComments = [...userCommentsList];
        updatedComments[index] = {
          ...updatedComments[index],
          isNestedReply: [
            ...(updatedComments[index].isNestedReply || []), 
          ].map((reply, idx) => (idx === nestedIndex ? comments : reply)), 
        };

        setUsercommentsList(updatedComments);
        setUserComment('');
        setUserName('');
        handleDropDown();
      }
      
      else {
        const comments = {
          Name: userName,
          Reply: userComment,
          Date: new Date(),
          isNestedReply: [],
        };
        setUsercommentsList([...userCommentsList, comments]);
        setValidation(initialData);
        setUserComment('');
        setUserName('');
      }
    }
    Keyboard.dismiss()
  };

  useEffect(() => {
    if (isEdit) {
      setUserName(userCommentsList[index]?.Name);
      setUserComment(userCommentsList[index]?.Reply);
    }
    else if(isNestedEdit){
      setUserName(userCommentsList[index]?.isNestedReply?.[nestedIndex]?.Name);
      setUserComment(userCommentsList[index]?.isNestedReply?.[nestedIndex]?.Reply);
    }
  }, []);

  return (
    <View style={styles.textInputContainer}>
      <TextInput
        value={userName}
        editable={!isEdit&&!isNestedEdit}
        placeholder="Name"
        onChangeText={(e: string) => {
          setUserName(e),
            setValidation({
              ...validation,
              isName: false,
            });
        }}
        placeholderTextColor={'gray'}
        style={styles.nameTextInput}
      />
      {validation?.isName && (
        <Text style={styles.warningText}>Please enter the name </Text>
      )}
      <TextInput
        value={userComment}
        placeholder="Comment"
        onChangeText={(e: string) => {
          setUserComment(e),
            setValidation({
              ...validation,
              isReplyText: false,
            });
        }}
        placeholderTextColor={'gray'}
        style={styles.replyTextInput}
        multiline={true}
        numberOfLines={4}
      />
      {validation?.isReplyText && (
        <Text style={styles.warningText}>Please enter the reply </Text>
      )}
      <TouchableOpacity style={styles.postBtn} onPress={handleText}>
        <Text style={styles.postText}>Post</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomTextInputBox;

const styles = StyleSheet.create({
  textInputContainer: {
    marginHorizontal: '2%',
  },
  nameTextInput: {
    width: '95%',
    borderRadius: 10,
    backgroundColor: 'rgb(226,225,221)',
    color: 'black',
    paddingLeft: 20,
  },
  replyTextInput: {
    width: '95%',
    borderRadius: 10,
    backgroundColor: 'rgb(226,225,221)',
    color: 'black',
    marginTop: '4%',
    paddingLeft: 20,
    textAlignVertical: 'top',
  },
  postBtn: {
    width: 120,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    backgroundColor: 'blue',
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  postText: {
    color: 'white',
    fontWeight: '700',
  },
  warningText: {
    color: 'red',
  },
});
