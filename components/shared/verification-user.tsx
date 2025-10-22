import React from 'react';

interface Props {
  code: string;
}

export default function VerificationUserTemplate ({code}: Props) {
  return (
    <div className="">
      <p>Код подтверждения: {code}</p>
      <p><a href={`http://localhost:3000/api/auth/verify?code=${code}`}>Подтвердить регистрацию</a></p>
    </div>
  );
};
