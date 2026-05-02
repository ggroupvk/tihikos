import { getLatestVideos } from '@/lib/queries/videos';
import { VideosRowClient } from './videos-row-client';

export async function VideosRow({ locale }: { locale: string }) {
  const videos = await getLatestVideos(5);
  return <VideosRowClient locale={locale} videos={videos} />;
}
