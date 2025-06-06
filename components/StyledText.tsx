import { Text, TextProps } from './Themed';

export function KarlaText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'Karla' }]} />;
}
