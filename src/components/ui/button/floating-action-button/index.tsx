import {Fab, FabIcon, AddIcon, FabLabel} from '@gluestack-ui/themed';

interface Props {
  onPress?: () => any;
}

export default function FloatinActionButton({onPress}: Props) {
  return (
    <Fab
      onPress={onPress}
      size="md"
      placement="bottom right"
      isHovered={false}
      isDisabled={false}
      isPressed={false}>
      <FabIcon as={AddIcon} mr="$1" />
      <FabLabel>Status</FabLabel>
    </Fab>
  );
}
