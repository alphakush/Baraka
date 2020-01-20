import React from 'react'
import { StyleSheet, View, FlatList, Text } from 'react-native';
import ResultItem from "./ResultItem";

const ResultList = props => {
    const _renderItemResult = itemData => {
        return (
            <ResultItem
                id={itemData.item._id}
                name={itemData.item.name}
                description={itemData.item.description}
                averageNotation={itemData.item.note}
                picturesUrls={itemData.item.image}
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
            <FlatList data={props.searchResult}
                renderItem={_renderItemResult}
                keyExtractor={(item, index) => item._id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    list: {
        flex: 1
    }
});

export default ResultList;
