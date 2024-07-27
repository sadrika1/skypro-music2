"use client";

import Centerblock from "@/components/Centerblock/Centerblock";

import { useAppDispatch, useAppSelector } from "@/components/hooks";
import { useEffect, useState } from "react";
import { getPlaylistItems } from "@/api/tracks";
import { setInitialPlaylistItems } from "@/store/features/playListSlice";

import styles from "./layout.module.css";
import Filters from "@/components/Filters/Filters";

export default function MainPlaylistItemspage() {
  const dispatch = useAppDispatch();
  const filteredPlaylistItems = useAppSelector(
    (state) => state.playlist.filteredPlaylistItems
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    getPlaylistItems().then((data) => {
      dispatch(setInitialPlaylistItems({ initialPlaylistItems: data }));
      console.log(data);
      setIsLoading(false);
    });
  }, [dispatch]);

  return (
    <>
      <h2 className={styles.centerblockH2}>Треки</h2>
      <Filters />
      <Centerblock tracks={filteredPlaylistItems} isLoading={isLoading} />
    </>
  );
}
