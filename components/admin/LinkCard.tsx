import React from 'react';
import TextField from './TextField';
import LinkToggle from './LinkToggle';
import styles from './LinkCard.module.css';
import { Link, LinkUpdates } from '../../types';
import Button from '../Button';

interface Props {
  link: Link;
  editLink: (id: string, updates: LinkUpdates) => {};
  deleteLink: (id: string) => {};
}

export default function LinkCard({ link, editLink, deleteLink }: Props) {
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
    <div className={styles.card}>
      <div className={styles.flexRow}>
        {/* Title text field */}
        <TextField
          label="TITLE"
          initialValue={link.title}
          saveValue={saveTitle}
        />

        {/* Enable */}
        <LinkToggle published={link.published} saveValue={savePublished} />
      </div>

      <div className={styles.flexRow}>
        {/* URL text field */}
        <TextField label="URL" initialValue={link.url} saveValue={saveURL} />

        {/* Delete */}
        <Button palette="danger" onClick={() => deleteLink(link._id)}>
          DELETE
        </Button>
      </div>
    </div>
  );
}
