import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CommentsSection from './Screens/CommentSection/CommentsSection'

export default function App() {
  return (
    <View style={{flex:1}}>
      <CommentsSection/>
    </View>
  )
}

const styles = StyleSheet.create({})