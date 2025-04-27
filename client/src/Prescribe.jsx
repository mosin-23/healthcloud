import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Prescribe = () => {
  const [formData, setFormData] = useState({
    pid: '',
    prescription: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await axios.put(
        `https://healthcloud-l1hl.onrender.com/patients/${formData.pid}`,
        { prescription: formData.prescription },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setFormData({ pid: '', prescription: '' });
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update prescription');
      console.error('Error updating prescription:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PrescribeContainer>
      <FormHeader>
        <h2>Prescribe Medication</h2>
        <DoctorIcon>👨‍⚕️</DoctorIcon>
      </FormHeader>

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="pid">Patient ID</Label>
          <Input
            type="text"
            id="pid"
            name="pid"
            value={formData.pid}
            onChange={handleChange}
            required
            placeholder="e.g., p745503"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="prescription">Prescription</Label>
          <TextArea
            id="prescription"
            name="prescription"
            value={formData.prescription}
            onChange={handleChange}
            required
            placeholder="Enter medication details..."
            rows="5"
          />
        </FormGroup>

        <ButtonContainer>
          <PrescribeButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : (
              <>
                <span>Prescribe</span>
                <PillIcon>💊</PillIcon>
              </>
            )}
          </PrescribeButton>
        </ButtonContainer>

        {success && (
          <SuccessMessage>
            ✓ Prescription updated successfully!
          </SuccessMessage>
        )}

        {error && (
          <ErrorMessage>
            ⚠️ {error}
          </ErrorMessage>
        )}
      </Form>
    </PrescribeContainer>
  );
};

// Styled components
const PrescribeContainer = styled.div`
  width: 350px;
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-left: 20px; /* Adds space between this and other components */
  border: 1px solid #e0e0e0;
`;

const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  h2 {
    color: #2c3e50;
    margin: 0;
    font-size: 1.4rem;
  }
`;

const DoctorIcon = styled.span`
  font-size: 1.6rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 6px;
  font-weight: 600;
  color: #34495e;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.95rem;
  &:focus {
    border-color: #3498db;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.95rem;
  resize: vertical;
  min-height: 100px;
  &:focus {
    border-color: #3498db;
    outline: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const PrescribeButton = styled.button`
  background: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  &:disabled {
    background: #95a5a6;
    cursor: not-allowed;
  }
`;

const PillIcon = styled.span`
  font-size: 1.1rem;
`;

const SuccessMessage = styled.div`
  background: #2ecc71;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.9rem;
  margin-top: 10px;
`;

const ErrorMessage = styled.div`
  background: #e74c3c;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.9rem;
  margin-top: 10px;
`;

export default Prescribe;