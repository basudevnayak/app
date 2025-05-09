import { KeyboardTypeOptions, StyleProp, TextStyle, ViewStyle } from "react-native";

interface TC_ViewProps  {style:StyleProp<ViewStyle>};

interface TC_TextProps  {style:StyleProp<TextStyle>,label:string};

interface TC_ButtonProps {title:string,onPress:OnPress}




interface TC_IonIconsProps {name:any,size:any,color:string,style?:StyleProp<TextStyle>}

// Define the type for the callback function
type SetValue = (text: string) => void;
type OnPress  =()=> void;



// Define the props type for the component
 interface TC_TextInputWTextProps {
  label:TC_TextProps,
  input: TC_TextProps;
  value: string;
  setValue: SetValue;
  keyboardTypeOptions: KeyboardTypeOptions;
  maxLength?: number;
}

export {TC_TextProps,TC_TextInputWTextProps,TC_ButtonProps,TC_IonIconsProps,TC_ViewProps}