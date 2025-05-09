import {Button} from 'react-native';
import { TC_ButtonProps } from './props';

const TC_Button: React.FC<TC_ButtonProps> = (props:TC_ButtonProps)=> {
    return (<Button title={props.title} onPress={props.onPress} />);
}

export {TC_Button}