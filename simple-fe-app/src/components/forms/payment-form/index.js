import { useState } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

import { Formik, Form, Field } from 'formik';
import { TextField, RadioGroup } from 'formik-mui';

import * as formValidator from '../../../utils/helpers/formHelpers';
import { createOrder } from '../../../services/orderService';
import { notifyError } from '../../../utils/toast';

const validateForm = (values) => {
    const errors = {};

    formValidator.validateCardNumber(values, errors);
    formValidator.validateExpiryMonth(values, errors);
    formValidator.validateExpiryYear(values, errors);
    formValidator.validateSecurityCode(values, errors);

    return errors;
};

const paymentMethods = [
    {
        label: 'Credit Card',
        value: 'CREDIT_CARD',
    },
];

const months = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
];

const years = ['2023', '2024', '2025', '2026', '2027', '2028', '2029'];

const PaymentForm = ({ handleNext, setOrderId }) => {
    const initialValues = {
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        securityCode: '',
        selectedMethod: paymentMethods[0].value,
    };

    const handleSubmit = (values, setSubmitting) => {
        createOrder(values)
            .then((order_no) => {
                setOrderId(order_no);
                handleNext();
            })
            .catch(notifyError)
            .finally(() => setSubmitting(false));
    };

    return (
        <Stack>
            <Formik
                initialValues={initialValues}
                validate={(values) => validateForm(values)}
                onSubmit={(values, { setSubmitting }) => {
                    handleSubmit(values, setSubmitting);
                }}
            >
                {({ submitForm, isSubmitting, values, setFieldValue }) => (
                    <>
                        <Form>
                            <Stack
                                spacing={1}
                                alignItems={'center'}
                                maxWidth={'lg'}
                            >
                                <Typography variant='h6' gutterBottom>
                                    Payment Details
                                </Typography>
                                <Container>
                                    <Field
                                        component={TextField}
                                        required
                                        value={values.cardNumber.toString()}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (
                                                formValidator.validateNumber(
                                                    value
                                                )
                                            )
                                                setFieldValue(
                                                    'cardNumber',
                                                    value
                                                );
                                        }}
                                        inputProps={{ maxLength: 19 }}
                                        id='cardNumber'
                                        name='cardNumber'
                                        label='Card Number'
                                        fullWidth
                                        variant='standard'
                                    />
                                </Container>
                                <Stack
                                    spacing={2}
                                    direction={{ xs: 'column', md: 'row' }}
                                    width={'100%'}
                                >
                                    <Container>
                                        <Field
                                            component={TextField}
                                            required
                                            select
                                            id='expiryMonth'
                                            name='expiryMonth'
                                            label='Expiry Month'
                                            fullWidth
                                            variant='standard'
                                        >
                                            {months.map((month) => (
                                                <MenuItem
                                                    key={month}
                                                    value={month}
                                                >
                                                    {month}
                                                </MenuItem>
                                            ))}
                                        </Field>
                                    </Container>
                                    <Container>
                                        <Field
                                            component={TextField}
                                            required
                                            select
                                            id='expiryYear'
                                            name='expiryYear'
                                            label='Expiry Year'
                                            fullWidth
                                            variant='standard'
                                        >
                                            {years.map((year) => (
                                                <MenuItem
                                                    key={year}
                                                    value={year}
                                                >
                                                    {year}
                                                </MenuItem>
                                            ))}
                                        </Field>
                                    </Container>
                                </Stack>
                                <Container>
                                    <Field
                                        component={TextField}
                                        required
                                        value={values.securityCode.toString()}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (
                                                formValidator.validateNumber(
                                                    value
                                                )
                                            )
                                                setFieldValue(
                                                    'securityCode',
                                                    value
                                                );
                                        }}
                                        inputProps={{ maxLength: 3 }}
                                        id='securityCode'
                                        name='securityCode'
                                        label='Security Code'
                                        fullWidth
                                        variant='standard'
                                    />
                                </Container>
                            </Stack>
                            <Stack spacing={1} my={2} maxWidth={'lg'}>
                                <Typography
                                    variant='h6'
                                    gutterBottom
                                    alignSelf={'center'}
                                >
                                    Payment Method
                                </Typography>

                                <Field
                                    component={RadioGroup}
                                    name='selectedMethod'
                                    value={values.selectedMethod.toString()}
                                    onChange={(e) => {
                                        setFieldValue(
                                            'selectedMethod',
                                            e.target.value
                                        );
                                    }}
                                >
                                    {paymentMethods.map((pm) => (
                                        <FormControlLabel
                                            key={pm.value}
                                            value={pm.value}
                                            name={pm.value}
                                            control={
                                                <Radio
                                                    disabled={isSubmitting}
                                                />
                                            }
                                            label={pm.label}
                                            disabled={isSubmitting}
                                        />
                                    ))}
                                </Field>
                            </Stack>
                        </Form>
                        <Button
                            onClick={submitForm}
                            disabled={isSubmitting}
                            sx={{ mt: 2, alignSelf: 'flex-end' }}
                        >
                            Place Order
                        </Button>
                    </>
                )}
            </Formik>
        </Stack>
    );
};

export default PaymentForm;
