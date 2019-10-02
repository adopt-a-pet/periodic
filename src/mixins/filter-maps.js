const methods = {
  /**
   * Match color ids with color names to
   * send to GA.
   * @param {Array} //array
   * @param {Number} //clanId
   * @returns {{colorsArray: Array}}
   */
  mapColorsGA(arr, clanId) {
    const colorsArray = [];
    let colorMap;
    let colorMapKeys;

    const colorMapCats = {
      46: 'Black',
      47: 'Black & White or Tuxedo',
      48: 'Brown or Chocolate',
      49: 'Brown Tabby',
      50: 'Calico or Dilute Calico',
      51: 'Cream or Ivory',
      53: 'Gray, Blue or Silver Tabby',
      52: 'Gray or Blue',
      54: 'Orange or Red',
      55: 'Orange or Red Tabby',
      56: 'Spotted Tabby/Leopard Spotted',
      61: 'Tabby',
      57: 'Tan or Fawn',
      58: 'Tan or Fawn Tabby',
      163: 'Tiger Striped',
      59: 'Tortoiseshell',
      60: 'White',
    };

    const colorMapDogs = {
      152: 'Black',
      153: 'Brindle',
      154: 'Brown/Chocolate',
      155: 'Gray/Blue/Silver',
      156: 'Merle',
      157: 'Red/Golden/Orange',
      158: 'Silver & Tan',
      159: 'Tan/Yellow/Fawn',
      160: 'Tricolor',
      161: 'White',
    };

    if (clanId === 1) {
      colorMap = colorMapDogs;
      colorMapKeys = Object.keys(colorMapDogs);
    } else {
      colorMapKeys = Object.keys(colorMapCats);
      colorMap = colorMapCats;
    }

    arr.forEach(id => {
      colorMapKeys.forEach(key => {
        if (id === parseInt(key, 10)) {
          colorsArray.push(colorMap[key]);
        }
      });
    });

    return colorsArray;
  },

  mapSizesGA(arr) {
    const sizesArray = [];
    arr.forEach(n => {
      if (n === 1) {
        sizesArray.push('Small');
      }
      if (n === 2) {
        sizesArray.push('Medium');
      }
      if (n === 3) {
        sizesArray.push('Large');
      }
      if (n === 4) {
        sizesArray.push('X-Large');
      }
    });
    return sizesArray;
  },

  /**
     * Map breed ids to names
     * @param {Array} //arr
     * @param {Array} //breeds
     * @returns {{namesArray: Array}} //namesArray
     */
  mapBreedNamesGA(arr, breeds) {
    const namesArray = [];
    arr.forEach(id => {
      breeds.forEach(breed => {
        if (id === breed.value) {
          namesArray.push(breed.display);
        }
      });
    });
    return namesArray;
  },

  /**
     * Remove any null values or empty arrays for tracking
     * @param {Object} //form
     * @returns {{parsedData: Object}}
     */
  parseForm(form, breeds) {
    const parsedData = {};
    const formKeys = Object.keys(form);
    formKeys.forEach(prop => {
      if (Array.isArray(form[prop]) && form[prop].length > 0) {
        if (form[prop] !== null && form[prop] !== '') {
          parsedData[prop] = form[prop];
        }
        parsedData[prop] = form[prop];
        if (prop === 'breeds') parsedData[prop] = this.mapBreedNamesGA(form[prop], breeds);
        if (prop === 'color') parsedData[prop] = this.mapColorsGA(form[prop], form.clan);
        if (prop === 'size') parsedData[prop] = this.mapSizesGA(form[prop]);
      }
    });

    return parsedData;
  },

};

export default {
  methods,
};
