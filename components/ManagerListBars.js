import React from 'react'
import {
    StyleSheet,
    View,
    FlatList
} from 'react-native';
import ManagerFeedBar from './ManagerFeedBar';

const ManagerListBars = props => {
    const _renderItem = itemData => {
        return (
            <ManagerFeedBar
            id={itemData.item._id}
            name={itemData.item.name}
            description={itemData.item.description}
            address={itemData.item.address}
            picturesUrls={itemData.item.image}
            phonenumber={itemData.item.phone}
            manager={itemData.item.manager}
            statut={itemData.item.statut}
                onSelectBar={() => {
                    props.navigation.navigate({
                        routeName: 'ManagerBarInfo',
                        params: {
                            barID: itemData.item._id,
                            barName: itemData.item.name,
                            barDescription: itemData.item.description,
                            barTags: itemData.item.tags,
                            barAddress: itemData.item.address,
                            barPhone: itemData.item.phone,
                            barManager: itemData.item.manager,
                            barPicturesUrls: itemData.item.image,
                            barproducts: itemData.item.products,
                            baropenhours: itemData.item.baropenhours,
                            barendhours: itemData.item.barendhours,
                            barstatut: itemData.item.statut,
                            barsiret: itemData.item.siret,
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

export default ManagerListBars;
