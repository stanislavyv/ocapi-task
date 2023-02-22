import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

import { Formik, Form, Field } from 'formik';
import { TextField, RadioGroup } from 'formik-mui';

import { addBillingAddress } from '../../../services/orderService';
import * as formValidator from '../../../utils/helpers/formHelpers';
import { notifyError } from '../../../utils/toast';

const countries = [
    {
        name: 'Bulgaria',
        value: 'BG',
    },
];

const shippingMethods = [
    {
        label: 'Standard shipment: 7-10 business days',
        value: '001',
    },
    {
        label: 'Express shipment: 2 business days',
        value: '002',
    },
];

const validateForm = (values) => {
    const errors = {};

    formValidator.validateFirstName(values, errors);
    formValidator.validateLastName(values, errors);
    formValidator.validateCity(values, errors);
    formValidator.validateCountry(values, errors);
    formValidator.validateAddress(values, errors);

    return errors;
};

const BillingForm = ({ handleNext }) => {
    const initialValues = {
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        country: '',
        selectedMethod: shippingMethods[0].value,
    };

    const handleSubmit = (values, setSubmitting) => {
        addBillingAddress(values)
            .then((res) => {
                if (!res.fault) {
                    handleNext();
                }
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
                                    Shipping address
                                </Typography>
                                <Stack
                                    spacing={2}
                                    direction={{ xs: 'column', md: 'row' }}
                                    width={'100%'}
                                >
                                    <Container>
                                        <Field
                                            component={TextField}
                                            required
                                            id='firstName'
                                            name='firstName'
                                            label='First name'
                                            fullWidth
                                            autoComplete='given-name'
                                            variant='standard'
                                        />
                                    </Container>
                                    <Container>
                                        <Field
                                            component={TextField}
                                            required
                                            id='lastName'
                                            name='lastName'
                                            label='Last name'
                                            fullWidth
                                            autoComplete='family-name'
                                            variant='standard'
                                        />
                                    </Container>
                                </Stack>
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
                                            id='country'
                                            name='country'
                                            label='Country'
                                            fullWidth
                                            variant='standard'
                                        >
                                            {countries.map((c) => (
                                                <MenuItem
                                                    key={c.value}
                                                    value={c.value}
                                                >
                                                    {c.name}
                                                </MenuItem>
                                            ))}
                                        </Field>
                                    </Container>
                                    <Container>
                                        <Field
                                            component={TextField}
                                            required
                                            id='city'
                                            name='city'
                                            label='City'
                                            fullWidth
                                            autoComplete='shipping city'
                                            variant='standard'
                                        />
                                    </Container>
                                </Stack>
                                <Container>
                                    <Field
                                        component={TextField}
                                        required
                                        id='address'
                                        name='address'
                                        label='Address'
                                        fullWidth
                                        autoComplete='shipping address'
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
                                    Shipping Method
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
                                    {shippingMethods.map((sm) => (
                                        <FormControlLabel
                                            key={sm.value}
                                            value={sm.value}
                                            name={sm.value}
                                            control={
                                                <Radio
                                                    disabled={isSubmitting}
                                                />
                                            }
                                            label={sm.label}
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
                            Next
                        </Button>
                    </>
                )}
            </Formik>
        </Stack>
    );
};

export default BillingForm;
