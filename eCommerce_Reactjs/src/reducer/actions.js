// actions.js
export const SAVE_IMAGES = 'SAVE_IMAGES';

export const saveImages = (images) => {
  return {
    type: SAVE_IMAGES,
    payload: images,
  };
};
