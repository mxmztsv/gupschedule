import React, {useState} from 'react';
import { Text, TouchableHighlight } from 'react-native';
import styled from 'styled-components/native';
import {AuthContext} from '../context';

const colors = {
    accent: '#8b0401',
    highlight: '#640200',
    contrast: '#FFF',
}

const Label = styled.Text`
  color: ${props => !props.outline ? colors.contrast : colors.accent};
  font-weight: bold;
  font-size: 16px;
  align-self: center;
  padding: 10px;
`

const ButtonContainer = styled.TouchableHighlight`
  background-color: ${props => props.outline ? colors.contrast : colors.accent};
  width: 170px;
  margin-top: 25px;
  border-color: ${colors.accent};
  border-width: 2px;
  border-radius: 50px;
`

const Button = (props) => {
    return (
        <ButtonContainer
            onPress={props.onPress}
            underlayColor={colors.highlight}
        >
            <Label>
                {props.children}
            </Label>
        </ButtonContainer>
    );
};

export default Button;
