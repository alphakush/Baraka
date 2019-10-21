import React from 'react'
import {
    StyleSheet,
    View,
    FlatList
} from 'react-native';
import BarItems from './BarItems';

const BarList = props => {
    const _renderItem = itemData => {
        return (
            <BarItems
                id={itemData.item.id}
                name={itemData.item.name}
                description={itemData.item.description}
                tags={itemData.item.tags}
                averageNotation={itemData.item.averageNotation}
                picturesUrls={itemData.item.picturesUrls}
                onSelectBar={() => {
                    props.navigation.navigate({
                        routeName: 'BarInfo',
                        params: {
                            BarId: itemData.item.id
                        }
                    });
                }}
            />
        );
    };
    return (
        <View style={styles.list}>
            <FlatList
                data={props.data}
                renderItem={_renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    list: {
        flex: 1
    }
});

export default BarList;
