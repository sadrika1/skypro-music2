
import { trackType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PlayListStateType = {
    currentPlaylistItem: null | trackType,
    currentPlaylistItemIndex: null | number,
    playlist: trackType[],
    shuffledPlaylist: trackType[],
    isShuffle: boolean,
    isPlaying: boolean,
    isEnd: boolean,
    filretOptions: {
        author: string[],
        genre: string[],
        order: string,


        searchValue: string,

    },
    filteredPlaylistItems: trackType[],
    initialPlaylistItems: trackType[],
    likedPlaylistItemes:trackType[],
}

//первоначальное состояние
const initialState: PlayListStateType = {
    currentPlaylistItem: null,
    currentPlaylistItemIndex: null,
    playlist: [],
    shuffledPlaylist: [],
    isShuffle: false,
    isPlaying: false,
    isEnd: false,
    filretOptions: {
        author: [],
        genre: [],
        order: "по умолчанию",

        searchValue: "",

    },
    filteredPlaylistItems: [], // трэки по выбранному фильтру
    initialPlaylistItems: [], // все трэки
    likedPlaylistItemes:[],
};

const playListSlice = createSlice({
    name: "playList",
    initialState,
    reducers: {
        setInitialPlaylistItems: (state, action: PayloadAction<{ initialPlaylistItems: trackType[] }>) => {
            state.initialPlaylistItems = action.payload.initialPlaylistItems
            state.filteredPlaylistItems = action.payload.initialPlaylistItems
            state.playlist = action.payload.initialPlaylistItems
        },
        setLikedPlaylistItems:(state, action: PayloadAction<{ likedPlaylistItems: trackType[] }>) => {
            state.likedPlaylistItemes = action.payload.likedPlaylistItems
        },
        setCurrentPlaylistItem: (state, action: PayloadAction<{ trackData: trackType, tracksData: trackType[] }>) => {
            state.currentPlaylistItem = action.payload.trackData;
            const currentPlaylistItemIndex = state.playlist.findIndex((track) => track.id === action.payload.trackData?.id)

            console.log('setCurrentPlaylistItem index', currentPlaylistItemIndex)
            state.currentPlaylistItemIndex = currentPlaylistItemIndex
            state.playlist = action.payload.tracksData;
            state.shuffledPlaylist = [...action.payload.tracksData].sort(() => 0.5 - Math.random())
        },
        //следующий трэк
        setNextPlaylistItem: (state) => {
            const playlist = state.isShuffle ? state.shuffledPlaylist : state.playlist
            const currentPlaylistItemIndex = playlist.findIndex((track) => track.id === state.currentPlaylistItem?.id)
            const newPlaylistItem = playlist[currentPlaylistItemIndex + 1]
            if (newPlaylistItem) {
                state.currentPlaylistItem = newPlaylistItem
                state.currentPlaylistItemIndex = currentPlaylistItemIndex
            }
        },

        //предидущий трэк
        setPrevPlaylistItem: (state) => {
            const playlist = state.isShuffle ? state.shuffledPlaylist : state.playlist
            const currentPlaylistItemIndex = playlist.findIndex((track) => track.id === state.currentPlaylistItem?.id)
            const newPlaylistItem = playlist[currentPlaylistItemIndex - 1]
            if (newPlaylistItem) {
                state.currentPlaylistItem = newPlaylistItem
                state.currentPlaylistItemIndex = currentPlaylistItemIndex
            }
        },

        setIsShuffle: (state, action: PayloadAction<boolean>) => {
            state.isShuffle = action.payload
        },

        setIsPlaylistItemPlaying: (state, action: PayloadAction<boolean>) => {
            state.isPlaying = action.payload
        },
        setIsPlaylistItemEnd: (state, action: PayloadAction<boolean>) => {
            state.isEnd = action.payload
        },
        setCurrentPlaylistItemIndex: (state, action: PayloadAction<number>) => {
            state.currentPlaylistItemIndex = action.payload;
            state.currentPlaylistItem = state.playlist[action.payload];
        },
        setFilters: (state, action: PayloadAction<{ author?: string[], genre?: string[], order?: string, searchValue?: string }>) => {
            state.filretOptions = {
                author: action.payload.author || state.filretOptions.author,
                genre: action.payload.genre || state.filretOptions.genre,
                order: action.payload.order || state.filretOptions.order,


                searchValue: typeof action.payload.searchValue === "string"
                    ? action.payload.searchValue : state.filretOptions.searchValue,
            }

            const filteredArr = state.initialPlaylistItems.filter((track) => {
                const hasAuthors = state.filretOptions.author.length !== 0
                const isAuthors = hasAuthors ? state.filretOptions.author.includes(track.author) : true
                const hasGenres = state.filretOptions.genre.length !== 0
                const isGenre = hasGenres ? state.filretOptions.genre.includes(track.genre) : true

                const hasSearchValue =
                track.name.toLowerCase().includes(state.filretOptions.searchValue.toLowerCase()) ||
                track.author.toLowerCase().includes(state.filretOptions.searchValue.toLowerCase())
                return isAuthors && isGenre && hasSearchValue
            })

            switch (state.filretOptions.order) {
                case "сначала новые":
                  filteredArr.sort(
                    (a, b) =>
                      new Date(b.release_date).getTime() -
                      new Date(a.release_date).getTime()
                  );
                  break;
                case "сначала старые":
                  filteredArr.sort(
                    (a, b) =>
                      new Date(a.release_date).getTime() -
                      new Date(b.release_date).getTime()
                  );
                  break;
                default:
                  filteredArr;
                  break;
              }
              state.filteredPlaylistItems = filteredArr;
            },
          },
        });

        export const { setCurrentPlaylistItem } = playListSlice.actions;
        export const { setNextPlaylistItem } = playListSlice.actions;
        export const { setPrevPlaylistItem } = playListSlice.actions;
        export const { setIsShuffle } = playListSlice.actions;

        export const { setIsPlaylistItemPlaying } = playListSlice.actions;
        export const { setIsPlaylistItemEnd } = playListSlice.actions;
        export const { setFilters } = playListSlice.actions;
        export const { setInitialPlaylistItems } = playListSlice.actions;
        export const { setCurrentPlaylistItemIndex } = playListSlice.actions;
        export const { setLikedPlaylistItems } = playListSlice.actions;









        export const playListReducer = playListSlice.reducer;
