import {Text} from 'react-native';
import { TC_TextProps } from './props';


const TC_Text:React.FC<TC_TextProps> = (props:TC_TextProps)=>{
    return (<Text style={props.style}>{props.label}</Text>)
}

export {TC_Text};