import React, { useContext, useEffect, useState } from "react";
import { APIContext } from "../contexts/api";

export default function useUser() {
  const { users } = useContext(APIContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let unsubscribe = users.subscribe((doc) => {
      setUser(doc.data());
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return user;
}
