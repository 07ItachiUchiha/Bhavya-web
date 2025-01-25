import { useState, useEffect } from 'react';

export const useFormValidation = (initialState, validationRules) => {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        validateForm();
    }, [values]);

    const validateForm = () => {
        let newErrors = {};
        let formIsValid = true;

        Object.keys(validationRules).forEach(field => {
            const value = field.split('.').reduce((obj, key) => obj?.[key], values);
            const rules = validationRules[field];

            if (rules.required && !value) {
                newErrors[field] = `${field} is required`;
                formIsValid = false;
            }

            if (rules.minLength && value?.length < rules.minLength) {
                newErrors[field] = `${field} must be at least ${rules.minLength} characters`;
                formIsValid = false;
            }

            if (rules.pattern && !rules.pattern.test(value)) {
                newErrors[field] = `${field} format is invalid`;
                formIsValid = false;
            }

            if (rules.custom) {
                const customError = rules.custom(value, values);
                if (customError) {
                    newErrors[field] = customError;
                    formIsValid = false;
                }
            }
        });

        setErrors(newErrors);
        setIsValid(formIsValid);
        return formIsValid;
    };

    const handleChange = (field, value) => {
        setValues(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return {
        values,
        errors,
        isValid,
        setValues,
        handleChange,
        validateForm
    };
}; 