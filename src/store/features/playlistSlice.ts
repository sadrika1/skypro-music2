import { trackType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PlaylistStateType = {
  currentTrack: null | trackType;
  playlist: trackType[];
  shuffledPlaylist: trackType[];
  isShuffle: boolean;
  isPlaying: boolean;
  filterOptions: {
    author: string[];
    searchValue: string;
    order: string;
    genre: string[];
  };
  filteredTracks: trackType[];
  initialTracks: trackType[];
};

const initialState: PlaylistStateType = {
  currentTrack: null,
  playlist: [],
  shuffledPlaylist: [],
  isShuffle: false,
  isPlaying: true,
  filterOptions: {
    author: [],
    searchValue: "",
    order: "По умолчанию",
    genre: [],
  },
  filteredTracks: [],
  initialTracks: [],
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    toggleIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setCurrentTrack: (
      state,
      action: PayloadAction<{ track: trackType; tracksData: trackType[] }>
    ) => {
      state.currentTrack = action.payload.track;
      state.playlist = action.payload.tracksData;
      state.shuffledPlaylist = [...action.payload.tracksData].sort(
        () => 0.5 - Math.random()
      );
    },
    setNextTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shuffledPlaylist
        : state.playlist;
      const currentTrackIndex = playlist.findIndex(
        (track) => track.id === state.currentTrack?.id
      );
      const newTrack = playlist[currentTrackIndex + 1];
      if (newTrack) {
        state.currentTrack = newTrack;
      }
    },
    setPrevtrack: (state) => {
      const playlist = state.isShuffle
        ? state.shuffledPlaylist
        : state.playlist;
      const currentTrackIndex = playlist.findIndex(
        (track) => track.id === state.currentTrack?.id
      );
      const newTrack = playlist[currentTrackIndex - 1];
      if (newTrack) {
        state.currentTrack = newTrack;
      }
    },
    setIsShuffle: (state, action: PayloadAction<boolean>) => {
      state.isShuffle = action.payload;
    },
    toggleShuffle: (state) => {
      state.isShuffle = !state.isShuffle;
    },

    // setFilters: (
    //   state,
    //   action: PayloadAction<{
    //     author?: string[];
    //     searchValue?: string;
    //     order?: string;
    //     genre?: string[];
    //   }>
    // ) => {
    //   state.filterOptions = {
    //     author: action.payload.author || state.filterOptions.author,
    //     searchValue:
    //       action.payload.searchValue || state.filterOptions.searchValue,
    //     order: action.payload.order || state.filterOptions.order,
    //     genre: action.payload.genre || state.filterOptions.genre,
    //   };

    //   // state.filterOptions = {
    //   //   ...state.filterOptions,
    //   //   ...action.payload.value,
    //   // };
    //   const arrFilters = state.initialTracks.filter((track) => {
    //     const hasAuthors = state.filterOptions.author.length != 0;
    //     const hasGenre = state.filterOptions.genre.length != 0;
    //     const isGenre = hasGenre
    //       ? state.filterOptions.genre.includes(track.genre)
    //       : true;
    //     const isAuthors = hasAuthors
    //       ? state.filterOptions.author.includes(track.author)
    //       : true;
    //     const hasSearchValue = track.name
    //       .toLowerCase()
    //       .includes(state.filterOptions.searchValue?.toLowerCase());
    //     return isAuthors && hasSearchValue && isGenre;
    //   });
    setFilters: (
      state,
      action: PayloadAction<{
        author?: string[];
        searchValue?: string;
        order?: string;
        genre?: string[];
      }>
    ) => {
      state.filterOptions = { ...state.filterOptions, ...action.payload };

      const arrFilters = state.initialTracks.filter((track) => {
        const isGenre =
          !state.filterOptions.genre.length ||
          state.filterOptions.genre.includes(track.genre);
        const isAuthors =
          !state.filterOptions.author.length ||
          state.filterOptions.author.includes(track.author);
        const hasSearchValue =
          !state.filterOptions.searchValue ||
          track.name
            .toLowerCase()
            .includes(state.filterOptions.searchValue.toLowerCase());

        return isAuthors && hasSearchValue && isGenre;
      });

      switch (state.filterOptions.order) {
        case "Сначала новые":
          arrFilters.sort(
            (a, b) =>
              new Date(b.release_date).getTime() -
              new Date(a.release_date).getTime()
          );
          break;
        case "Сначала старые":
          arrFilters.sort(
            (a, b) =>
              new Date(a.release_date).getTime() -
              new Date(b.release_date).getTime()
          );
          break;

        default:
          break;
      }
      state.filteredTracks = arrFilters;
    },
  },
});

export const {
  setCurrentTrack,
  setNextTrack,
  setIsShuffle,
  setPrevtrack,
  toggleShuffle,
  toggleIsPlaying,
  setFilters,
} = playlistSlice.actions;
export const playlistReducer = playlistSlice.reducer;
