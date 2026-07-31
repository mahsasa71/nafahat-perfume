import React from 'react';

const Description = ({ data }) => {
  return (
    <div className="text-zinc-700 dark:text-gray-300 leading-8 text-justify font-Dana">
      {data ? (
        <p>{data}</p>
      ) : (
        <p>توضیحاتی برای این محصول ثبت نشده است.</p>
      )}
    </div>
  );
};

export default Description;