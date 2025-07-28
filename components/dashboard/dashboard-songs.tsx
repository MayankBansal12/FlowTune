import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ItemList, SongItem } from "../render-songs";
import { mockMusicData } from "@/__mocks__/mockSongsData";

export function DashboardSongs() {
  return (
    <Tabs defaultValue="playlists" className="w-full h-full row-span-7">
      <TabsList className="w-full gap-2 px-2 max-w-xl flex-shrink-0">
        <TabsTrigger
          className="bg-white/20 rounded-3xl cursor-pointer hover:bg-white/60 transition-all duration-300"
          value="playlists"
        >
          Playlists
        </TabsTrigger>
        <TabsTrigger
          className="    bg-white/20 rounded-3xl cursor-pointer hover:bg-white/60 transition-all duration-300"
          value="albums"
        >
          Albums
        </TabsTrigger>
        <TabsTrigger
          className="bg-white/20 rounded-3xl cursor-pointer hover:bg-white/60 transition-all duration-300"
          value="artists"
        >
          Artists
        </TabsTrigger>
        <TabsTrigger
          className="bg-white/20 rounded-3xl cursor-pointer hover:bg-white/60 transition-all duration-300"
          value="streams"
        >
          Streams
        </TabsTrigger>
        <TabsTrigger
          className="bg-white/20 rounded-3xl cursor-pointer hover:bg-white/60 transition-all duration-300"
          value="favorites"
        >
          Favorites
        </TabsTrigger>
      </TabsList>

      <div className="pt-4 flex-1 min-h-0">
        <TabsContent value="playlists" className="h-full">
          <ItemList
            items={mockMusicData}
            ItemComponent={SongItem}
            isRightBar={false}
          />
        </TabsContent>
        <TabsContent value="albums" className="h-full">
          <ItemList
            items={mockMusicData}
            ItemComponent={SongItem}
            isRightBar={false}
          />
        </TabsContent>
        <TabsContent value="artists" className="h-full">
          <ItemList
            items={mockMusicData}
            ItemComponent={SongItem}
            isRightBar={false}
          />
        </TabsContent>
        <TabsContent value="streams" className="h-full">
          <ItemList
            items={mockMusicData}
            ItemComponent={SongItem}
            isRightBar={false}
          />
        </TabsContent>
        <TabsContent value="favorites" className="h-full">
          <ItemList
            items={mockMusicData}
            ItemComponent={SongItem}
            isRightBar={false}
          />
        </TabsContent>
      </div>
    </Tabs>
  );
}
