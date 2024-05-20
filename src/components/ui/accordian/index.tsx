import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionTitleText,
  AccordionIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  AccordionContent,
  AccordionContentText,
} from '@gluestack-ui/themed';

interface AccordianItems {
  title: string;
  description: string;
}

interface Props {
  items: AccordianItems[];
}

export function CustomAccordian({items}: Props) {
  return (
    <Accordion
      m="$5"
      width="90%"
      size="md"
      variant="filled"
      type="single"
      isCollapsible={true}
      isDisabled={false}>
      {items?.map((item, index) => (
        <AccordionItem key={index} value={`a-${index}`}>
          <AccordionHeader>
            <AccordionTrigger>
              {({isExpanded}) => {
                return (
                  <>
                    <AccordionTitleText>{item.title}</AccordionTitleText>
                    {isExpanded ? (
                      <AccordionIcon as={ChevronUpIcon} ml="$3" />
                    ) : (
                      <AccordionIcon as={ChevronDownIcon} ml="$3" />
                    )}
                  </>
                );
              }}
            </AccordionTrigger>
          </AccordionHeader>

          <AccordionContent>
            <AccordionContentText>{item.description}</AccordionContentText>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
