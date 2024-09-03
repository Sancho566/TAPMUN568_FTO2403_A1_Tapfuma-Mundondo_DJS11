import React, { useState, useEffect } from 'react';
import Carousel from './ShowCarousel';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: ${({ theme }) => theme.background || '#f5f5f5'};
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.text || '007bff'};
`;

const SignUpButton = styled.button`
  background-color: ${({ theme }) => theme.primary || '#007bff'};
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 1.2rem;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primaryDark || '#0056b3'};
  }
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  background-color: ${({ theme }) => theme.formBackground || '#ffffff'};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FormField = styled.div`
  margin-bottom: 15px;
  width: 100%;
  max-width: 300px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 1rem;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid ${({ theme }) => theme.border || '#ddd'};
  border-radius: 5px;
`;

const FormButton = styled.button`
  background-color: ${({ theme }) => theme.primary || '#007bff'};
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primaryDark || '#0056b3'};
  }
`;

const LandingPage = () => {
  const [shows, setShows] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Fetch shows or get data from an API
    fetch('https://podcast-api.netlify.app')
      .then(response => response.json())
      .then(data => setShows(data))
      .catch(error => console.error('Error fetching shows:', error));
  }, []);

  const handleSignUpClick = () => {
    setShowForm(!showForm);
  };

  return (
    <Container>
      <Title>Discover Your Next Favorite Show</Title>
      <Carousel shows={shows} />
      <SignUpButton onClick={handleSignUpClick}>
        {showForm ? 'Close Form' : 'Sign Up'}
      </SignUpButton>
      {showForm && (
        <SignUpForm>
          <FormField>
            <FormLabel htmlFor="name">Name</FormLabel>
            <FormInput type="text" id="name" name="name" required />
          </FormField>
          <FormField>
            <FormLabel htmlFor="email">Email</FormLabel>
            <FormInput type="email" id="email" name="email" required />
          </FormField>
          <FormField>
            <FormLabel htmlFor="password">Password</FormLabel>
            <FormInput type="password" id="password" name="password" required />
          </FormField>
          <FormButton type="submit">Sign Up</FormButton>
        </SignUpForm>
      )}
    </Container>
  );
};

export default LandingPage;
