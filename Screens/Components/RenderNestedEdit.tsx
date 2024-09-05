import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import CustomTextInputBox from './CustomTextInputBox';

const RenderNestedEdit = ({
  index,
  userCommentsList,
  setUsercommentsList,
  item,
  formattedDate,
  handleNestedDelete,
  nestedIndex
}: any) => {
  const [isNestedEdit, setIsNestedEdit] = useState(false);
  const handleDropDown = () => {
    setIsNestedEdit(false);
  };
  console.log(index,"jjjjjj")
  return (
    <View>
      <View style={styles.nestedCommenstsConatiner}>
        <View>
          <Text style={styles.NameText}>{item?.Name}</Text>
          <Text style={styles.reply}>{item?.Reply}</Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => setIsNestedEdit(!isNestedEdit)}>
              <Text style={[styles.btnscolor, {marginHorizontal: 0}]}>
                Edit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNestedDelete(item)}>
              <Text style={[styles.btnscolor, {marginHorizontal: 10}]}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.reply}>{formattedDate}</Text>
      </View>
      {isNestedEdit && (
        <CustomTextInputBox
          userCommentsList={userCommentsList}
          setUsercommentsList={setUsercommentsList}
          index={index}
          handleDropDown={handleDropDown}
          isNestedEdit={isNestedEdit}
          nestedIndex={nestedIndex}
        />
      )}
    </View>
  );
};

export default RenderNestedEdit;

const styles = StyleSheet.create({
  NameText: {
    color: 'gray',
    fontWeight: '500',
  },
  commenstsConatiner: {
    margin: 10,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgb(226,225,221)',
    borderRadius: 8,
  },
  commentsBtn: {
    flexDirection: 'row',
    marginTop: 10,
  },
  reply: {
    color: 'gray',
  },
  btnscolor: {
    color: 'blue',
    fontWeight: '500',
    marginHorizontal: 10,
  },
  nestedCommenstsConatiner: {
    marginLeft: 40,
    width: '85%',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgb(226,225,221)',
    borderRadius: 8,
    marginVertical: 5,
  },
});
