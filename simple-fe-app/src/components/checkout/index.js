import { useState } from 'react';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import ShippingForm from '../forms/shipping-form';

const steps = [
    {
        label: 'Shipping Address',
        component: (handleNext) => <ShippingForm handleNext={handleNext} />,
    },
    { label: 'Billing Address', component: (handleNext) => <></> },
    { label: 'Payment Details', component: (handleNext) => <></> },
];

const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    return (
        <Box sx={{ width: '80%', alignSelf: 'flex-start', my: 3 }}>
            <Stepper activeStep={activeStep} sx={{ mb: 2 }}>
                {steps.map((step) => {
                    return (
                        <Step key={step.label}>
                            <StepLabel>{step.label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <>{steps[activeStep].component(handleNext)}</>
        </Box>
    );
};

export default Checkout;
