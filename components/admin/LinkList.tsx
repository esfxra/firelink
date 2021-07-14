import React, { useState } from 'react';
import { useSession } from 'next-auth/client';
import LinkCard from './LinkCard';
import styles from './LinkList.module.css';

interface Props {
  initialLinks: any[];
}

/**
 * @todo Convert this component to a page once appearance and account settings
 * are added to admin.
 */
export default function LinkList({ initialLinks }: Props) {
  const [links, setLinks] = useState(initialLinks);
  const [session, _] = useSession();

  const addLink = async () => {
    const res = await fetch('http://localhost:3000/api/link/', {
      method: 'POST',
      body: JSON.stringify({ url: '', title: '', createdBy: session.user.id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { data } = await res.json();

    /**
     * Reset all links
     * @note This merges the previous state with the new one;
     * technically merging initial server props state with client state.
     * When the browser is refreshed, server state should include the changes from the mutation.
     *
     * @note Merging in such a way so that the new link is at the top of the array.
     */
    setLinks((state) => [{ ...data }, ...state]);
  };

  const deleteLink = async (id: string) => {
    const res = await fetch(`http://localhost:3000/api/link/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { data } = await res.json();
    if (data.result) {
      setLinks((state) => state.filter((link) => link._id !== id));
    }
  };

  /**
   * @todo Handle cases for which an error occurred when editing the link.
   * This should take into account that the current strategy is
   * to not update the links array after an update. Edited components
   * will hold new state on their own until a server refresh occurs.
   */
  const editLink = async (id: string, updates: {}) => {
    await fetch(`http://localhost:3000/api/link/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // const { data } = await res.json();
  };

  const linkList = links.map((link) => (
    <LinkCard
      key={link._id}
      id={link._id}
      url={link.url}
      title={link.title}
      published={link.published}
      editLink={editLink}
      deleteLink={deleteLink}
    />
  ));

  return (
    <>
      <button className={styles.newLink} onClick={addLink}>
        add new link
      </button>
      {linkList}
    </>
  );
}
