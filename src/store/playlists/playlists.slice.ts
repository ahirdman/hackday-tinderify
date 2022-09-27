import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { SavedTracksData, Spotify } from '../../services';
import { PlaylistState, SelectListPayload, SetTracksPayload } from './playlists.interface';

export const createPlaylist = createAsyncThunk(
  'playlists/createPlaylist',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { token } = state.user.spotify;
    const { id } = state.user.spotify.profile;
    const { selectedList, tracks } = state.playlist;

    const data = await Spotify.createNewPlaylistWithTracks(selectedList, token, id, tracks);

    return data;
  }
  // {
  //   condition: (_, { getState }) => {
  //     const state = getState() as RootState;

  //     if (true) {
  //       return false;
  //     }

  //     return true;
  //   },
  // }
);

const initialState: PlaylistState = {
  selectedList: null,
  tracks: [] as SavedTracksData[],
  sync: {
    status: 'UNSYNCED',
    exporting: false,
    error: false,
  },
};

export const playlistSlice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {
    setSelectedList: (state, { payload }: PayloadAction<SelectListPayload>) => {
      state.selectedList = payload.selectedList;
    },
    setTracks: (state, { payload }: PayloadAction<SetTracksPayload>) => {
      state.tracks = payload.tracks;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createPlaylist.pending, state => {
        state.sync.exporting = true;
      })
      .addCase(createPlaylist.rejected, state => {
        state.sync.exporting = false;
        state.sync.error = true;
      })
      .addCase(createPlaylist.fulfilled, state => {
        state.sync.exporting = false;
        state.sync.status = 'SYNCED';
      });
  },
});

export const { setSelectedList, setTracks } = playlistSlice.actions;

export default playlistSlice.reducer;
