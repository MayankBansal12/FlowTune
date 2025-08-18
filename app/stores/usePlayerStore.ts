import { create } from "zustand";
import { persist } from "zustand/middleware";

const usePlayerStore = create()(
  persist(
    (set, get) => ({
      audioElement: null,
      setAudioElement: (audioElement) => set({ audioElement }),
      playerQueue: [],
      currentPlayCollapsed: true,
      currentSongIndex: -1,
      currentPlaying: null,
      isPlaying: false,
      isShuffle: false,
      isRepeat: false,
      isMuted: false,
      volumeLevel: 50,
      currentTime: 0,
      duration: 0,

      setPlayerQueue: (playerQueue) => set({ playerQueue }),

      addToQueue: (song) => {
        const { playerQueue } = get();
        set({ playerQueue: [...playerQueue, song] });
      },

      addToQueueAndPlay: (song) => {
        const { playerQueue } = get();

        const existingIndex = playerQueue.findIndex((s) => s.id === song.id);

        if (existingIndex !== -1) {
          set({
            currentSongIndex: existingIndex,
            currentPlaying: song,
          });
          get().playSong(song);
        } else {
          const newQueue = [...playerQueue, song];
          set({
            playerQueue: newQueue,
            currentSongIndex: newQueue.length - 1,
            currentPlaying: song,
          });
          get().playSong(song);
        }
      },

      removeFromQueue: (index) => {
        const { playerQueue, currentSongIndex } = get();
        const newQueue = playerQueue.filter((_, i) => i !== index);

        let newCurrentIndex = currentSongIndex;
        if (index < currentSongIndex) {
          newCurrentIndex--;
        } else if (index === currentSongIndex) {
          if (newQueue.length > 0) {
            const nextSong = newQueue[Math.min(index, newQueue.length - 1)];
            get().playSong(nextSong);
            newCurrentIndex = Math.min(index, newQueue.length - 1);
          } else {
            newCurrentIndex = -1;
            get().stop();
          }
        }

        set({
          playerQueue: newQueue,
          currentSongIndex: newCurrentIndex,
        });
      },

      clearQueue: () => {
        set({
          playerQueue: [],
          currentSongIndex: -1,
          currentPlaying: null,
        });
        get().stop();
      },

      setIsShuffle: (isShuffle) => set({ isShuffle }),
      toggleShuffle: () => {
        const { isShuffle, playerQueue } = get();
        if (!isShuffle && playerQueue.length > 1) {
          const shuffledQueue = [...playerQueue];
          for (let i = shuffledQueue.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledQueue[i], shuffledQueue[j]] = [
              shuffledQueue[j],
              shuffledQueue[i],
            ];
          }
          set({
            isShuffle: true,
            playerQueue: shuffledQueue,
          });
        } else {
          set({ isShuffle: false });
        }
      },

      setIsRepeat: (isRepeat) => set({ isRepeat }),
      toggleRepeat: () => {
        const { isRepeat } = get();
        set({ isRepeat: !isRepeat });
      },

      setCurrentPlayCollapsed: (currentPlayCollapsed) =>
        set({ currentPlayCollapsed }),
      toggleCurrentPlayCollapsed: () => {
        const { currentPlayCollapsed } = get();
        set({ currentPlayCollapsed: !currentPlayCollapsed });
      },

      playSong: (song) => {
        const { audioElement } = get();
        if (audioElement && song?.audioSrc) {
          audioElement.src = song.audioSrc;
          audioElement.load();
          audioElement.play().catch(console.error);
          set({
            currentPlaying: song,
            isPlaying: true,
            currentPlayCollapsed: false,
          });
        }
      },

      play: () => {
        const { audioElement, currentPlaying } = get();
        if (audioElement && currentPlaying) {
          audioElement.play().catch(console.error);
          set({ isPlaying: true });
        }
      },

      pause: () => {
        const { audioElement } = get();
        if (audioElement) {
          audioElement.pause();
          set({ isPlaying: false });
        }
      },

      stop: () => {
        const { audioElement } = get();
        if (audioElement) {
          audioElement.pause();
          audioElement.currentTime = 0;
          set({
            isPlaying: false,
            currentTime: 0,
          });
        }
      },

      togglePlayPause: () => {
        const { isPlaying } = get();
        if (isPlaying) {
          get().pause();
        } else {
          get().play();
        }
      },

      playNext: () => {
        const { playerQueue, currentSongIndex, isRepeat } = get();
        if (playerQueue.length === 0) return;

        let nextIndex = currentSongIndex + 1;

        if (nextIndex >= playerQueue.length) {
          if (isRepeat) {
            nextIndex = 0;
          } else {
            return;
          }
        }

        const nextSong = playerQueue[nextIndex];
        set({ currentSongIndex: nextIndex });
        get().playSong(nextSong);
      },

      playPrevious: () => {
        const { playerQueue, currentSongIndex, audioElement } = get();
        if (playerQueue.length === 0) return;

        if (audioElement && audioElement.currentTime > 3) {
          audioElement.currentTime = 0;
          return;
        }

        let prevIndex = currentSongIndex - 1;
        if (prevIndex < 0) {
          prevIndex = playerQueue.length - 1;
        }

        const prevSong = playerQueue[prevIndex];
        set({ currentSongIndex: prevIndex });
        get().playSong(prevSong);
      },

      setVolumeLevel: (volumeLevel) => {
        const { audioElement } = get();
        if (audioElement) {
          audioElement.volume = volumeLevel / 100;
        }
        set({ volumeLevel });
      },

      setIsMuted: (isMuted) => {
        const { audioElement } = get();
        if (audioElement) {
          audioElement.muted = isMuted;
        }
        set({ isMuted });
      },

      toggleMute: () => {
        const { isMuted } = get();
        get().setIsMuted(!isMuted);
      },

      seekTo: (time) => {
        const { audioElement } = get();
        if (audioElement) {
          audioElement.currentTime = time;
          set({ currentTime: time });
        }
      },

      updateCurrentTime: (currentTime) => set({ currentTime }),
      updateDuration: (duration) => set({ duration }),

      handleSongEnd: () => {
        const { isRepeat, playerQueue, currentSongIndex } = get();

        if (isRepeat) {
          const currentSong = playerQueue[currentSongIndex];
          if (currentSong) {
            get().playSong(currentSong);
          }
        } else {
          get().playNext();
        }
      },

      setCurrentPlaying: (currentPlaying) => set({ currentPlaying }),
    }),
    {
      name: "player-storage",
      partialize: (state) => ({
        playerQueue: state.playerQueue,
        currentSongIndex: state.currentSongIndex,
        currentPlaying: state.currentPlaying,
        isShuffle: state.isShuffle,
        isRepeat: state.isRepeat,
        isMuted: state.isMuted,
        volumeLevel: state.volumeLevel,
      }),
    },
  ),
);

export default usePlayerStore;
