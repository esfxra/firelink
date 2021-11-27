import { Text, List, ListItem, ListIcon } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

const perks = [
  'One link to rule them all',
  'Customizable',
  'Safe and trusted',
  'Easy management',
];

export default function PerkList() {
  return (
    <List mt={{ base: 5, md: 0 }} spacing={{ base: 3, md: 10 }}>
      {perks.map((perk) => (
        <ListItem key={perk} display="flex" alignItems="center">
          <ListIcon fontSize={{ base: 'l', md: 'xl' }} as={CheckCircleIcon} />
          <Text fontSize={{ base: 'xl', md: '2xl' }}>{perk}</Text>
        </ListItem>
      ))}
    </List>
  );
}
