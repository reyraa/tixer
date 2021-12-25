import React from 'react';
import './result.css';

interface ResultProps {
  value: any;
}

const Result = ({ value }: ResultProps) => {
  return (
    <section className="result">
      { JSON.stringify(value) }
    </section>
  );
}

export default Result;
