import React from 'react'
import {
    StyleSheet,
    View,
    FlatList
} from 'react-native';
import UserRow from './UserRow';
import { ScrollView } from 'react-native-gesture-handler';

const UserItem = props => {
    const _renderItem = itemData => {
        return (
            <ScrollView>
                <UserRow
                    image={itemData.item.image}
                    username={itemData.item.username}
                    email={itemData.item.email}
                    accessLevel={itemData.item.accessLevel}
                />
            </ScrollView>
        );
    };
    return (
        <View >
            <FlatList
                data={props.data}
                renderItem={_renderItem}
                keyExtractor={(item, index) => item._id}
            />
        </View>
    );
};

export default UserItem;
