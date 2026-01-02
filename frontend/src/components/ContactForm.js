import React, { useState } from 'react';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import Button from './ui/Button';
import Alert from './ui/Alert';

const ContactForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Validation functions
  const validateName = (name) => {
    if (!name.trim()) {
      return 'Name is required';
    }
    return '';
  };

  const validateEmail = (email) => {
    if (!email.trim()) {
      return 'Email is required';
    }
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const validatePhone = (phone) => {
    if (!phone.trim()) {
      return 'Phone is required';
    }
    return '';
  };

  const validateForm = () => {
    const newErrors = {};
    
    const nameError = validateName(formData.name);
    if (nameError) newErrors.name = nameError;

    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    const phoneError = validatePhone(formData.phone);
    if (phoneError) newErrors.phone = phoneError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Clear submit status when user makes changes
    if (submitStatus) {
      setSubmitStatus(null);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let error = '';

    switch (name) {
      case 'name':
        error = validateName(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'phone':
        error = validatePhone(value);
        break;
      default:
        break;
    }

    if (error) {
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    const result = await onSubmit(formData);
    
    setIsSubmitting(false);

    if (result.success) {
      setSubmitStatus({ type: 'success', message: 'Contact added successfully!' });
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      setErrors({});
    } else {
      setSubmitStatus({ type: 'error', message: result.message || 'Failed to add contact' });
    }
  };

  const isFormValid = () => {
    return formData.name.trim() && 
           formData.email.trim() && 
           validateEmail(formData.email) === '' &&
           formData.phone.trim() &&
           !isSubmitting;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Name"
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Enter your name"
        required
        error={errors.name}
      />

      <Input
        label="Email"
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Enter your email"
        required
        error={errors.email}
      />

      <Input
        label="Phone"
        type="tel"
        id="phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Enter your phone number"
        required
        error={errors.phone}
      />

      <Textarea
        label="Message"
        id="message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        rows="4"
        placeholder="Enter your message (optional)"
      />

      {submitStatus && (
        <Alert
          type={submitStatus.type}
          message={submitStatus.message}
          onClose={() => setSubmitStatus(null)}
        />
      )}

      <Button
        type="submit"
        variant="primary"
        disabled={!isFormValid()}
        className="w-full"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Contact'}
      </Button>
    </form>
  );
};

export default ContactForm;

