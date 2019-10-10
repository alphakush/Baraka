import React from 'react'
import { FlatList, Text } from 'react-native'
import BarItems from './BarItems'

const _renderItem = ({ item }) => (
  <BarItems
    id={item.id}
    name={item.name}
    description={item.description}
    tags={item.tags}
    averageNotation={item.averageNotation}
    picturesUrls={item.picturesUrls}
  />
)

export default (BarsList = props => (
  <FlatList
  data={props.data}
  renderItem={_renderItem}
  keyExtractor={item => item.id}
   />
))
