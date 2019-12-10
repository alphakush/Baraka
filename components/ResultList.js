import React from 'react'
import { StyleSheet, View, FlatList, Text } from 'react-native';
import ResultItem from "./ResultItem";

const ResultList = props => {
    const _renderItemResult = itemData => {
        return (
            <ResultItem
                id={itemData.item.id}
                name={itemData.item.name}
                description={itemData.item.description}
                averageNotation={itemData.item.note}
                picturesUrls={itemData.item.image}
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
            <FlatList data={props.searchResult}
                renderItem={_renderItemResult}
                keyExtractor={(item, index) => item.id}
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


