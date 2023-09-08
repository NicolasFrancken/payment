import axios from "axios";
import { useRouter } from "next/navigation";

import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";

const PricingCard = ({ cardPrice, cardMins, chosen, cardText, index }) => {
  console.log(index);
  const router = useRouter();

  const handlePress = async (index) => {
    try {
      // Usar el index para determinar la acción
      let endpoint = "";
      let email = "";

      switch (index) {
        case 1:
          endpoint = "/api/mercadopago/payment/60";
          email = "mati@puto.com";
          break;
        case 2:
          endpoint = "/api/mercadopago/payment/180"; // Rellena con la URL adecuada
          email = "mati@puto.com";
          break;
        case 3:
          endpoint = "/api/mercadopago/payment/360"; // Rellena con la URL adecuada
          email = "mati@puto.com";
          break;
        default:
          // Manejar otros casos si es necesario
          break;
      }

      const res = await axios.post(
        endpoint,
        {
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res.data);
      router.push(res.data.init_point);
    } catch (e) {
      console.error(e);
      // Manejar errores si es necesario
    }
  };

  if (chosen) {
    return (
      <Card
        className="box-border py-2 pt-8 px-2  bg-gradient-to-r from-violet-900 to-sky-400 h-full "
        isFooterBlurred
        fullWidth={true}
      >
        <CardHeader className="text-xl text-center font-bold items-center justify-center pt-0">
          <h2 className="text-center">{cardMins} Minutes</h2>
        </CardHeader>
        <CardBody className="items-center justify-center px-0">
          <p className="font-bold">
            <span className="xl:text-4xl font-semibold">{cardPrice}</span>usd
          </p>
          <p className="text-tiny text-white/50 my-3">{cardText}</p>
        </CardBody>
        <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden before:rounded-xl rounded-large w-full shadow-small z-10 box-border flex-col">
          <p className="text-white text-sm pb-2">Buy your freedom with:</p>
          <ButtonGroup size="sm" variant="bordered">
            <Button
              variant="bordered"
              className="text-tiny text-white bg-black/20  border-white/20 border-1"
              color="default"
              radius="lg"
              size="sm"
              onPress={() => handlePress(index)}
            >
              MP
            </Button>
            <Button
              variant="bordered"
              className="text-tiny text-white bg-black/20  border-white/20 border-1"
              color="default"
              radius="lg"
              size="sm"
            >
              USDT
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="bg-gradient-to-r from-violet-900 to-sky-400 px-0.5 py-0.5 rounded-2xl">
      <Card className="box-border py-2 pt-8 px-2 h-full" fullWidth={true}>
        <CardHeader className="text-xl text-center font-bold items-center justify-center pt-0">
          <h2 className="text-center">{cardMins} Minutes</h2>
        </CardHeader>
        <CardBody className="items-center justify-center px-0">
          <p className="font-bold">
            <span className="xl:text-4xl font-semibold">{cardPrice}</span>usd
          </p>
          <p className="text-tiny text-white/50 my-3">{cardText}</p>
        </CardBody>
        <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden before:rounded-xl rounded-large w-full shadow-small z-10 box-border flex-col">
          <p className="text-white text-sm pb-2">Buy your freedom with:</p>
          <ButtonGroup size="sm" variant="bordered">
            <Button
              variant="bordered"
              className="text-tiny text-white bg-black/20  border-white/20 border-1"
              color="default"
              radius="lg"
              size="sm"
              onPress={() => handlePress(index)}
            >
              MP
            </Button>
            <Button
              variant="bordered"
              className="text-tiny text-white bg-black/20  border-white/20 border-1"
              color="default"
              radius="lg"
              size="sm"
            >
              USDT
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PricingCard;
