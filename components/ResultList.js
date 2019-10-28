import React from 'react'
import {StyleSheet, View, FlatList, Text} from 'react-native';
import ResultItem from "./ResultItem";

const ResultList = props => {
    const _renderItemResult = itemData => {
        return (
            <ResultItem
                id={itemData.item._id}
                name={itemData.item.name}
                description={itemData.item.description}
                averageNotation={itemData.item.averageNotation}
                picturesUrls={itemData.item.picturesUrls}
                onSelectBar={() => {
                    props.navigation.navigate({
                        routeName: 'BarInfo',
                        params: {
                            BarId: itemData.item._id
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
                      keyExtractor={item => item.id} />
        </View>
    );
};

const styles = StyleSheet.create({
    list: {
        flex: 1
    }
});

export default ResultList;


