import { Ionicons } from "@expo/vector-icons";
import { TC_IonIconsProps } from "./props";


const TC_IonIcons:React.FC<TC_IonIconsProps> = (props:TC_IonIconsProps)=>{
    return ( <Ionicons name={props.name} size={props.size} color={props.color} />)
}

export {TC_IonIcons};