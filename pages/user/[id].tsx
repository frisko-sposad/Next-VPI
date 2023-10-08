import React from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/Header/header';

const UserInfo = () => {
  const router = useRouter();
  return (
    <div>
      <Header />
      <div className="flex justify-center">
        <div className="flex-col">
          <p>
            User <b>{router.query.id}</b> Info Page
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
