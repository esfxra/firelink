import React, { useState } from 'react';
import { Box, Grid, GridItem, Switch, Button } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import LinkText from './LinkText';
import { Link, LinkUpdates } from '../../types';

interface Props {
  link: Link;
  editLink: (id: string, updates: LinkUpdates) => {};
  deleteLink: (id: string) => {};
}

export default function LinkCard({ link, editLink, deleteLink }: Props) {
  const [published, setPublished] = useState(link.published);

  const saveTitle = ({ value }) => {
    editLink(link._id, { title: value });
  };

  const saveURL = ({ value }) => {
    editLink(link._id, { url: value });
  };

  const savePublished = ({ value }) => {
    editLink(link._id, { published: value });
  };

  return (
    <Box p={5} rounded={8} boxShadow="md" backgroundColor="white">
      <Grid gridTemplateColumns="repeat(5, 1fr)" mb={4}>
        {/* Title text field */}
        <GridItem colSpan={4}>
          <LinkText initialValue={link.title} onSave={saveTitle} />
        </GridItem>

        {/* Enable */}
        <Switch
          justifySelf="end"
          alignSelf="center"
          isChecked={published}
          colorScheme="orange"
          onChange={() => {
            savePublished({ value: !published });
            setPublished((state) => !state);
          }}
        />
      </Grid>

      <Grid gridTemplateColumns="repeat(5, 1fr)">
        {/* URL text field */}
        <GridItem colSpan={4}>
          <LinkText initialValue={link.url} onSave={saveURL} />
        </GridItem>

        {/* Delete */}
        <Button
          colorScheme="blackAlpha"
          justifySelf="end"
          alignSelf="center"
          size="sm"
          onClick={() => deleteLink(link._id)}
        >
          <DeleteIcon
            justifySelf="end"
            alignSelf="center"
            cursor="pointer"
            color="blackAlpha"
          />
          DELETE
        </Button>
      </Grid>
    </Box>
  );
}
