import { FC, ButtonHTMLAttributes } from 'react';

import {
    BaseButton,
    GoogleSignInButton,
    InvertedButton,
} from './custom-button.styles';

export enum BUTTON_TYPE_CLASSES {
    base = 'base',
    google = 'google-sign-in',
    inverted = 'inverted',
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base): typeof BaseButton =>
    ({
        [BUTTON_TYPE_CLASSES.base]: BaseButton,
        [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
        [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
    }[buttonType]);

export type ButtonProps = {
    buttonType?: BUTTON_TYPE_CLASSES;
    isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({
                                     children,
                                     buttonType,
                                     ...otherProps
                                 }) => {
    const CustomButton = getButton(buttonType);
    return (
        <CustomButton  {...otherProps}>
            {children}
        </CustomButton>
    );
};

export default Button;