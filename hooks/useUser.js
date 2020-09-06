import React, { useContext, useEffect, useState } from "react";
import { APIContext } from "../contexts/api";

export default function useUser() {
  const { auth, users } = useContext(APIContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (auth.isSignedIn()) {
      let unsubscribe = users.subscribe((doc) => {
        setUser(doc.data());
      });

      return () => {
        unsubscribe();
      };
    }
  }, [auth.isSignedIn()]);

  return user;
}
