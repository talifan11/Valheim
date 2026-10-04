import React from 'react';
import { motion } from 'framer-motion';
import { HeroSection } from './HeroSection';
import { PillarsSection } from './PillarsSection';
import { CitySection } from './CitySection';
import { BossesSection } from './BossesSection';
import { ProgressionSection } from './ProgressionSection';
import { CommunitySection } from './CommunitySection';
import { ChroniclesSection } from './ChroniclesSection';
import { ShopPreviewSection } from './ShopPreviewSection';
import { FinalCTASection } from './FinalCTASection';
import { LandingFooter } from './Footer';
import { TextureOverlay } from './components/TextureOverlay';

export function LandingPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Блок 1: Hero — «Зов» */}
      <HeroSection />

      {/* Блок 2: Берег — «Три столпа сервера» */}
      <div className="relative bg-[#0E1219]">
        <TextureOverlay />
        <PillarsSection />
      </div>

      {/* Блок 3: Город — «Что ты построишь» */}
      <CitySection />

      {/* Блок 4: Битвы — «С кем сразишься» */}
      <BossesSection />

      {/* Блок 5: Путь — «Как растёшь» */}
      <div className="relative bg-[#0B0E14]">
        <TextureOverlay />
        <ProgressionSection />
      </div>

      {/* Блок 6: Народ — «С кем идёшь» */}
      <div className="relative bg-[#0E1219]">
        <CommunitySection />
      </div>

      {/* Блок 7: Хроники — «Что уже произошло» */}
      <div className="relative bg-[#0B0E14]">
        <TextureOverlay />
        <ChroniclesSection />
      </div>

      {/* Блок 8: Магазин — «Что можно получить» */}
      <div className="relative bg-[#0E1219]">
        <ShopPreviewSection />
      </div>

      {/* Блок 9: Призыв — «Финальный CTA» */}
      <FinalCTASection />

      {/* Footer */}
      <LandingFooter />
    </motion.div>
  );
}
