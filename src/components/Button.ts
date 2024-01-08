import styled from 'styled-components';

export const Button = styled.button`
    font-size: 1rem;
    font-family: inherit;
    border: none;
    border-radius: 8px;
    padding: 0.5rem 0.75rem;
    box-shadow: 0 0px 1px hsla(0, 0%, 0%, 0.2), 0 1px 2px hsla(0, 0%, 0%, 0.2);
    background-color: white;
    line-height: 1.5;
    margin: 0;
    cursor: pointer;

    &:hover {
        box-shadow: 0 0px 1px hsla(0, 0%, 0%, 0.6), 0 1px 2px hsla(0, 0%, 0%, 0.2);
    }

    &:active {
        box-shadow: 0 0px 1px hsla(0, 0%, 0%, 0.4);
        transform: translateY(1px);
    }
`;
export const ConfirmButton = styled(Button)`
    background-color: #059e00;
    border: 1px solid #008502;
    color: white;
    font-weight: bold;
    width: 100%;
`;

export const DeleteButton = styled(Button)`
    background-color: white;
    border: 1px solid #fa1e00;
    color: #fa1e00;
    font-weight: bold;
    width: 100%;
    margin-top: 0.5rem;
`;