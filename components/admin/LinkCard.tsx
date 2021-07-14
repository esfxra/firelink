import React, { FC, useRef, useEffect, useState } from 'react';
import TextField from './TextField';
import LinkToggle from './LinkToggle';
import styles from './LinkCard.module.css';

interface Props {
  url: string;
  title: string;
  published: boolean;
  editLink: any;
  deleteLink: any;
}

export default function LinkCard({
  url,
  title,
  published,
  editLink,
  deleteLink,
}: Props) {
  const saveTitle = ({ value }) => {
    editLink({ title: value });
  };

  const saveURL = ({ value }) => {
    editLink({ url: value });
  };

  const savePublished = ({ value }) => {
    editLink({ published: value });
  };

  return (
    <div className={styles.card}>
      <div className={styles.row}>
        {/* Title text field */}
        <TextField initialValue={title} saveValue={saveTitle} />

        {/* Enable */}
        <LinkToggle published={published} saveValue={savePublished} />
      </div>

      <div className={styles.row}>
        {/* URL text field */}
        <TextField initialValue={url} saveValue={saveURL} />

        {/* Delete */}
        <button className={styles.deleteButton} onClick={deleteLink}>
          delete
        </button>
      </div>
    </div>
  );
}
