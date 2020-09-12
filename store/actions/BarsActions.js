export const ADD_TO_FAVORITE = "ADD_TO_FAVORITE";
export const REMOVE_TO_FAVORITE = "REMOVE_TO_FAVORITE";
export const GET_ALL_BARS = "GET_ALL_BARS";
export const TOGGLE_ERROR_BARS = "TOGGLE_ERROR_BARS";
export const GET_FAVORITES_BARS = "GET_FAVORITES_BARS";
export const GET_COMMENT = "GET_COMMENT";
export const POST_COMMENT = "POST_COMMENT";
export const POST_NOTE = "POST_NOTE";
export const CHECK_NOTE = "CHECK_NOTE";
export const SET_FILTERS ='SET_FILTERS';
export const GET_ALL_BARS_ADMIN = "GET_ALL_BARS_ADMIN";
export const GET_ALL_USERS_ADMIN = "GET_ALL_USERS_ADMIN";
export const CREATE_BAR_MANAGER = "CREATE_BAR_MANAGER";
export const VALIDE_BAR_ADMIN = "VALIDE_BAR_ADMIN";
export const MODIFY_STATUT_BAR_ADMIN = "MODIFY_STATUT_BAR_ADMIN";
export const GET_MY_BAR_MANAGER = "GET_MY_BAR_MANAGER";
export const UPDATE_MY_BAR_MANAGER = "UPDATE_MY_BAR_MANAGER";
export const CREATE_BAR_ADMIN = "CREATE_BAR_ADMIN";

import Api from '../../api/api';

//ADMINISTRATION
// Function pour OBTENIR TOUS LES  tous les bars.
export const getAllBarAdmin = () => {
    return async dispatch => {
        try {
            const response = await Api.get('/admin/allbars');
            dispatch({ type: GET_ALL_BARS_ADMIN,
              payload: response.data,
            });
        } catch (error) {
            dispatch({ type: TOGGLE_ERROR_BARS, payload: "Une erreur s'est produite lors de la récupération des données." });
        }
    };
};
// Function pour OBTENIR TOUS LES  tous les bars.
export const getAllBar = () => {
    return async dispatch => {
        try {
            const response = await Api.get('/allbars');
            console.log("test")
            dispatch({ type: GET_ALL_BARS,
              payload: response.data,
            });
        } catch (error) {
            dispatch({ type: TOGGLE_ERROR_BARS, payload: "Une erreur s'est produite lors de la récupération des données." });
        }
    };
};

// Function permettant d'AJOUTER un bar à ses favoris.
export const addBarToFavorite = (barID) => {
    return async dispatch => {
        try {
            const response = await Api.post('/bar/add-favorite', {barID});
            dispatch({ type: ADD_TO_FAVORITE,
              payload: response.data,
            });
        } catch (error) {
            dispatch({ type: TOGGLE_ERROR_BARS, payload: "Une erreur s'est produite lors de la récupération des données." });
        }
    };
};

// Function permettant de SUPPRIMER un bar de ses favoris.
export const removeBarToFavorite = (barID) => {
    return async dispatch => {
        try {
            const response = await Api.delete('/delete-favorite/'+barID);
            dispatch({ type: REMOVE_TO_FAVORITE,
              payload: response.data,
            });
        } catch (error) {
            dispatch({ type: TOGGLE_ERROR_BARS, payload: "Une erreur s'est produite lors de la récupération des données." });
        }
    };
};

//Function permettant d'obtenir tous ses bars FAVORIS.
export const getFavoriteBar = () => {
    return async dispatch => {
        try {
            const response = await Api.get('/my-favorite-bar');
            dispatch({ type: GET_FAVORITES_BARS,
              payload: response.data,
            });
        } catch (error) {
            dispatch({ type: TOGGLE_ERROR_BARS, payload: "Une erreur s'est produite lors de la récupération des données." });
        }
    };
};

//Function permettant d'obtenir tout les commentaires d'un bar
export const getComment = (barID) => {
    return async dispatch => {
        try {
            const response = await Api.get('/bar/all-comment/'+barID );
            dispatch({ type: GET_COMMENT,
              payload: response.data,
            });
        } catch (error) {
            dispatch({ type: TOGGLE_ERROR_BARS, payload: "Une erreur s'est produite pour récupérer les commentaires." });
        }
    };
};

//Function permettant de poster un commentaire sur un bar.
export const postComment = (barID, comment) => {
    return async dispatch => {
        try {
            const response = await Api.post('/bar/add-comment',{barID, comment});
            dispatch({ type: POST_COMMENT,
              payload: response.data,
            });
        } catch (error) {
            dispatch({ type: TOGGLE_ERROR_BARS, payload: "Une erreur s'est produite pour poster le commentaire." });
        }
    };
};

//Function permettant de poster un commentaire sur un bar.
export const addRating = (barID, userNote) => {
    return async dispatch => {
        try {
            const response = await Api.patch('/bar/add-note',{barID, userNote});
            dispatch({ type: POST_NOTE,
              payload: response.data.success,
            });
        } catch (error) {
            dispatch({ type: TOGGLE_ERROR_BARS, payload: "Une erreur s'est produite pour poster le commentaire." });
        }
    };
};

