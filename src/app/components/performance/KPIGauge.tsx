import svgPaths from "../../imports/svg-crx7gxftpr";

interface KPIGaugeProps {
  achievement: number;
  status: "green" | "amber" | "red" | "blue" | "yellow";
  size?: "sm" | "md" | "lg";
}

export function KPIGauge({ achievement, status, size = "md" }: KPIGaugeProps) {
  // Calculate needle rotation based on achievement (0-120% scale)
  // The gauge spans 180 degrees (-90 to +90)
  const maxAngle = 180;
  const normalizedAchievement = Math.min(Math.max(achievement, 0), 120);
  const rotation = (normalizedAchievement / 120) * maxAngle - 90;

  const sizeMap = {
    sm: { width: 120, height: 73 },
    md: { width: 160, height: 97 },
    lg: { width: 200, height: 121 }
  };

  const dimensions = sizeMap[size];

  return (
    <div 
      className="relative flex-shrink-0" 
      style={{ 
        width: `${dimensions.width}px`, 
        height: `${dimensions.height}px` 
      }}
    >
      {/* Main gauge structure */}
      <div className="absolute contents left-0 top-0">
        {/* Gauge Chart - Background and needle */}
        <div className="absolute contents inset-0">
          {/* Group2 - Main gauge with needle */}
          <div className="absolute bottom-0 contents left-0 right-[2.26%] top-0">
            {/* Background gauge segments */}
            <div className="absolute bottom-[18.53%] left-0 right-[2.26%] top-0">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 157 80">
                <g>
                  <path d={svgPaths.p26e5bf00} fill="#C4D9ED" />
                  <path d={svgPaths.p24854400} fill="#C4D9ED" />
                  <path d={svgPaths.p321a7500} fill="#C4D9ED" />
                  <path d={svgPaths.p39932880} fill="#C4D9ED" />
                  <path d={svgPaths.p26a90c00} fill="#C4D9ED" />
                  <path d={svgPaths.p397a6480} fill="#C4D9ED" />
                  <path d={svgPaths.p386ef400} fill="#C4D9ED" />
                  <path d={svgPaths.p1b66600} fill="#C4D9ED" />
                  <path d={svgPaths.p208b7800} fill="#C4D9ED" />
                  <path d={svgPaths.p8868cb2} fill="#C4D9ED" />
                  <path d={svgPaths.p2eb6c00} fill="#C4D9ED" />
                  <path d={svgPaths.p36d7c080} fill="#C4D9ED" />
                  <path d={svgPaths.pdf6d80} fill="#C4D9ED" />
                  <path d={svgPaths.p3d6b5400} fill="#C4D9ED" />
                  <path d={svgPaths.pce88680} fill="#C4D9ED" />
                  <path d={svgPaths.p3e2cbe00} fill="#C4D9ED" />
                  <path d={svgPaths.p2fc34700} fill="#C4D9ED" />
                  <path d={svgPaths.p10e99e80} fill="#679BCC" />
                  <path d={svgPaths.p2dd0ae00} fill="#679BCC" />
                  <path d={svgPaths.p2561b900} fill="#679BCC" />
                  <path d={svgPaths.p37259e00} fill="#679BCC" />
                  <path d={svgPaths.p3aa36ef0} fill="#679BCC" />
                  <path d={svgPaths.p38288b00} fill="#679BCC" />
                  <path d={svgPaths.p2b8bb7f0} fill="#679BCC" />
                  <path d={svgPaths.p35c79400} fill="#679BCC" />
                  <path d={svgPaths.p349a6e00} fill="#679BCC" />
                  <path d={svgPaths.p143dc480} fill="#679BCC" />
                  <path d={svgPaths.p1debdd80} fill="#679BCC" />
                  <path d={svgPaths.p1fbfa480} fill="#679BCC" />
                  <path d={svgPaths.p47ea900} fill="#679BCC" />
                  <path d={svgPaths.p2b392900} fill="#679BCC" />
                  <path d={svgPaths.p1dd11300} fill="#377ABA" />
                  <path d={svgPaths.p1be5c680} fill="#377ABA" />
                  <path d={svgPaths.p37800d80} fill="#377ABA" />
                  <path d={svgPaths.p11196d00} fill="#377ABA" />
                  <path d={svgPaths.p16685cc0} fill="#377ABA" />
                  <path d={svgPaths.p22592f00} fill="#377ABA" />
                  <path d={svgPaths.p1080580} fill="#377ABA" />
                  <path d={svgPaths.pf1dad00} fill="#377ABA" />
                  <path d={svgPaths.p218d4480} fill="#256CAF" />
                  <path d={svgPaths.p21af1f80} fill="#256CAF" />
                  <path d={svgPaths.p25690a00} fill="#256CAF" />
                  <path d={svgPaths.p3347e00} fill="#256CAF" />
                  <path d={svgPaths.pe45d000} fill="#256CAF" />
                  <path d={svgPaths.p24999700} fill="#256CAF" />
                  <path d={svgPaths.p3dc71d80} fill="#256CAF" />
                  <path d={svgPaths.pd09090} fill="#256CAF" />
                  <path d={svgPaths.p1992100} fill="#256CAF" />
                  <path d={svgPaths.p1f7d5d00} fill="#256CAF" />
                  <path d={svgPaths.p7a64f00} fill="#256CAF" />
                  <path d={svgPaths.p34afe400} fill="#256CAF" />
                  <path d={svgPaths.p1cc0b780} fill="#256CAF" />
                  <path d={svgPaths.p356a0200} fill="#256CAF" />
                  <path d={svgPaths.p1812800} fill="#256CAF" />
                  <path d={svgPaths.pa3a7500} fill="#256CAF" />
                  <path d={svgPaths.p10bc2a00} fill="#256CAF" />
                  <path d={svgPaths.p213d2100} fill="#256CAF" />
                  <path d={svgPaths.p2b2b6440} fill="#256CAF" />
                  <path d={svgPaths.p25792680} fill="#256CAF" />
                  <path d={svgPaths.p3b8e9f00} fill="#256CAF" />
                  <path d={svgPaths.p2d4c0300} fill="#256CAF" />
                  <path d={svgPaths.p29dfc300} fill="#256CAF" />
                </g>
              </svg>
            </div>

            {/* White center circle with shadow */}
            <div className="absolute inset-[20.91%_14.48%_18.64%_12.22%]">
              <div className="absolute inset-[-1.92%_-2.66%_-8.53%_-2.66%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 124 65">
                  <g filter="url(#filter0_d_gauge)">
                    <path d={svgPaths.p3c02a4e0} fill="white" />
                    <path d={svgPaths.p3c02a4e0} stroke="#CDCDCD" strokeMiterlimit="10" strokeWidth="0.25" />
                  </g>
                  <defs>
                    <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="64.7682" id="filter0_d_gauge" width="123.537" x="0" y="0">
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                      <feOffset dy="2" />
                      <feGaussianBlur stdDeviation="1.5" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix type="matrix" values="0 0 0 0 0.733333 0 0 0 0 0.733333 0 0 0 0 0.733333 0 0 0 0.25 0" />
                      <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_gauge" />
                      <feBlend in="SourceGraphic" in2="effect1_dropShadow_gauge" mode="normal" result="shape" />
                    </filter>
                  </defs>
                </svg>
              </div>
            </div>

            {/* 100% label */}
            <p 
              className="absolute bottom-[2.06%] font-['Open_Sans:Light',_sans-serif] font-light h-[14px] leading-[normal] left-[54px] text-[12px] text-black top-[84.54%] w-[34px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              100%
            </p>

            {/* Needle */}
            <div className="absolute flex items-center justify-center" style={{
              left: '50%',
              bottom: '18.64%',
              transform: 'translateX(-50%)',
              width: '26.413px',
              height: '58.047px'
            }}>
              <div 
                className="absolute bottom-0 left-1/2"
                style={{
                  transform: `translateX(-50%) rotate(${rotation}deg)`,
                  transformOrigin: 'center bottom',
                  transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  width: '26.413px',
                  height: '58.047px'
                }}
              >
                <div className="relative size-full">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 59">
                    <g>
                      <path d={svgPaths.p2e0ca800} fill="#2872B8" />
                      <path d={svgPaths.p30b5ec00} fill="#1B1D21" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Scale labels */}
          <p 
            className="absolute bottom-[2.06%] font-['Open_Sans:Light',_sans-serif] font-light leading-[normal] left-[83.13%] right-0 text-[#1b1d21] text-[10px] top-[84.54%]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            120%
          </p>
          <p 
            className="absolute font-['Open_Sans:Light',_sans-serif] font-light inset-[84.61%_93.26%_1.71%_3.63%] leading-[normal] text-[#1b1d21] text-[10px]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            0
          </p>
        </div>

        {/* Gauge Chart 1 - Color zones overlay */}
        <div className="absolute contents inset-[20.82%_13.47%_17.1%_11.92%]">
          <div className="absolute contents inset-[20.82%_13.47%_17.1%_11.92%]">
            <div className="absolute inset-[20.82%_13.47%_17.1%_11.92%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 120 61">
                <g>
                  <g></g>
                  {/* Red zone (0-40%) */}
                  <path d={svgPaths.p1a4630c0} fill="#D83731" />
                  <path d={svgPaths.p18a3e6f0} fill="#D83731" />
                  <path d={svgPaths.p7475e00} fill="#D83731" />
                  <path d={svgPaths.p3353da80} fill="#D83731" />
                  <path d={svgPaths.p3e099780} fill="#D83731" />
                  <path d={svgPaths.p1d10e600} fill="#D83731" />
                  <path d={svgPaths.pf0d0100} fill="#D83731" />
                  <path d={svgPaths.p23696b00} fill="#D83731" />
                  <path d={svgPaths.p244b8680} fill="#D83731" />
                  <path d={svgPaths.p295c4e00} fill="#D83731" />
                  
                  {/* Yellow zone (40-80%) */}
                  <path d={svgPaths.p5a77e80} fill="#F2E600" />
                  <path d={svgPaths.p1fe79580} fill="#F2E600" />
                  <path d={svgPaths.p2b3b8880} fill="#F2E600" />
                  <path d={svgPaths.p1f128e00} fill="#F2E600" />
                  <path d={svgPaths.p140f3000} fill="#F2E600" />
                  <path d={svgPaths.pb5a9c00} fill="#F2E600" />
                  <path d={svgPaths.p2c92dc80} fill="#F2E600" />
                  <path d={svgPaths.p3da65e80} fill="#F2E600" />
                  <path d={svgPaths.p232baa00} fill="#F2E600" />
                  
                  {/* Green zone (80-100%) */}
                  <path d={svgPaths.p132f21c0} fill="#357743" />
                  <path d={svgPaths.p29997400} fill="#357743" />
                  <path d={svgPaths.p1aa008c0} fill="#357743" />
                  <path d={svgPaths.p32d3e00} fill="#357743" />
                  <path d={svgPaths.p9a2df00} fill="#357743" />
                  <path d={svgPaths.p38ec2d00} fill="#357743" />
                  <path d={svgPaths.p27caea40} fill="#357743" />
                  <path d={svgPaths.p23e75100} fill="#357743" />
                  <path d={svgPaths.p3a95ce00} fill="#357743" />
                  <path d={svgPaths.p12502900} fill="#357743" />
                  <path d={svgPaths.p31f88e00} fill="#357743" />
                  <path d={svgPaths.p3b07b300} fill="#357743" />
                  <path d={svgPaths.p23f2d900} fill="#357743" />
                  <path d={svgPaths.p213e1100} fill="#357743" />
                  <path d={svgPaths.p2232fc80} fill="#357743" />
                  <path d={svgPaths.p32ffdc00} fill="#357743" />
                  <path d={svgPaths.p3c1f6000} fill="#357743" />
                  <path d={svgPaths.p17d0be80} fill="#357743" />
                  <path d={svgPaths.p8265b80} fill="#357743" />
                  <path d={svgPaths.p30c5da00} fill="#357743" />
                  <path d={svgPaths.pdc7b780} fill="#357743" />
                  <path d={svgPaths.p3c713300} fill="#357743" />
                  <path d={svgPaths.p252b2b00} fill="#357743" />
                  <path d={svgPaths.p301d9200} fill="#357743" />
                  <path d={svgPaths.p12b1c00} fill="#357743" />
                  <path d={svgPaths.p19ad0ff0} fill="#357743" />
                  <path d={svgPaths.p10702900} fill="#357743" />
                  <path d={svgPaths.p1cba9c72} fill="#357743" />
                  <path d={svgPaths.p3abd3640} fill="#357743" />
                  <path d={svgPaths.paf8f080} fill="#357743" />
                  
                  {/* Blue zone (100-120%) */}
                  <path d={svgPaths.p3b48d480} fill="#335CFF" />
                  <path d={svgPaths.p23e4f000} fill="#335CFF" />
                  <path d={svgPaths.p2c207600} fill="#335CFF" />
                  <path d={svgPaths.p28033c00} fill="#335CFF" />
                  <path d={svgPaths.pe3d600} fill="#335CFF" />
                  <path d={svgPaths.p2467cf80} fill="#335CFF" />
                  <path d={svgPaths.p32e7000} fill="#335CFF" />
                  <path d={svgPaths.p3c628e71} fill="#335CFF" />
                  <path d={svgPaths.p375d8180} fill="#335CFF" />
                  <path d={svgPaths.p216c9b00} fill="#335CFF" />
                  <path d={svgPaths.p37b01c00} fill="#335CFF" />
                  <g></g>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}