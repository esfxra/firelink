import React from 'react';
import TextField from './TextField';
import LinkToggle from './LinkToggle';
import styles from './LinkCard.module.css';

interface Props {
  id: string;
  url: string;
  title: string;
  published: boolean;
  editLink: (id: string, updates: {}) => {};
  deleteLink: (id: string) => {};
}

export default function LinkCard({
  id,
  url,
  title,
  published,
  editLink,
  deleteLink,
}: Props) {
  const saveTitle = ({ value }) => {
    editLink(id, { title: value });
  };

  const saveURL = ({ value }) => {
    editLink(id, { url: value });
  };

  const savePublished = ({ value }) => {
    editLink(id, { published: value });
  };

  return (
    <div className={styles.card}>
      <div className={styles.row}>
        {/* Title text field */}
        <TextField label="title" initialValue={title} saveValue={saveTitle} />

        {/* Enable */}
        <LinkToggle published={published} saveValue={savePublished} />
      </div>

      <div className={styles.row}>
        {/* URL text field */}
        <TextField label="url" initialValue={url} saveValue={saveURL} />

        {/* Delete */}
        <button className={styles.deleteButton} onClick={() => deleteLink(id)}>
          delete
        </button>
      </div>
    </div>
  );
}
