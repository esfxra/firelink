import React, { useState } from 'react';
import LinkCard from './LinkCard';
import { Link, LinkUpdates } from '../../types';
import styles from './LinkEditor.module.css';

interface Props {
  initialLinks: Link[];
  userID: string;
  onChange: () => void;
}

export default function LinkEditor({ initialLinks, userID, onChange }: Props) {
  const [links, setLinks] = useState(initialLinks);

  const addLink = async () => {
    const data = await postLinkToDB(userID);
    /**
     * Reset all links
     * @note This merges the previous state with the new one;
     * technically merging initial server props state with client state.
     * When the browser is refreshed, server state should include the changes from the mutation.
     *
     * @note Merging in such a way so that the new link is at the top of the array.
     */
    setLinks((state) => [{ ...data }, ...state]);
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
      <h1>Links</h1>
      <div className={styles.editor}>
        <button className={styles.button} onClick={addLink}>
          Create new link
        </button>

        {links.map((link) => (
          <LinkCard
            key={link._id}
            link={link}
            editLink={editLink}
            deleteLink={deleteLink}
          />
        ))}
      </div>
    </>
  );
}

/**
 * DB requests
 */
async function postLinkToDB(userID: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/link/`, {
    method: 'POST',
    body: JSON.stringify({ url: '', title: '', createdBy: userID }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const { data } = await res.json();
  return data;
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
