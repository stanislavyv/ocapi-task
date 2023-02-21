/**
 * 
 * @param {Object} values 
 * @param {Object} errors 
 */
export const validateFirstName = (values, errors) => {
    if (!values.firstName) {
        errors.firstName = 'Please provide a first name';
    }
};

/**
 * 
 * @param {Object} values 
 * @param {Object} errors 
 */
export const validateLastName = (values, errors) => {
    if (!values.lastName) {
        errors.lastName = 'Please provide a last name';
    }
};

/**
 * 
 * @param {Object} values 
 * @param {Object} errors 
 */
export const validateAddress = (values, errors) => {
    if (!values.address) {
        errors.address = 'Please provide a valid address';
    } else if (values.address.length < 10 || values.address.length > 100) {
        errors.address = 'Address must be between 10 and 100 characters long';
    }
};

/**
 * 
 * @param {Object} values 
 * @param {Object} errors 
 */
export const validateCountry = (values, errors) => {
    if (!values.country) {
        errors.country = 'Please select a country';
    }
};

/**
 * 
 * @param {Object} values 
 * @param {Object} errors 
 */
export const validateCity = (values, errors) => {
    if (!values.city) {
        errors.city = 'Please enter a city';
    } else if (values.city.length < 2 || values.city.length > 50) {
        errors.city = 'City must be between 2 and 50 characters long';
    }
};
