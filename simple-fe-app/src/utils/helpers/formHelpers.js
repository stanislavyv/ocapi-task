export const NUMBER_PATTERN = /^\d*$/;

/**
 *
 * @param {String | Number} value
 * @returns {Boolean}
 */
export const validateNumber = (value) => {
    return NUMBER_PATTERN.test(value.toString());
};

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

/**
 *
 * @param {Object} values
 * @param {Object} errors
 */
export const validateCardNumber = (values, errors) => {
    if (!values.cardNumber) {
        errors.cardNumber = 'Please provide a valid card number';
    } else if (
        String(values.cardNumber).length < 16 ||
        String(values.cardNumber).length > 19 ||
        !validateNumber(values.cardNumber)
    ) {
        errors.cardNumber = 'Card number not in the right format';
    }
};

/**
 *
 * @param {Object} values
 * @param {Object} errors
 */
export const validateExpiryMonth = (values, errors) => {
    if (!values.expiryMonth) {
        errors.expiryMonth = 'Please select expiry month';
    }
};

/**
 *
 * @param {Object} values
 * @param {Object} errors
 */
export const validateExpiryYear = (values, errors) => {
    if (!values.expiryYear) {
        errors.expiryYear = 'Please select expiry year';
    }
};

/**
 *
 * @param {Object} values
 * @param {Object} errors
 */
export const validateSecurityCode = (values, errors) => {
    if (!values.securityCode) {
        errors.expiryMonth = 'Please provide a valid security code';
    } else if (
        String(values.securityCode).length != 3 ||
        !validateNumber(values.securityCode)
    ) {
        errors.securityCode = 'Security code not in the right format';
    }
};
