import { getCategoryPlaylistPlaylistItems } from "@/api/tracks";
import Centerblock from "@/components/Centerblock/Centerblock";

import styles from "../../layout.module.css";

type CategoryType = {
  params: {
    id: string;
  };
};

export default async function CategotyPage({ params }: CategoryType) {
  const tracksData = await getCategoryPlaylistPlaylistItems(params.id);

  let playlistTitle;
  switch (params.id) {
    case "1":
      playlistTitle = "Плейлист дня";
      break;
    case "2":
      playlistTitle = "100 танцевальных хитов";
      break;
    case "3":
      playlistTitle = "Инди заряд";
      break;
    case "liked":
      playlistTitle = "Мой плейлист";
      break;
    default:
      playlistTitle = "";
      break;
  }

  return (
    <>
      <h2 className={styles.centerblockH2}>{playlistTitle}</h2>
      <Centerblock tracks={tracksData} isLoading={false} />
    </>
  );
}
