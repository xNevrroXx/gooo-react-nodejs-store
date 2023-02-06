import React from 'react';
import {useParams} from "react-router-dom";

const Filtered = () => {
  const category = useParams().title;

  return (
    <main className="list-products">
      <h1>{category}</h1>
    </main>
  );
};

export default Filtered;