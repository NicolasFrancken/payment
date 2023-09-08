"use client";

// import { BsCoin } from "react-icons/bs";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Badge,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import PricingCard from "./PricingCard";

const Tokens = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Badge content="99+" shape="circle" color="danger">
        <Button
          radius="full"
          isIconOnly
          aria-label="more than 99 notifications"
          variant="light"
          onPress={onOpen}
        >
          BUY {/* <BsCoin size={30} /> */}
        </Button>
      </Badge>
      <Modal
        backdrop="blur"
        size="4xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        className="px-8 py-8"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-2xl pt-0 pb-8">
                Choose your learning time! ⏳
              </ModalHeader>
              <ModalBody className="grid grid-cols-3 gap-8 p-0">
                <PricingCard
                  chosen={false}
                  cardPrice={"$1"}
                  cardMins={60}
                  cardText={"Hmh...only 1 hour.."}
                  index={1}
                />
                <PricingCard
                  chosen={true}
                  cardPrice={"$5"}
                  cardMins={180}
                  cardText={"This offer looks perfect!"}
                  index={2}
                />
                <PricingCard
                  chosen={false}
                  cardPrice={"$10"}
                  cardMins={360}
                  cardText={"5 hours for that price, I'm buying it!"}
                  index={3}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Tokens;
