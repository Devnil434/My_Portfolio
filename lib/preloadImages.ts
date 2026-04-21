export type FrameData = {
  heroImages: HTMLImageElement[];
  sectionImages: HTMLImageElement[];
};

export const preloadImages = async (): Promise<FrameData> => {
  const TOTAL_FRAMES = 192; // Found 192 frames in the directory
  
  const heroPromises = Array.from({ length: TOTAL_FRAMES }).map((_, i) => {
    return new Promise<HTMLImageElement>((resolve) => {
      const img = new Image();
      img.src = `/Hero_Sequence/${(i + 1).toString().padStart(5, '0')}.png`;
      img.onload = () => resolve(img);
      img.onerror = () => {
        console.error(`Failed to load hero frame ${i + 1}`);
        resolve(img);
      };
    });
  });

  const sectionPromises = Array.from({ length: TOTAL_FRAMES }).map((_, i) => {
    return new Promise<HTMLImageElement>((resolve) => {
      const img = new Image();
      img.src = `/Sections_Sequence/${(i + 1).toString().padStart(5, '0')}.png`;
      img.onload = () => resolve(img);
      img.onerror = () => {
        console.error(`Failed to load section frame ${i + 1}`);
        resolve(img);
      };
    });
  });

  const [heroImages, sectionImages] = await Promise.all([
    Promise.all(heroPromises),
    Promise.all(sectionPromises)
  ]);

  return { heroImages, sectionImages };
};
