import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  Image,
  FlatList,
  ScrollView,
  Keyboard
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import Colors from '../constant/Colors';
import { useDispatch, useSelector } from 'react-redux';
import * as BarsActions from '../store/actions/BarsActions';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const BarInformations = props => {

  //Informations spécifiques créer bar dans la FlatList
  const barPicturesUrls = props.navigation.getParam('barPicturesUrls');
  const barAverageNotation = Number(props.navigation.getParam('barAverageNotation'));
  const barTags = props.navigation.getParam('barTags');
  const barDescription = props.navigation.getParam('barDescription');
  const barName = props.navigation.getParam('barName');
  const barID = props.navigation.getParam('barID');
  const [barliked, setbarliked] = useState(false);
  const barlatitude = props.navigation.getParam('barlatitude');
  const barlongitude = props.navigation.getParam('barlongitude');
  const errormsg = useSelector(state => state.auth.errorMessage);
  const [comment, setcomment] = useState('');
  const [rating, setrating] = useState(3); //3 par default
  const setcommentHandler = (enteredText) => {
    setcomment(enteredText);
  };
  const setratingHandler = (enteredText) => {
    setrating(enteredText);
  };
  const sendcomment = () => {
    if (comment != ''){
      dispatch(BarsActions.postComment(barID,comment))
      {errormsg ? Alert.alert("Baraka",errormsg) : null }
      Alert.alert("Baraka","votre message a été posté")
       setcomment('');
     } else{
       Alert.alert("Baraka","Veuillez entrer un commentaire correcte")
       return;
     }
  };
  const dispatch = useDispatch();

  // récuperer les commentaires en base (il faut modifier la table comment pour que ça ressemble aux data ci dessous)
  const data = [
    { id: 1, image: "https://bootdey.com/img/Content/avatar/avatar1.png", name: "Tony Stark", comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." },
    { id: 2, image: "https://bootdey.com/img/Content/avatar/avatar6.png", name: "Natasha Romanof", comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." },
    { id: 3, image: "https://bootdey.com/img/Content/avatar/avatar7.png", name: "Steve Rogers", comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." },
    { id: 4, image: "https://bootdey.com/img/Content/avatar/avatar2.png", name: "Bruce Banner", comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." },
    { id: 5, image: "https://bootdey.com/img/Content/avatar/avatar3.png", name: "Clint Barton", comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." },
    { id: 6, image: "https://bootdey.com/img/Content/avatar/avatar4.png", name: "Nick Fury", comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." },
    { id: 7, image: "https://bootdey.com/img/Content/avatar/avatar5.png", name: "Thor Odinson", comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." },
  ]

  const Likebar = () => {
    if (barliked) {
      setbarliked(false);
      props.navigation.setParams({barlike: false});
      dispatch(BarsActions.removeBarToFavorite(barID));
    } else {
      setbarliked(true)
      props.navigation.setParams({barlike: true});
      dispatch(BarsActions.addBarToFavorite(barID));
    }
  };

  // Vérifie que le bar est en favoris de cet utilsateur
  const currentMealIsFavorite = useSelector(state => state.bars.favoriteBars.some(bar => bar._id === barID)
  );

  // On affiche le coeur j'aime de l'utilsateur
  useEffect(() => {
    if(currentMealIsFavorite){
      props.navigation.setParams({barlike: true});
      setbarliked(true);
    }
}, [currentMealIsFavorite]);


  // On récupère les commentaires du bar
  useEffect(() => {
    dispatch(BarsActions.getComment(barID));
}, [dispatch]);


const getComment = useSelector(state => state.bars.commentBars);
  return (
    <KeyboardAwareScrollView>
    <ScrollView>
    <TouchableWithoutFeedback onPress={() =>
      {Keyboard.dismiss(); }} >
      <View style={styles.container}>
        <View style={{ marginHorizontal: 30 }}>
          <Image resizeMode='contain' style={styles.image} source={{ uri: `data:image/png;base64,${barPicturesUrls}` }} />
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.nameBar}>{barName}</Text>
            <View style={styles.aligntext}>
            <Rating
              type='star'
              ratingCount={5}
              imageSize={35}
              readonly={true}
              fractions={1}
              startingValue={barAverageNotation}
            />
            </View>
            {barTags.map((item, key) => (
              <Text key={key} style={styles.descriptionBar}>{item}</Text>
            ))}
            <TouchableOpacity onPress={() => Likebar()}>
              <Image style={styles.like} source={barliked ? require('../images/hearts.png') : require('../images/heartsempty.png')} />
            </TouchableOpacity>
            <Text style={styles.descriptionBar}>{barDescription}</Text>
          </View>
        </View>
        <View style={styles.ButtonContainer}>
          <TouchableOpacity style={styles.Button} onPress={() => {
              props.navigation.navigate({
                routeName: 'BarRoute',
                params: {
                  barlatitude: { barlatitude },
                  barlongitude: { barlongitude },
                  barname: { barName }
                }
              });
            }}>
            <Text style={styles.ButtonText}>S'y rendre</Text>
          </TouchableOpacity>
        </View>
          <Text style={styles.desccomment}>Votre commentaire :</Text>
          <AirbnbRating
            count={5}
            reviews={["Médiocre", "Moyen", "Bien", "Très Bien", "Excellent"]}
            defaultRating={rating}
            size={22}
            onFinishRating={setratingHandler}
          />
          <View style={styles.inputContainermsg}>
            <TextInput style={styles.inputs}
              placeholder="Entrez votre commentaires ici"
              onChangeText={setcommentHandler}
              value={comment}
            />
            <TouchableOpacity  style={[styles.buttonContainer, styles.commentButton]} onPress={sendcomment}>
              <Text style={styles.commentButtonText}>Envoyer</Text>
            </TouchableOpacity>
          </View>
        <FlatList
          style={styles.rootCom}
          data={getComment}
          ItemSeparatorComponent={() => {
            return (<View style={styles.separatorCom} />)
          }}
          keyExtractor={(item) => {
            return item._id.toString();
          }}
          renderItem={(item) => {
            const Commentaire = item.item;
            return (
              <View style={styles.containerCom}>
                <Image style={styles.imageCom} source={{ uri: `data:image/png;base64,${Commentaire.image}` }} />
                <View style={styles.contentCom}>
                  <View style={styles.contentHeaderCom}>
                    <Text style={styles.nameCom}>{Commentaire.author}</Text>
                  </View>
                  <Text rkType='primary3 mediumLine'>{Commentaire.comment}</Text>
                </View>
              </View>
            );
          }} />
      </View>
      </TouchableWithoutFeedback>
    </ScrollView>
    </KeyboardAwareScrollView>
  );
};

BarInformations.navigationOptions = navData => {
  const getBarName = navData.navigation.getParam('barName');
  const like = navData.navigation.getParam('barlike');
  return {
    headerTitle: `Détails du bar ${getBarName}`,
    headerLayoutPreset: 'center',
    headerRight: (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="Like"
                iconName={like ? "ios-heart" : "ios-heart-empty"}
                onPress={() => Alert.alert("Baraka","InProgress")}
            />
        </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft : 40,
    width: 100,
    borderBottomRightRadius : 15,
    borderTopRightRadius : 15,
    backgroundColor: 'transparent'
  },
  commentButton: {
    backgroundColor: Colors.Gold,
    elevation: 19,
  },
  commentButtonText: {
    color: Colors.Black,
    fontWeight: 'bold',
    fontSize: 15,
  },
  desccomment: {
    marginTop: 10,
    color: Colors.Black,
    fontWeight: 'bold',
    fontSize: 18,
  },
  inputContainermsg: {
    borderBottomColor: Colors.LightBlue,
    backgroundColor: Colors.White,
    borderRadius: 15,
    height:45,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: Colors.Grey,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: Colors.White,
    flex: 1,
  },
  nameBar: {
    fontSize: 28,
    color: Colors.Black,
    fontWeight: 'bold'
  },
  Notebar: {
    marginTop: 10,
    fontSize: 18,
    color: Colors.Green,
    fontWeight: 'bold',
  },
  descriptionBar: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    color: Colors.Black,
  },
  aligntext: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtonContainer: {
    marginHorizontal: 30
  },
  ButtonText: {
    color: Colors.Black,
    fontSize: 20,
  },
  Button: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: Colors.Gold,
  },
  rootCom: {
    backgroundColor: Colors.White,
    marginTop: 10,
  },
  separatorCom: {
    height: 1,
    backgroundColor: Colors.Brown
  },
  containerCom: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  contentCom: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeaderCom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  imageCom: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginLeft: 20
  },
  nameCom: {
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    height: 100,
    width: null,
  },
  icon: {
    width: 20,
    height: 20,
  },
  like: {
    width: 40,
    height: 40,
  },
});

export default BarInformations;
