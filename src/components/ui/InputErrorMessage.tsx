import { Text} from "@chakra-ui/react"

interface IProps {
  msg?: string;
}
const InputErrorMessage = ({ msg }: IProps) => {
  return msg ? (
    <Text color={"red"} fontSize={"sm"} fontWeight={"bold"}  >{msg}</Text>
  ) : null;
};

export default InputErrorMessage;
