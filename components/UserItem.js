import React from 'react'
import {
    StyleSheet,
    View,
    FlatList
} from 'react-native';
import UserRow from './UserRow';

const UserItem = props => {
    const _renderItem = itemData => {
        return (
            <UserRow
            username={"Nicolas"}
            email={"itemData.item.email@gmail.com"}
            accessLevel={"2"}
            />
        );
    };
    return (
        <View style={styles.list}>
            <FlatList
                data={props.data}
                renderItem={_renderItem}
                keyExtractor={(item, index) => item._id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    list: {
      flex: 1,
      paddingHorizontal: 10,
      backgroundColor:"#EEEEEE",
    },
});

export default UserItem;
