import * as React from "react";
import { useFavoritesStore } from "./favorites";

const Hydration = () => {
  React.useEffect(() => {
    useFavoritesStore.persist.rehydrate();
  }, []);

  return null;
};

export default Hydration;
