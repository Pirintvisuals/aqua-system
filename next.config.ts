import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

/* Az oldal megosztott (Node.js nelkuli) tarhelyre megy, ezert a build sima
   HTML fajlokat ir az out/ mappaba, a kepeket pedig a
   next-image-export-optimizer meretezi at build utan.

   Fejlesztes kozben (npm run dev) nincs export: ott a Keystatic helyi
   mentesehez kell az /api/keystatic szerver-utvonal. Ez a fajl route.dev.ts
   nevu, es csak dev modban szamit utvonalnak; elesben a szerkeszto a
   Keystatic Cloud-on at ment, a helyi utvonalra nincs szukseg. */
export default function nextConfig(phase: string): NextConfig {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  return {
    ...(isDev
      ? { pageExtensions: ["tsx", "ts", "jsx", "js", "dev.ts"] }
      : { output: "export", trailingSlash: true }),
    images: {
      loader: "custom",
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
      // 1920 fole nem megyunk: a legszelesebb kep (hero) is csak a
      // kepernyo felet foglalja, retina kijelzon is eleg.
      deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    },
    transpilePackages: ["next-image-export-optimizer"],
    env: {
      nextImageExportOptimizer_imageFolderPath: "public/images",
      nextImageExportOptimizer_exportFolderPath: "out",
      nextImageExportOptimizer_quality: "75",
      nextImageExportOptimizer_storePicturesInWEBP: "true",
      nextImageExportOptimizer_exportFolderName: "nextImageExportOptimizer",
      nextImageExportOptimizer_generateAndUseBlurImages: "true",
      nextImageExportOptimizer_remoteImageCacheTTL: "0",
    },
  };
}
