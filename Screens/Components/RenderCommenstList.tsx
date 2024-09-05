import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CustomTextInputBox from './CustomTextInputBox';
import RenderNestedEdit from './RenderNestedEdit';

const RenderCommenstList = ({
  MainItem,
  MainIndex,
  userCommentsList,
  setUsercommentsList,
}: any) => {
  const [showCommenstSection, setShowCommentsSection] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const date = new Date(MainItem?.Date);
  const options: any = {day: '2-digit', month: 'short', year: 'numeric'};
  const formattedDate = date.toLocaleDateString('en-GB', options);
  const handleDropDown = () => {
    setShowCommentsSection(false);
    setIsEdit(false)
    setIsReply(false)

  };
  const handleEdit = () => {
    setIsEdit(!isEdit);
  };
  const handleDelete = () => {
    const updatedList = [...userCommentsList];
    const deletedItem = updatedList?.filter(
      (val: any) => val?.Name !== MainItem?.Name,
    );
    setUsercommentsList(deletedItem);
  };
  const handleNestedDelete = (item: any) => {
    const updatedList = [...userCommentsList];
    const deletedItem = updatedList[MainIndex].isNestedReply?.filter(
      (val: any) => val?.Name !== item?.Name,
    );
    updatedList[MainIndex] = {
      ...updatedList[MainIndex],
      isNestedReply: deletedItem,
    };
    setUsercommentsList(updatedList);
  };
console.log(isReply)
  return (
    <View>
      <View style={styles.commenstsConatiner}>
        <View>
          <Text style={styles.NameText}>{MainItem?.Name}</Text>
          <Text style={styles.reply}>{MainItem?.Reply}</Text>
          <View style={styles.commentsBtn}>
            <TouchableOpacity onPress={()=>setIsReply(!isReply)}>
              <Text style={styles.btnscolor}>Reply </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleEdit}>
              <Text style={styles.btnscolor}>Edit </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete}>
              <Text style={styles.btnscolor}>Delete </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.reply}>{formattedDate}</Text>
      </View>
      {(showCommenstSection || isEdit || isReply) && (
        <CustomTextInputBox
          userCommentsList={userCommentsList}
          setUsercommentsList={setUsercommentsList}
          isEdit={isEdit}
          index={MainIndex}
          handleDropDown={handleDropDown}
          isReply={isReply}
        />
      )}
      {MainItem?.isNestedReply?.length ? (
        <FlatList
          data={MainItem?.isNestedReply}
          renderItem={({item,index}:any)=>{
            return(
                <RenderNestedEdit
                index={MainIndex}
                nestedIndex={index}
                userCommentsList={userCommentsList}
                setUsercommentsList={setUsercommentsList}
                handleDropDown={handleDropDown}
                item={item}
                formattedDate={formattedDate}
                handleNestedDelete={handleNestedDelete}
                />
            )
          }}
        />
      ) : (
        <View />
      )}
    </View>
  );
};

export default RenderCommenstList;

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
