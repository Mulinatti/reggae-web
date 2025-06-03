import React from "react";
import Detalhes from "../../../components/detalhes"

interface PageProps {
  params: {
    user: string
  }
}

const Details = async ({ params }: PageProps) => {

  const {user} = await params;

  return (
    <main className="p-5">
      <Detalhes deviceId={user} />
    </main>
  )
};

export default Details;
