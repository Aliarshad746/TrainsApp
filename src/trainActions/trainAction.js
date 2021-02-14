import {
  CART_ADD_TRAIN,
  CART_REMOVE_TRAIN,
} from '../trainConstants/trainConstant';

const addToCart = (train) => async (dispatch) => {
  dispatch({
    type: CART_ADD_TRAIN,
    payload: {
      id: train.id,
      name: train.name,
    },
  });
};

const removeFromCart = (id) => async (dispatch) => {
  dispatch({
    type: CART_REMOVE_TRAIN,
    payload: id,
  });
};

export { addToCart, removeFromCart };