//Function permettant de vérifier si on a poster une note.
export const checkRating = (barID, userNote) => {
    return async dispatch => {
        try {
            const response = await Api.get('/bar/check-note/'+barID);
            dispatch({ type: CHECK_NOTE,
              payload: response.data.success,
            });
        } catch (error) {
            dispatch({ type: TOGGLE_ERROR_BARS, payload: "Une erreur s'est produite pour poster le commentaire." });
        }
    };
};

// Function pour OBTENIR TOUS LES  tous les bars.
export const setFilters = (filterUser) => {
    return async dispatch => {
        try {
          //On vérifie qu'un filtre est True pour ne exécuter une rêquete inutile
            let requestFilterUser ='';

            //si l'utilisateur active le filtre pour la DATE
            if(filterUser.Date) {
              filterDataString = "?sortBy=createdAt:desc";
              requestFilterUser = requestFilterUser + filterDataString;
            }
            //// TODO: faire pour LIKE et DISTANCE
            const response = await Api.get('/allbars'+requestFilterUser);

            dispatch({ type: SET_FILTERS,
              payload: response.data,
              payloadDate: filterUser.Date,
              payloadLike: filterUser.Like,
              payloadDistance: filterUser.Distance
            });

        } catch (error) {
            dispatch({ type: TOGGLE_ERROR_BARS, payload: "Une erreur s'est produite lors de la récupération des données." });
        }
    };
};

//Function permettant de metttre a jour une information d'un bar
export const updateContentBar = (barId, nomVariable, contenu) => {
    return async dispatch => {
        try {
            const response = await Api.post('/bar/updateContentBar',{barId, nomVariable, contenu});
            dispatch({ type: POST_NOTE,
              payload: response.data.success,
            });
        } catch (error) {
            dispatch({ type: TOGGLE_ERROR_BARS, payload: "Une erreur s'est produite pour poster le commentaire." });
        }
    };
};

//Function permettant de créer un bar manager
export const createBarManager = (data) => {
    return async dispatch => {
        try {
            const response = await Api.post('/bar/create-bar', data);
            dispatch({ type: CREATE_BAR_MANAGER,
              payload: response.data,
            });
        } catch (error) {
            dispatch({ type: TOGGLE_ERROR_BARS, payload: "Une erreur s'est produite lors de la creation du bar." });
        }
    };
};

//Function permettant de créer un bar manager
export const createBarAdmin = (data) => {
    return async dispatch => {
        try {
          console.log("1")
            const response = await Api.post('/admin/bar/create-bar', data);
            console.log("2")
            dispatch({ type: CREATE_BAR_ADMIN,
              payload: response.data,
            });
        } catch (error) {
            dispatch({ type: TOGGLE_ERROR_BARS, payload: "Une erreur s'est produite lors de la creation du bar." });
        }
    };
};
//Function permettant de valider un bar
export const validebaradmin = (data) => {
    return async dispatch => {
        try {
          console.log("1")
            const response = await Api.patch('/admin/validation-bar', data);
            console.log("2")
            dispatch({ type: VALIDE_BAR_ADMIN,
              payload: response.data,
            });
        } catch (error) {
            dispatch({ type: TOGGLE_ERROR_BARS, payload: "Une erreur s'est produite lors de la validation du bar." });
        }
    };
};

//Function permettant de modifier le statut d'un bar
export const modifystatutbaradmin = (data) => {
    return async dispatch => {
        try {
            const response = await Api.patch('/admin/bar/modify-statut', data);
            dispatch({ type: MODIFY_STATUT_BAR_ADMIN,
              payload: response.data,
            });
        } catch (error) {
            dispatch({ type: TOGGLE_ERROR_BARS, payload: "Une erreur s'est produite lors de la validation du bar." });
        }
    };
};

//Function permettant de récupérer un bar
export const getmybarmanager = (barID) => {
    return async dispatch => {
        try {
            const response = await Api.get('/barfindone/'+barID);
            dispatch({ type: GET_MY_BAR_MANAGER,
              payload: response.data,
            });
        } catch (error) {
            dispatch({ type: TOGGLE_ERROR_BARS, payload: "Une erreur s'est produite lors de la validation du bar." });
        }
    };
};

//Function permettant de récupérer un bar
export const updatemybarmanager = (data) => {
    return async dispatch => {
        try {
            const response = await Api.patch('/bar/modifymybar', data);
            dispatch({ type: UPDATE_MY_BAR_MANAGER,
              payload: response.data,
            });
        } catch (error) {
            dispatch({ type: TOGGLE_ERROR_BARS, payload: "Une erreur s'est produite lors de la validation du bar." });
        }
    };
};

//Function permettant de recevoir tous les utilisateurs
export const getAllUsersAdmin = () => {
    return async dispatch => {
        try {
            const response = await Api.get('/admin/allUsers');
            dispatch({ type: GET_ALL_USERS_ADMIN,
              payload: response.data,
            });
        } catch (error) {
            dispatch({ type: TOGGLE_ERROR_BARS, payload: "Une erreur s'est produite lors de la récupération des données." });
        }
    };
};
