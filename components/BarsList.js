import React from 'react'
import {
    StyleSheet,
    View,
    FlatList
} from 'react-native';
import BarItems from './BarItems';
import BarFeed from './BarFeed';

const BarList = props => {
    const _renderItem = itemData => {
        return (
            <BarFeed
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
                            Bar: itemData.item
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
      flex: 1,
      paddingHorizontal: 10,
      backgroundColor:"#E6E6E6",
    },
});

export default BarList;
