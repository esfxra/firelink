import { useState } from 'react';
import { Button, Center, VStack, useBoolean } from '@chakra-ui/react';

import LinkCard from './LinkCard';

import { Link, LinkUpdates } from '../../types';

interface Props {
  initialLinks: Link[];
  userID: string;
  onChange: () => void;
}

export default function LinkEditor({ initialLinks, userID, onChange }: Props) {
  const [links, setLinks] = useState(initialLinks);
  const [isLoading, setIsLoading] = useBoolean(false);

  const addLink = async () => {
    setIsLoading.on();
    const newLink = {
      url: '',
      title: '',
      published: false,
    };

    const { insertedId } = await postLinkToDB(newLink);
    /**
     * Reset all links
     * @note This merges the previous state with the new one;
     * technically merging initial server props state with client state.
     * When the browser is refreshed, server state should include the changes from the mutation.
     *
     * @note Merging in such a way so that the new link is at the top of the array.
     */
    setLinks((state) => [{ _id: insertedId, ...newLink }, ...state]);
    setIsLoading.off();
    onChange();
  };

  const deleteLink = async (linkID: string) => {
    const data = await deleteLinkFromDB(linkID);

    if (data.result) {
      setLinks((state) => state.filter((link) => link._id !== linkID));
    }

    onChange();
  };

  /**
   * @todo Handle cases for which an error occurred when editing the link.
   * This should take into account that the current strategy is
   * to not update the links array after an update. Edited components
   * will hold new state on their own until a server refresh occurs.
   */
  const editLink = async (linkID: string, updates: LinkUpdates) => {
    await editLinkFromDB(linkID, updates);
    onChange();
  };

  return (
    <>
      <Center>
        <VStack width="100%" maxWidth="800px" align="stretch" spacing={5}>
          <Button
            color="white"
            bgGradient="linear(to-r, red.500, orange.500)"
            _hover={{ bgGradient: 'linear(to-r, red.600, orange.500)' }}
            isLoading={isLoading}
            loadingText="Creating link"
            onClick={addLink}
          >
            Create a new link
          </Button>

          {links.map((link) => (
            <LinkCard
              key={link._id}
              link={link}
              editLink={editLink}
              deleteLink={deleteLink}
            />
          ))}
        </VStack>
      </Center>
    </>
  );
}

/**
 * DB requests
 */
async function postLinkToDB(newLink: Partial<Link>) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/link/`, {
    method: 'POST',
    body: JSON.stringify(newLink),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return await res.json();
}

async function deleteLinkFromDB(linkID: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/link/${linkID}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const { data } = await res.json();
  return data;
}

async function editLinkFromDB(linkID: string, updates: LinkUpdates) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/link/${linkID}`,
    {
      method: 'PUT',
      body: JSON.stringify(updates),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const { data } = await res.json();
  return data;
}
