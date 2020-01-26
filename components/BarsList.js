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
            id={itemData.item._id}
            name={itemData.item.name}
            description={itemData.item.description}
            averageNotation={itemData.item.note}
            picturesUrls={itemData.item.image}
            numbercomment={itemData.item.counterComment}
            numberLike={itemData.item.counterLike}
                onSelectBar={() => {
                    props.navigation.navigate({
                        routeName: 'BarInfo',
                        params: {
                            barID: itemData.item._id,
                            barName: itemData.item.name,
                            barDescription: itemData.item.description,
                            barTags: itemData.item.tags,
                            barAverageNotation: itemData.item.note,
                            barPicturesUrls: itemData.item.image,
                            barlatitude: itemData.item.latitude,
                            barlongitude: itemData.item.longitude
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
                keyExtractor={(item, index) => item._id}
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
