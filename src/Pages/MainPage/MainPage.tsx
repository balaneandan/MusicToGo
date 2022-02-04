import { Stack, StackItem, TextField } from "@fluentui/react";
import { useCallback, useState } from "react";
import { buttonStyle, textFieldLabelStyle, textFieldStyle } from "./MainPage.styles";
import Button from '@mui/material/Button';

export const MainPage = (): JSX.Element => {
    const [link, setLink] = useState<string>("");

    const onChangeFirstTextFieldValue = useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
            setLink(newValue || '');
        },
        [],
    );

    const onClickConvertButton = (): void => {
        console.log(link);
    }

    return (
        <Stack horizontal>
            <StackItem className = {textFieldLabelStyle}>
                Link:
            </StackItem>
            <StackItem className = {textFieldStyle}>
                <TextField 
                    onChange={onChangeFirstTextFieldValue} 
                    value={link} 
                />
            </StackItem>
            <StackItem className = {buttonStyle}>
                <Button onClick={onClickConvertButton}>Convert</Button>
            </StackItem>
        </Stack>
    );
}