import svgPaths from "./svg-ps9jzqlnr1";
import imgPortfolioDashboardPage from "figma:asset/2ceb5f3890ecf49940adbd1e2cca8cf7647ce99f.png";

function PortfolioDashboardPage1() {
  return (
    <div className="absolute h-[96px] left-0 top-0 w-[1478px]" data-name="PortfolioDashboardPage">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPortfolioDashboardPage} />
    </div>
  );
}

function PortfolioDashboardPage2() {
  return <div className="absolute bg-gradient-to-r from-[rgba(0,37,84,0.8)] h-[96px] left-0 to-[rgba(82,132,180,0.8)] top-0 w-[1478px]" data-name="PortfolioDashboardPage" />;
}

function Icon() {
  return (
    <div className="absolute left-[10px] size-[16px] top-[8px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p203476e0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M12.6667 8H3.33333" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="h-[32px] relative rounded-[6px] shrink-0 w-[73.969px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon />
        <p className="-translate-x-1/2 absolute font-['Dubai:Medium',sans-serif] leading-[20px] left-[50px] not-italic text-[14px] text-center text-white top-[6px] whitespace-nowrap">Back</p>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p22caafc0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p33d8b700} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-[rgba(255,255,255,0.2)] relative rounded-[8px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[12px] relative size-full">
        <Icon1 />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 1">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[28px] left-0 not-italic text-[20px] text-white top-0 whitespace-nowrap">Portfolio Dashboard</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Dubai:Regular',sans-serif] leading-[20px] left-0 not-italic text-[14px] text-[rgba(255,255,255,0.9)] top-0 whitespace-nowrap">{`Executive Overview - All Programs & Projects`}</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[52px] relative shrink-0 w-[257.516px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Heading />
        <Paragraph />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[52px] items-center left-0 pl-[-8px] top-0 w-[1135.453px]" data-name="Container">
      <Button />
      <Container2 />
      <Container3 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-[17px] size-[16px] top-[12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p3159e300} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M5.33333 6.66667V9.33333" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 6.66667V8" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 6.66667V10.6667" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="h-[40px] relative rounded-[6px] shrink-0 w-[138.141px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[6px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon2 />
        <p className="-translate-x-1/2 absolute font-['Dubai:Medium',sans-serif] leading-[20px] left-[85.5px] not-italic text-[14px] text-center text-white top-[10px] whitespace-nowrap">Projects List</p>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute left-[17px] size-[16px] top-[12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_12010_1549)" id="Icon">
          <path d={svgPaths.p3227a460} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_12010_1549">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="flex-[1_0_0] h-[40px] min-h-px min-w-px relative rounded-[6px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[6px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon3 />
        <p className="-translate-x-1/2 absolute font-['Dubai:Medium',sans-serif] leading-[20px] left-[90.5px] not-italic text-[14px] text-center text-white top-[10px] whitespace-nowrap">Create Project</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[40px] items-center left-[1135.45px] top-[10px] w-[294.547px]" data-name="Container">
      <Button1 />
      <Button2 />
    </div>
  );
}

function PortfolioDashboardPage3() {
  return (
    <div className="absolute h-[60px] left-[24px] top-[12px] w-[1430px]" data-name="PortfolioDashboardPage">
      <Container1 />
      <Container4 />
    </div>
  );
}

function Card() {
  return (
    <div className="bg-white h-[96px] overflow-clip relative rounded-[12px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="Card">
      <PortfolioDashboardPage1 />
      <PortfolioDashboardPage2 />
      <PortfolioDashboardPage3 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[28px] left-0 not-italic text-[#1f2937] text-[18px] top-0 whitespace-nowrap">Executive KPIs</p>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p42e1400} id="Vector" stroke="var(--stroke-0, #008755)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M6.66667 8.33333V11.6667" id="Vector_2" stroke="var(--stroke-0, #008755)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 8.33333V10" id="Vector_3" stroke="var(--stroke-0, #008755)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M13.3333 8.33333V13.3333" id="Vector_4" stroke="var(--stroke-0, #008755)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container7() {
  return (
    <div className="bg-[rgba(82,132,180,0.1)] relative rounded-[8px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[10px] relative size-full">
        <Icon4 />
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p3a7e7417} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 3.5H11V6.5" id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="flex-[1_0_0] h-[16px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Dubai:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#00a63e] text-[12px] top-[-1px] whitespace-nowrap">+8%</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[16px] relative shrink-0 w-[40.484px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Icon5 />
        <Text />
      </div>
    </div>
  );
}

function PortfolioDashboardPage4() {
  return (
    <div className="absolute content-stretch flex h-[40px] items-start justify-between left-[24px] top-[16px] w-[236px]" data-name="PortfolioDashboardPage">
      <Container7 />
      <Container8 />
    </div>
  );
}

function PortfolioDashboardPage5() {
  return (
    <div className="absolute h-[32px] left-[24px] top-[68px] w-[236px]" data-name="PortfolioDashboardPage">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[32px] left-0 not-italic text-[#1f2937] text-[24px] top-0 whitespace-nowrap">57</p>
    </div>
  );
}

function PortfolioDashboardPage6() {
  return (
    <div className="absolute h-[16px] left-[24px] top-[104px] w-[236px]" data-name="PortfolioDashboardPage">
      <p className="absolute font-['Dubai:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#64748b] text-[12px] top-[-1px] whitespace-nowrap">Total Projects</p>
    </div>
  );
}

function CardContent() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[284px]" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <PortfolioDashboardPage4 />
        <PortfolioDashboardPage5 />
        <PortfolioDashboardPage6 />
      </div>
    </div>
  );
}

function Card1() {
  return (
    <div className="bg-white col-1 content-stretch flex flex-col items-start justify-self-stretch p-px relative rounded-[12px] row-1 self-stretch shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <CardContent />
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_12010_1573)" id="Icon">
          <path d={svgPaths.p363df2c0} id="Vector" stroke="var(--stroke-0, #008755)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_12010_1573">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container9() {
  return (
    <div className="bg-[rgba(82,132,180,0.1)] relative rounded-[8px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[10px] relative size-full">
        <Icon6 />
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p3a7e7417} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 3.5H11V6.5" id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="flex-[1_0_0] h-[16px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Dubai:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#00a63e] text-[12px] top-[-1px] whitespace-nowrap">+12%</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[16px] relative shrink-0 w-[46.969px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Icon7 />
        <Text1 />
      </div>
    </div>
  );
}

function PortfolioDashboardPage7() {
  return (
    <div className="absolute content-stretch flex h-[40px] items-start justify-between left-[24px] top-[16px] w-[236px]" data-name="PortfolioDashboardPage">
      <Container9 />
      <Container10 />
    </div>
  );
}

function PortfolioDashboardPage8() {
  return (
    <div className="absolute h-[32px] left-[24px] top-[68px] w-[236px]" data-name="PortfolioDashboardPage">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[32px] left-0 not-italic text-[#1f2937] text-[24px] top-0 whitespace-nowrap">45</p>
    </div>
  );
}

function PortfolioDashboardPage9() {
  return (
    <div className="absolute h-[16px] left-[24px] top-[104px] w-[236px]" data-name="PortfolioDashboardPage">
      <p className="absolute font-['Dubai:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#64748b] text-[12px] top-[-1px] whitespace-nowrap">Active Projects</p>
    </div>
  );
}

function CardContent1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[284px]" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <PortfolioDashboardPage7 />
        <PortfolioDashboardPage8 />
        <PortfolioDashboardPage9 />
      </div>
    </div>
  );
}

function Card2() {
  return (
    <div className="bg-white col-2 content-stretch flex flex-col items-start justify-self-stretch p-px relative rounded-[12px] row-1 self-stretch shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <CardContent1 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p377dab00} id="Vector" stroke="var(--stroke-0, #008755)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 7.5V10.8333" id="Vector_2" stroke="var(--stroke-0, #008755)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 14.1667H10.0083" id="Vector_3" stroke="var(--stroke-0, #008755)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container11() {
  return (
    <div className="bg-[rgba(82,132,180,0.1)] relative rounded-[8px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[10px] relative size-full">
        <Icon8 />
      </div>
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p3a7e7417} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 3.5H11V6.5" id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div className="flex-[1_0_0] h-[16px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Dubai:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#00a63e] text-[12px] top-[-1px] whitespace-nowrap">-3%</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[16px] relative shrink-0 w-[38.563px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Icon9 />
        <Text2 />
      </div>
    </div>
  );
}

function PortfolioDashboardPage10() {
  return (
    <div className="absolute content-stretch flex h-[40px] items-start justify-between left-[24px] top-[16px] w-[236px]" data-name="PortfolioDashboardPage">
      <Container11 />
      <Container12 />
    </div>
  );
}

function PortfolioDashboardPage11() {
  return (
    <div className="absolute h-[32px] left-[24px] top-[68px] w-[236px]" data-name="PortfolioDashboardPage">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[32px] left-0 not-italic text-[#1f2937] text-[24px] top-0 whitespace-nowrap">8</p>
    </div>
  );
}

function PortfolioDashboardPage12() {
  return (
    <div className="absolute h-[16px] left-[24px] top-[104px] w-[236px]" data-name="PortfolioDashboardPage">
      <p className="absolute font-['Dubai:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#64748b] text-[12px] top-[-1px] whitespace-nowrap">Support Needed</p>
    </div>
  );
}

function CardContent2() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[284px]" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <PortfolioDashboardPage10 />
        <PortfolioDashboardPage11 />
        <PortfolioDashboardPage12 />
      </div>
    </div>
  );
}

function Card3() {
  return (
    <div className="bg-white col-3 content-stretch flex flex-col items-start justify-self-stretch p-px relative rounded-[12px] row-1 self-stretch shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <CardContent2 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M10 1.66667V18.3333" id="Vector" stroke="var(--stroke-0, #008755)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3055a600} id="Vector_2" stroke="var(--stroke-0, #008755)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container13() {
  return (
    <div className="bg-[rgba(82,132,180,0.1)] relative rounded-[8px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[10px] relative size-full">
        <Icon10 />
      </div>
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p3a7e7417} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 3.5H11V6.5" id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text3() {
  return (
    <div className="flex-[1_0_0] h-[16px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Dubai:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#00a63e] text-[12px] top-[-1px] whitespace-nowrap">+5%</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[16px] relative shrink-0 w-[40.484px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Icon11 />
        <Text3 />
      </div>
    </div>
  );
}

function PortfolioDashboardPage13() {
  return (
    <div className="absolute content-stretch flex h-[40px] items-start justify-between left-[24px] top-[16px] w-[236px]" data-name="PortfolioDashboardPage">
      <Container13 />
      <Container14 />
    </div>
  );
}

function PortfolioDashboardPage14() {
  return (
    <div className="absolute h-[32px] left-[24px] top-[68px] w-[236px]" data-name="PortfolioDashboardPage">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[32px] left-0 not-italic text-[#1f2937] text-[24px] top-0 whitespace-nowrap">87%</p>
    </div>
  );
}

function PortfolioDashboardPage15() {
  return (
    <div className="absolute h-[16px] left-[24px] top-[104px] w-[236px]" data-name="PortfolioDashboardPage">
      <p className="absolute font-['Dubai:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#64748b] text-[12px] top-[-1px] whitespace-nowrap">Budget Utilization</p>
    </div>
  );
}

function CardContent3() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[284px]" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <PortfolioDashboardPage13 />
        <PortfolioDashboardPage14 />
        <PortfolioDashboardPage15 />
      </div>
    </div>
  );
}

function Card4() {
  return (
    <div className="bg-white col-4 content-stretch flex flex-col items-start justify-self-stretch p-px relative rounded-[12px] row-1 self-stretch shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <CardContent3 />
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_12010_1604)" id="Icon">
          <path d={svgPaths.p14d24500} id="Vector" stroke="var(--stroke-0, #008755)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p240d7000} id="Vector_2" stroke="var(--stroke-0, #008755)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p25499600} id="Vector_3" stroke="var(--stroke-0, #008755)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_12010_1604">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container15() {
  return (
    <div className="bg-[rgba(82,132,180,0.1)] relative rounded-[8px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[10px] relative size-full">
        <Icon12 />
      </div>
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p3a7e7417} id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 3.5H11V6.5" id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text4() {
  return (
    <div className="flex-[1_0_0] h-[16px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Dubai:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#00a63e] text-[12px] top-[-1px] whitespace-nowrap">+6%</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[16px] relative shrink-0 w-[40.484px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Icon13 />
        <Text4 />
      </div>
    </div>
  );
}

function PortfolioDashboardPage16() {
  return (
    <div className="absolute content-stretch flex h-[40px] items-start justify-between left-[24px] top-[16px] w-[236px]" data-name="PortfolioDashboardPage">
      <Container15 />
      <Container16 />
    </div>
  );
}

function PortfolioDashboardPage17() {
  return (
    <div className="absolute h-[32px] left-[24px] top-[68px] w-[236px]" data-name="PortfolioDashboardPage">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[32px] left-0 not-italic text-[#1f2937] text-[24px] top-0 whitespace-nowrap">91%</p>
    </div>
  );
}

function PortfolioDashboardPage18() {
  return (
    <div className="absolute h-[16px] left-[24px] top-[104px] w-[236px]" data-name="PortfolioDashboardPage">
      <p className="absolute font-['Dubai:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#64748b] text-[12px] top-[-1px] whitespace-nowrap">Strategic Alignment</p>
    </div>
  );
}

function CardContent4() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[284px]" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <PortfolioDashboardPage16 />
        <PortfolioDashboardPage17 />
        <PortfolioDashboardPage18 />
      </div>
    </div>
  );
}

function Card5() {
  return (
    <div className="bg-white col-5 content-stretch flex flex-col items-start justify-self-stretch p-px relative rounded-[12px] row-1 self-stretch shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <CardContent4 />
    </div>
  );
}

function Container6() {
  return (
    <div className="gap-x-[12px] gap-y-[12px] grid grid-cols-[repeat(5,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] h-[146px] relative shrink-0 w-full" data-name="Container">
      <Card1 />
      <Card2 />
      <Card3 />
      <Card4 />
      <Card5 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] h-[180px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <Container6 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[28px] left-0 not-italic text-[#1f2937] text-[18px] top-0 whitespace-nowrap">Portfolio Health Overview</p>
    </div>
  );
}

function CardTitle() {
  return (
    <div className="absolute h-[24px] left-[24px] top-[24px] w-[434.656px]" data-name="CardTitle">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[24px] left-0 not-italic text-[#1a1a1a] text-[16px] top-[-1px] whitespace-nowrap">Project Status Distribution</p>
    </div>
  );
}

function CardDescription() {
  return (
    <div className="absolute h-[24px] left-[24px] top-[54px] w-[434.656px]" data-name="CardDescription">
      <p className="absolute font-['Dubai:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#64748b] text-[16px] top-[-1px] whitespace-nowrap">Current project health status</p>
    </div>
  );
}

function CardHeader() {
  return (
    <div className="h-[78px] relative shrink-0 w-[482.656px]" data-name="CardHeader">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <CardTitle />
        <CardDescription />
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute inset-[10%_31.61%]" data-name="Group">
      <div className="absolute inset-[-0.31%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 161 161">
          <g id="Group">
            <path d={svgPaths.p1e81f200} fill="var(--fill-0, #357743)" id="Vector" stroke="var(--stroke-0, white)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute inset-[62.06%_33.89%_10.8%_52.29%]" data-name="Group">
      <div className="absolute inset-[-1.25%_-1.13%_-1.09%_-0.98%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 61.399 55.5501">
          <g id="Group">
            <path d={svgPaths.p7134300} fill="var(--fill-0, #F2A200)" id="Vector" stroke="var(--stroke-0, white)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute inset-[50.87%_31.62%_31.94%_60.26%]" data-name="Group">
      <div className="absolute inset-[-1.5%_-1.46%_-1.95%_-1.9%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36.5276 35.5667">
          <g id="Group">
            <path d={svgPaths.p8538600} fill="var(--fill-0, #D83731)" id="Vector" stroke="var(--stroke-0, white)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents inset-[10%_31.61%]" data-name="Group">
      <Group2 />
      <Group3 />
      <Group4 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-[10%_31.61%]" data-name="Group">
      <Group1 />
    </div>
  );
}

function Surface() {
  return (
    <div className="absolute h-[200px] left-[-61px] overflow-clip top-0 w-[435px]" data-name="Surface">
      <Group />
    </div>
  );
}

function PieChart() {
  return (
    <div className="h-[200px] relative shrink-0 w-full" data-name="PieChart">
      <Surface />
    </div>
  );
}

function Container21() {
  return <div className="bg-[#357743] rounded-[4px] shrink-0 size-[12px]" data-name="Container" />;
}

function Text5() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Dubai:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#64748b] text-[14px] top-0 whitespace-nowrap">On Track</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[20px] relative shrink-0 w-[70.922px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Container21 />
        <Text5 />
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[20px] relative shrink-0 w-[15.125px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Dubai:Medium',sans-serif] leading-[20px] left-0 not-italic text-[#1a1a1a] text-[14px] top-0 whitespace-nowrap">45</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container20 />
      <Text6 />
    </div>
  );
}

function Container24() {
  return <div className="bg-[#f2a200] rounded-[4px] shrink-0 size-[12px]" data-name="Container" />;
}

function Text7() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Dubai:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#64748b] text-[14px] top-0 whitespace-nowrap">At Risk</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="h-[20px] relative shrink-0 w-[60.594px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Container24 />
        <Text7 />
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[20px] relative shrink-0 w-[7.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Dubai:Medium',sans-serif] leading-[20px] left-0 not-italic text-[#1a1a1a] text-[14px] top-0 whitespace-nowrap">8</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container23 />
      <Text8 />
    </div>
  );
}

function Container27() {
  return <div className="bg-[#d83731] rounded-[4px] shrink-0 size-[12px]" data-name="Container" />;
}

function Text9() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Dubai:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#64748b] text-[14px] top-0 whitespace-nowrap">Delayed</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="h-[20px] relative shrink-0 w-[65.078px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Container27 />
        <Text9 />
      </div>
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[20px] relative shrink-0 w-[7.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Dubai:Medium',sans-serif] leading-[20px] left-0 not-italic text-[#1a1a1a] text-[14px] top-0 whitespace-nowrap">4</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container26 />
      <Text10 />
    </div>
  );
}

function PortfolioDashboardPage19() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[76px] items-start relative shrink-0 w-full" data-name="PortfolioDashboardPage">
      <Container19 />
      <Container22 />
      <Container25 />
    </div>
  );
}

function CardContent5() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[359px]" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start pl-[24px] pr-[23.656px] relative size-full">
        <PieChart />
        <PortfolioDashboardPage19 />
      </div>
    </div>
  );
}

function Card6() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] flex-col gap-[24px] h-[460px] items-start min-h-px min-w-px p-px relative rounded-[12px]" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <CardHeader />
      <CardContent5 />
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute contents inset-[16.67%_11.54%]" data-name="Group">
      <div className="absolute inset-[16.67%_11.54%]" data-name="Vector">
        <div className="absolute inset-[-0.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 101 101">
            <path d={svgPaths.p23c87c00} fill="var(--fill-0, #008755)" id="Vector" stroke="var(--stroke-0, white)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute bottom-[71.51%] contents left-[35.08%] right-1/2 top-[16.67%]" data-name="Group">
      <div className="absolute bottom-[71.51%] left-[35.08%] right-1/2 top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-2.82%_-2.58%_-3.69%_-3.38%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.5541 18.8965">
            <path d={svgPaths.p2b46b700} fill="var(--fill-0, #E5E7EB)" id="Vector" stroke="var(--stroke-0, white)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute contents inset-[16.67%_11.54%]" data-name="Group">
      <Group7 />
      <Group8 />
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents inset-[16.67%_11.54%]" data-name="Group">
      <Group6 />
    </div>
  );
}

function Surface1() {
  return (
    <div className="h-[150px] overflow-clip relative shrink-0 w-full" data-name="Surface">
      <Group5 />
    </div>
  );
}

function PieChart1() {
  return (
    <div className="absolute content-stretch flex flex-col h-[150px] items-start left-[96px] top-0 w-[130px]" data-name="PieChart">
      <Surface1 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Dubai:Medium',sans-serif] leading-[18px] left-[18.5px] not-italic text-[#1f2937] text-[18px] text-center top-0 whitespace-nowrap">94%</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Dubai:Regular',sans-serif] leading-[15px] left-[19.27px] not-italic text-[#64748b] text-[10px] text-center top-0 whitespace-nowrap">Utilized</p>
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute content-stretch flex flex-col h-[33px] items-start left-[142.72px] top-[58.5px] w-[36.563px]" data-name="Container">
      <Paragraph1 />
      <Paragraph2 />
    </div>
  );
}

function PortfolioDashboardPage20() {
  return (
    <div className="h-[150px] relative shrink-0 w-full" data-name="PortfolioDashboardPage">
      <PieChart1 />
      <Container28 />
    </div>
  );
}

function Container29() {
  return <div className="bg-[#008755] h-[8px] shrink-0 w-full" data-name="Container" />;
}

function PrimitiveDiv() {
  return (
    <div className="bg-[rgba(82,132,180,0.2)] content-stretch flex flex-col h-[8px] items-start overflow-clip pl-[-26.08px] pr-[26.08px] relative rounded-[33554400px] shrink-0 w-full" data-name="Primitive.div">
      <Container29 />
    </div>
  );
}

function Text11() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[75.422px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Dubai:Regular',sans-serif] leading-[16.5px] left-0 not-italic text-[#64748b] text-[11px] top-px whitespace-nowrap">AED 38.4M used</p>
      </div>
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[75.391px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Dubai:Regular',sans-serif] leading-[16.5px] left-0 not-italic text-[#64748b] text-[11px] top-px whitespace-nowrap">AED 41.0M total</p>
      </div>
    </div>
  );
}

function PortfolioDashboardPage21() {
  return (
    <div className="content-stretch flex h-[16.5px] items-start justify-between relative shrink-0 w-full" data-name="PortfolioDashboardPage">
      <Text11 />
      <Text12 />
    </div>
  );
}

function CardContent6() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[199px] items-start left-[24.5px] top-[103px] w-[323px]" data-name="CardContent">
      <PortfolioDashboardPage20 />
      <PrimitiveDiv />
      <PortfolioDashboardPage21 />
    </div>
  );
}

function CardTitle1() {
  return (
    <div className="absolute h-[24px] left-[24px] top-[24px] w-[434.672px]" data-name="CardTitle">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[24px] left-0 not-italic text-[#1a1a1a] text-[16px] top-[-1px] whitespace-nowrap">Budget Performance</p>
    </div>
  );
}

function CardDescription1() {
  return (
    <div className="absolute h-[24px] left-[24px] top-[54px] w-[434.672px]" data-name="CardDescription">
      <p className="absolute font-['Dubai:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#64748b] text-[16px] top-[-1px] whitespace-nowrap">Planned vs Actual spending</p>
    </div>
  );
}

function CardHeader1() {
  return (
    <div className="absolute h-[78px] left-px top-px w-[482.672px]" data-name="CardHeader">
      <CardTitle1 />
      <CardDescription1 />
    </div>
  );
}

function Card7() {
  return (
    <div className="bg-white flex-[1_0_0] h-[460px] min-h-px min-w-px relative rounded-[12px]" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <CardContent6 />
      <CardHeader1 />
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_12010_1613)" id="Icon">
          <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, #008755)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p11f26280} id="Vector_2" stroke="var(--stroke-0, #008755)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 11.3333H8.00667" id="Vector_3" stroke="var(--stroke-0, #008755)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_12010_1613">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text13() {
  return (
    <div className="flex-[1_0_0] h-[16px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Dubai:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#1f2937] text-[12px] top-[-1px] whitespace-nowrap">SR-2024-087</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="h-[16px] relative shrink-0 w-[92px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Icon14 />
        <Text13 />
      </div>
    </div>
  );
}

function Badge() {
  return (
    <div className="bg-[rgba(242,162,0,0.13)] h-[16px] relative rounded-[6px] shrink-0 w-[31.875px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[7px] py-[3px] relative rounded-[inherit] size-full">
        <p className="font-['Dubai:Medium',sans-serif] leading-[13.5px] not-italic relative shrink-0 text-[#f2a200] text-[9px] whitespace-nowrap">High</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start justify-between left-[11px] top-[11px] w-[279px]" data-name="Container">
      <Container32 />
      <Badge />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="absolute h-[16px] left-[11px] top-[35px] w-[279px]" data-name="Paragraph">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#1f2937] text-[12px] top-[-1px] whitespace-nowrap">Smart Trade 2030</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="absolute h-[15px] left-[11px] top-[55px] w-[279px]" data-name="Paragraph">
      <p className="absolute font-['Dubai:Regular',sans-serif] leading-[15px] left-0 not-italic text-[#64748b] text-[10px] top-0 whitespace-nowrap">Budget Adjustment</p>
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_12010_1591)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 3V6L8 7" id="Vector_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_12010_1591">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[15px] relative shrink-0 w-[64.641px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Dubai:Regular',sans-serif] leading-[15px] left-0 not-italic text-[#64748b] text-[10px] top-0 whitespace-nowrap">Open for 5 days</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[15px] items-center left-[11px] top-[76px] w-[279px]" data-name="Container">
      <Icon15 />
      <Text14 />
    </div>
  );
}

function Container30() {
  return (
    <div className="bg-[#f8f9fb] h-[102px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Container31 />
      <Paragraph3 />
      <Paragraph4 />
      <Container33 />
    </div>
  );
}

function Icon16() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_12010_1613)" id="Icon">
          <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, #008755)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p11f26280} id="Vector_2" stroke="var(--stroke-0, #008755)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 11.3333H8.00667" id="Vector_3" stroke="var(--stroke-0, #008755)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_12010_1613">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text15() {
  return (
    <div className="flex-[1_0_0] h-[16px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Dubai:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#1f2937] text-[12px] top-[-1px] whitespace-nowrap">SR-2024-091</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="h-[16px] relative shrink-0 w-[92px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Icon16 />
        <Text15 />
      </div>
    </div>
  );
}

function Badge1() {
  return (
    <div className="bg-[rgba(216,55,49,0.13)] h-[16px] relative rounded-[6px] shrink-0 w-[40.453px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[7px] py-[3px] relative rounded-[inherit] size-full">
        <p className="font-['Dubai:Medium',sans-serif] leading-[13.5px] not-italic relative shrink-0 text-[#d83731] text-[9px] whitespace-nowrap">Critical</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Container35() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start justify-between left-[11px] top-[11px] w-[276px]" data-name="Container">
      <Container36 />
      <Badge1 />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="absolute h-[16px] left-[11px] top-[35px] w-[397.656px]" data-name="Paragraph">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#1f2937] text-[12px] top-[-1px] whitespace-nowrap">Digital Customs Platform</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="absolute h-[15px] left-[11px] top-[55px] w-[397.656px]" data-name="Paragraph">
      <p className="absolute font-['Dubai:Regular',sans-serif] leading-[15px] left-0 not-italic text-[#64748b] text-[10px] top-0 whitespace-nowrap">Resource Allocation</p>
    </div>
  );
}

function Icon17() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_12010_1591)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 3V6L8 7" id="Vector_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_12010_1591">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text16() {
  return (
    <div className="h-[15px] relative shrink-0 w-[64.641px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Dubai:Regular',sans-serif] leading-[15px] left-0 not-italic text-[#64748b] text-[10px] top-0 whitespace-nowrap">Open for 8 days</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[15px] items-center left-[11px] top-[76px] w-[397.656px]" data-name="Container">
      <Icon17 />
      <Text16 />
    </div>
  );
}

function Container34() {
  return (
    <div className="bg-[#f8f9fb] h-[102px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Container35 />
      <Paragraph5 />
      <Paragraph6 />
      <Container37 />
    </div>
  );
}

function Icon18() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_12010_1613)" id="Icon">
          <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, #008755)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p11f26280} id="Vector_2" stroke="var(--stroke-0, #008755)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 11.3333H8.00667" id="Vector_3" stroke="var(--stroke-0, #008755)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_12010_1613">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text17() {
  return (
    <div className="flex-[1_0_0] h-[16px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Dubai:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#1f2937] text-[12px] top-[-1px] whitespace-nowrap">SR-2024-103</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="h-[16px] relative shrink-0 w-[92px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Icon18 />
        <Text17 />
      </div>
    </div>
  );
}

function Badge2() {
  return (
    <div className="bg-[rgba(82,132,180,0.13)] h-[16px] relative rounded-[6px] shrink-0 w-[44.406px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[7px] py-[3px] relative rounded-[inherit] size-full">
        <p className="font-['Dubai:Medium',sans-serif] leading-[13.5px] not-italic relative shrink-0 text-[#008755] text-[9px] whitespace-nowrap">Medium</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Container39() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start justify-between left-[11px] top-[11px] w-[276px]" data-name="Container">
      <Container40 />
      <Badge2 />
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="absolute h-[16px] left-[11px] top-[35px] w-[397.656px]" data-name="Paragraph">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#1f2937] text-[12px] top-[-1px] whitespace-nowrap">AI Risk Assessment</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="absolute h-[15px] left-[11px] top-[55px] w-[397.656px]" data-name="Paragraph">
      <p className="absolute font-['Dubai:Regular',sans-serif] leading-[15px] left-0 not-italic text-[#64748b] text-[10px] top-0 whitespace-nowrap">Scope Change</p>
    </div>
  );
}

function Icon19() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_12010_1591)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 3V6L8 7" id="Vector_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_12010_1591">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text18() {
  return (
    <div className="h-[15px] relative shrink-0 w-[64.641px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Dubai:Regular',sans-serif] leading-[15px] left-0 not-italic text-[#64748b] text-[10px] top-0 whitespace-nowrap">Open for 3 days</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[15px] items-center left-[11px] top-[76px] w-[397.656px]" data-name="Container">
      <Icon19 />
      <Text18 />
    </div>
  );
}

function Container38() {
  return (
    <div className="bg-[#f8f9fb] h-[102px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Container39 />
      <Paragraph7 />
      <Paragraph8 />
      <Container41 />
    </div>
  );
}

function Icon20() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_12010_1613)" id="Icon">
          <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, #008755)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p11f26280} id="Vector_2" stroke="var(--stroke-0, #008755)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 11.3333H8.00667" id="Vector_3" stroke="var(--stroke-0, #008755)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_12010_1613">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text19() {
  return (
    <div className="flex-[1_0_0] h-[16px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Dubai:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#1f2937] text-[12px] top-[-1px] whitespace-nowrap">SR-2024-115</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="h-[16px] relative shrink-0 w-[92px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Icon20 />
        <Text19 />
      </div>
    </div>
  );
}

function Badge3() {
  return (
    <div className="bg-[rgba(242,162,0,0.13)] h-[16px] relative rounded-[6px] shrink-0 w-[31.875px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[7px] py-[3px] relative rounded-[inherit] size-full">
        <p className="font-['Dubai:Medium',sans-serif] leading-[13.5px] not-italic relative shrink-0 text-[#f2a200] text-[9px] whitespace-nowrap">High</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Container43() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start justify-between left-[11px] top-[11px] w-[397.656px]" data-name="Container">
      <Container44 />
      <Badge3 />
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="absolute h-[16px] left-[11px] top-[35px] w-[397.656px]" data-name="Paragraph">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#1f2937] text-[12px] top-[-1px] whitespace-nowrap">Blockchain Integration</p>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="absolute h-[15px] left-[11px] top-[55px] w-[397.656px]" data-name="Paragraph">
      <p className="absolute font-['Dubai:Regular',sans-serif] leading-[15px] left-0 not-italic text-[#64748b] text-[10px] top-0 whitespace-nowrap">Timeline Extension</p>
    </div>
  );
}

function Icon21() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_12010_1591)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 3V6L8 7" id="Vector_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_12010_1591">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text20() {
  return (
    <div className="h-[15px] relative shrink-0 w-[64.641px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Dubai:Regular',sans-serif] leading-[15px] left-0 not-italic text-[#64748b] text-[10px] top-0 whitespace-nowrap">Open for 6 days</p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[15px] items-center left-[11px] top-[76px] w-[397.656px]" data-name="Container">
      <Icon21 />
      <Text20 />
    </div>
  );
}

function Container42() {
  return (
    <div className="bg-[#f8f9fb] h-[102px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Container43 />
      <Paragraph9 />
      <Paragraph10 />
      <Container45 />
    </div>
  );
}

function Icon22() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_12010_1613)" id="Icon">
          <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, #008755)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p11f26280} id="Vector_2" stroke="var(--stroke-0, #008755)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 11.3333H8.00667" id="Vector_3" stroke="var(--stroke-0, #008755)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_12010_1613">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text21() {
  return (
    <div className="flex-[1_0_0] h-[16px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Dubai:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#1f2937] text-[12px] top-[-1px] whitespace-nowrap">SR-2024-120</p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="h-[16px] relative shrink-0 w-[92px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Icon22 />
        <Text21 />
      </div>
    </div>
  );
}

function Badge4() {
  return (
    <div className="bg-[rgba(82,132,180,0.13)] h-[16px] relative rounded-[6px] shrink-0 w-[44.406px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[7px] py-[3px] relative rounded-[inherit] size-full">
        <p className="font-['Dubai:Medium',sans-serif] leading-[13.5px] not-italic relative shrink-0 text-[#008755] text-[9px] whitespace-nowrap">Medium</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Container47() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start justify-between left-[11px] top-[11px] w-[397.656px]" data-name="Container">
      <Container48 />
      <Badge4 />
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="absolute h-[16px] left-[11px] top-[35px] w-[397.656px]" data-name="Paragraph">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#1f2937] text-[12px] top-[-1px] whitespace-nowrap">Mobile App Redesign</p>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="absolute h-[15px] left-[11px] top-[55px] w-[397.656px]" data-name="Paragraph">
      <p className="absolute font-['Dubai:Regular',sans-serif] leading-[15px] left-0 not-italic text-[#64748b] text-[10px] top-0 whitespace-nowrap">Technical Support</p>
    </div>
  );
}

function Icon23() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_12010_1591)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 3V6L8 7" id="Vector_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_12010_1591">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text22() {
  return (
    <div className="h-[15px] relative shrink-0 w-[64.641px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Dubai:Regular',sans-serif] leading-[15px] left-0 not-italic text-[#64748b] text-[10px] top-0 whitespace-nowrap">Open for 2 days</p>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[15px] items-center left-[11px] top-[76px] w-[397.656px]" data-name="Container">
      <Icon23 />
      <Text22 />
    </div>
  );
}

function Container46() {
  return (
    <div className="bg-[#f8f9fb] h-[102px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Container47 />
      <Paragraph11 />
      <Paragraph12 />
      <Container49 />
    </div>
  );
}

function PortfolioDashboardPage22() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[340px] items-start left-[25px] overflow-clip pr-[15px] top-[103px] w-[318px]" data-name="PortfolioDashboardPage">
      <Container30 />
      <Container34 />
      <Container38 />
      <Container42 />
      <Container46 />
    </div>
  );
}

function CardTitle2() {
  return (
    <div className="absolute h-[24px] left-[24px] top-[24px] w-[434.656px]" data-name="CardTitle">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[24px] left-0 not-italic text-[#1a1a1a] text-[16px] top-[-1px] whitespace-nowrap">EPMO Support Requests</p>
    </div>
  );
}

function CardDescription2() {
  return (
    <div className="absolute h-[24px] left-[24px] top-[54px] w-[434.656px]" data-name="CardDescription">
      <p className="absolute font-['Dubai:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#64748b] text-[16px] top-[-1px] whitespace-nowrap">Open support requests across all projects</p>
    </div>
  );
}

function CardHeader2() {
  return (
    <div className="absolute h-[78px] left-px top-px w-[482.656px]" data-name="CardHeader">
      <CardTitle2 />
      <CardDescription2 />
    </div>
  );
}

function Card8() {
  return (
    <div className="bg-white flex-[1_0_0] h-[460px] min-h-px min-w-px relative rounded-[12px]" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <PortfolioDashboardPage22 />
      <CardHeader2 />
    </div>
  );
}

function Icon24() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_12010_1576)" id="Icon">
          <path d={svgPaths.p14d24500} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p240d7000} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p25499600} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_12010_1576">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container52() {
  return (
    <div className="bg-[#008755] relative rounded-[8px] shrink-0 size-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[10px] relative size-full">
        <Icon24 />
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[20px] left-0 not-italic text-[#1f2937] text-[14px] top-0 whitespace-nowrap">Innovation Excellence</p>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Dubai:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#64748b] text-[12px] top-[-1px] whitespace-nowrap">4 Objectives • 18 Projects</p>
    </div>
  );
}

function Container53() {
  return (
    <div className="flex-[1_0_0] h-[36px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Heading3 />
        <Paragraph13 />
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="h-[40px] relative shrink-0 w-[177.313px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container52 />
        <Container53 />
      </div>
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="h-[28px] relative shrink-0 w-[40.609px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-full absolute font-['Dubai:Medium',sans-serif] leading-[28px] left-[41px] not-italic text-[#1f2937] text-[16px] text-right top-0 whitespace-nowrap">75%</p>
      </div>
    </div>
  );
}

function PortfolioDashboardPage23() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full" data-name="PortfolioDashboardPage">
      <Container51 />
      <Paragraph14 />
    </div>
  );
}

function Container54() {
  return <div className="bg-[#008755] h-[8px] shrink-0 w-full" data-name="Container" />;
}

function PrimitiveDiv1() {
  return (
    <div className="bg-[rgba(82,132,180,0.2)] content-stretch flex flex-col h-[8px] items-start overflow-clip pl-[-170.75px] pr-[170.75px] relative rounded-[33554400px] shrink-0 w-full" data-name="Primitive.div">
      <Container54 />
    </div>
  );
}

function CardContent7() {
  return (
    <div className="relative shrink-0 w-full" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-start p-[10px] relative w-full">
        <PortfolioDashboardPage23 />
        <PrimitiveDiv1 />
      </div>
    </div>
  );
}

function Card10() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start p-px relative rounded-[12px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <CardContent7 />
    </div>
  );
}

function Icon25() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_12010_1576)" id="Icon">
          <path d={svgPaths.p14d24500} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p240d7000} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p25499600} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_12010_1576">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container56() {
  return (
    <div className="bg-[#bb9956] relative rounded-[8px] shrink-0 size-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[10px] relative size-full">
        <Icon25 />
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[20px] left-0 not-italic text-[#1f2937] text-[14px] top-0 whitespace-nowrap">Operational Excellence</p>
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Dubai:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#64748b] text-[12px] top-[-1px] whitespace-nowrap">6 Objectives • 22 Projects</p>
    </div>
  );
}

function Container57() {
  return (
    <div className="flex-[1_0_0] h-[36px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Heading4 />
        <Paragraph15 />
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="h-[40px] relative shrink-0 w-[184.109px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container56 />
        <Container57 />
      </div>
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="h-[28px] relative shrink-0 w-[40.609px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-full absolute font-['Dubai:Medium',sans-serif] leading-[28px] left-[41px] not-italic text-[#1f2937] text-[16px] text-right top-0 whitespace-nowrap">82%</p>
      </div>
    </div>
  );
}

function PortfolioDashboardPage24() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full" data-name="PortfolioDashboardPage">
      <Container55 />
      <Paragraph16 />
    </div>
  );
}

function Container58() {
  return <div className="bg-[#008755] h-[8px] shrink-0 w-full" data-name="Container" />;
}

function PrimitiveDiv2() {
  return (
    <div className="bg-[rgba(82,132,180,0.2)] content-stretch flex flex-col h-[8px] items-start overflow-clip pl-[-122.94px] pr-[122.94px] relative rounded-[33554400px] shrink-0 w-full" data-name="Primitive.div">
      <Container58 />
    </div>
  );
}

function CardContent8() {
  return (
    <div className="relative shrink-0 w-full" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-start p-[10px] relative w-full">
        <PortfolioDashboardPage24 />
        <PrimitiveDiv2 />
      </div>
    </div>
  );
}

function Card11() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start p-px relative rounded-[12px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <CardContent8 />
    </div>
  );
}

function Icon26() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_12010_1576)" id="Icon">
          <path d={svgPaths.p14d24500} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p240d7000} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p25499600} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_12010_1576">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container60() {
  return (
    <div className="bg-[#00b0aa] relative rounded-[8px] shrink-0 size-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[10px] relative size-full">
        <Icon26 />
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[20px] left-0 not-italic text-[#1f2937] text-[14px] top-0 whitespace-nowrap">Customer Excellence</p>
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Dubai:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#64748b] text-[12px] top-[-1px] whitespace-nowrap">3 Objectives • 12 Projects</p>
    </div>
  );
}

function Container61() {
  return (
    <div className="flex-[1_0_0] h-[36px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Heading5 />
        <Paragraph17 />
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="h-[40px] relative shrink-0 w-[177.313px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container60 />
        <Container61 />
      </div>
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="h-[28px] relative shrink-0 w-[40.609px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-full absolute font-['Dubai:Medium',sans-serif] leading-[28px] left-[41px] not-italic text-[#1f2937] text-[16px] text-right top-0 whitespace-nowrap">68%</p>
      </div>
    </div>
  );
}

function PortfolioDashboardPage25() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full" data-name="PortfolioDashboardPage">
      <Container59 />
      <Paragraph18 />
    </div>
  );
}

function Container62() {
  return <div className="bg-[#008755] h-[8px] shrink-0 w-full" data-name="Container" />;
}

function PrimitiveDiv3() {
  return (
    <div className="bg-[rgba(82,132,180,0.2)] content-stretch flex flex-col h-[8px] items-start overflow-clip pl-[-218.56px] pr-[218.56px] relative rounded-[33554400px] shrink-0 w-full" data-name="Primitive.div">
      <Container62 />
    </div>
  );
}

function CardContent9() {
  return (
    <div className="relative shrink-0 w-full" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-start p-[10px] relative w-full">
        <PortfolioDashboardPage25 />
        <PrimitiveDiv3 />
      </div>
    </div>
  );
}

function Card12() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start p-px relative rounded-[12px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <CardContent9 />
    </div>
  );
}

function Icon27() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_12010_1576)" id="Icon">
          <path d={svgPaths.p14d24500} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p240d7000} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p25499600} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_12010_1576">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container64() {
  return (
    <div className="bg-[#005844] relative rounded-[8px] shrink-0 size-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[10px] relative size-full">
        <Icon27 />
      </div>
    </div>
  );
}

function Heading6() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[20px] left-0 not-italic text-[#1f2937] text-[14px] top-0 whitespace-nowrap">Strategic Partnerships</p>
    </div>
  );
}

function Paragraph19() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Dubai:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#64748b] text-[12px] top-[-1px] whitespace-nowrap">2 Objectives • 5 Projects</p>
    </div>
  );
}

function Container65() {
  return (
    <div className="flex-[1_0_0] h-[36px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Heading6 />
        <Paragraph19 />
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="h-[40px] relative shrink-0 w-[181.594px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container64 />
        <Container65 />
      </div>
    </div>
  );
}

function Paragraph20() {
  return (
    <div className="h-[28px] relative shrink-0 w-[40.609px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-full absolute font-['Dubai:Medium',sans-serif] leading-[28px] left-[41px] not-italic text-[#1f2937] text-[16px] text-right top-0 whitespace-nowrap">90%</p>
      </div>
    </div>
  );
}

function PortfolioDashboardPage26() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full" data-name="PortfolioDashboardPage">
      <Container63 />
      <Paragraph20 />
    </div>
  );
}

function Container66() {
  return <div className="bg-[#008755] h-[8px] shrink-0 w-full" data-name="Container" />;
}

function PrimitiveDiv4() {
  return (
    <div className="bg-[rgba(82,132,180,0.2)] h-[8px] relative rounded-[33554400px] shrink-0 w-full" data-name="Primitive.div">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pl-[-68.3px] pr-[68.3px] relative size-full">
          <Container66 />
        </div>
      </div>
    </div>
  );
}

function CardContent10() {
  return (
    <div className="relative shrink-0 w-full" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-start p-[10px] relative w-full">
        <PortfolioDashboardPage26 />
        <PrimitiveDiv4 />
      </div>
    </div>
  );
}

function Card13() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start p-px relative rounded-[12px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <CardContent10 />
    </div>
  );
}

function Container50() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[5px] h-[343px] items-start left-[24.5px] top-[103px] w-[309px]" data-name="Container">
      <Card10 />
      <Card11 />
      <Card12 />
      <Card13 />
    </div>
  );
}

function CardTitle3() {
  return (
    <div className="absolute h-[24px] left-[24px] top-[24px] w-[434.656px]" data-name="CardTitle">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[24px] left-0 not-italic text-[#1a1a1a] text-[16px] top-[-1px] whitespace-nowrap">Strategic Alignment Map</p>
    </div>
  );
}

function CardDescription3() {
  return (
    <div className="absolute h-[24px] left-[24px] top-[54px] w-[434.656px]" data-name="CardDescription">
      <p className="absolute font-['Dubai:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#64748b] text-[16px] top-[-1px] whitespace-nowrap">{`Strategic Alignment Map `}</p>
    </div>
  );
}

function CardHeader3() {
  return (
    <div className="absolute h-[78px] left-px top-px w-[482.656px]" data-name="CardHeader">
      <CardTitle3 />
      <CardDescription3 />
    </div>
  );
}

function Card9() {
  return (
    <div className="bg-white flex-[1_0_0] h-[460px] min-h-px min-w-px relative rounded-[12px]" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Container50 />
      <CardHeader3 />
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex gap-[12px] h-[460px] items-start relative shrink-0 w-full" data-name="Container">
      <Card6 />
      <Card7 />
      <Card8 />
      <Card9 />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] h-[493px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading2 />
      <Container18 />
    </div>
  );
}

function Heading7() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[28px] left-0 not-italic text-[#1f2937] text-[18px] top-0 whitespace-nowrap">Program Summary</p>
    </div>
  );
}

function TableHead() {
  return (
    <div className="absolute h-[40px] left-0 top-0 w-[385.828px]" data-name="TableHead">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[20px] left-[8px] not-italic text-[#1a1a1a] text-[14px] top-[9.75px] whitespace-nowrap">Program</p>
    </div>
  );
}

function TableHead1() {
  return (
    <div className="absolute h-[40px] left-[385.83px] top-0 w-[132.281px]" data-name="TableHead">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[20px] left-[8px] not-italic text-[#1a1a1a] text-[14px] top-[9.75px] whitespace-nowrap">Projects</p>
    </div>
  );
}

function TableHead2() {
  return (
    <div className="absolute h-[40px] left-[518.11px] top-0 w-[318.641px]" data-name="TableHead">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[20px] left-[8px] not-italic text-[#1a1a1a] text-[14px] top-[9.75px] whitespace-nowrap">Completion</p>
    </div>
  );
}

function TableHead3() {
  return (
    <div className="absolute h-[40px] left-[836.75px] top-0 w-[164.75px]" data-name="TableHead">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[20px] left-[8px] not-italic text-[#1a1a1a] text-[14px] top-[9.75px] whitespace-nowrap">Health</p>
    </div>
  );
}

function TableHead4() {
  return <div className="absolute h-[40px] left-[1001.5px] top-0 w-[52px]" data-name="TableHead" />;
}

function TableRow() {
  return (
    <div className="absolute border-[#e2e8f0] border-b border-solid h-[40px] left-0 top-0 w-[1053.5px]" data-name="TableRow">
      <TableHead />
      <TableHead1 />
      <TableHead2 />
      <TableHead3 />
      <TableHead4 />
    </div>
  );
}

function TableHeader() {
  return (
    <div className="absolute h-[40px] left-0 top-0 w-[1053.5px]" data-name="TableHeader">
      <TableRow />
    </div>
  );
}

function TableCell() {
  return (
    <div className="absolute h-[49px] left-0 top-0 w-[385.828px]" data-name="TableCell">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[20px] left-[8px] not-italic text-[#1a1a1a] text-[14px] top-[14.5px] whitespace-nowrap">Digital Transformation</p>
    </div>
  );
}

function TableCell1() {
  return (
    <div className="absolute h-[49px] left-[385.83px] top-0 w-[132.281px]" data-name="TableCell">
      <p className="absolute font-['Dubai:Regular',sans-serif] leading-[20px] left-[8px] not-italic text-[#1a1a1a] text-[14px] top-[14.5px] whitespace-nowrap">15</p>
    </div>
  );
}

function Text23() {
  return (
    <div className="absolute h-[20px] left-[108px] top-0 w-[28.578px]" data-name="Text">
      <p className="absolute font-['Dubai:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#64748b] text-[14px] top-0 whitespace-nowrap">68%</p>
    </div>
  );
}

function Container69() {
  return <div className="bg-[#008755] h-[8px] shrink-0 w-full" data-name="Container" />;
}

function PrimitiveDiv5() {
  return (
    <div className="absolute bg-[rgba(82,132,180,0.2)] content-stretch flex flex-col h-[8px] items-start left-0 overflow-clip pl-[-32px] pr-[32px] rounded-[33554400px] top-[6px] w-[100px]" data-name="Primitive.div">
      <Container69 />
    </div>
  );
}

function PortfolioDashboardPage28() {
  return (
    <div className="absolute h-[20px] left-[8px] top-[14.5px] w-[302.641px]" data-name="PortfolioDashboardPage">
      <Text23 />
      <PrimitiveDiv5 />
    </div>
  );
}

function TableCell2() {
  return (
    <div className="absolute h-[49px] left-[518.11px] top-0 w-[318.641px]" data-name="TableCell">
      <PortfolioDashboardPage28 />
    </div>
  );
}

function Badge5() {
  return (
    <div className="absolute bg-[rgba(82,132,180,0.13)] border border-[rgba(0,0,0,0)] border-solid h-[22px] left-[8px] overflow-clip rounded-[6px] top-[13.5px] w-[44.578px]" data-name="Badge">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[16px] left-[8px] not-italic text-[#008755] text-[12px] top-px whitespace-nowrap">Good</p>
    </div>
  );
}

function TableCell3() {
  return (
    <div className="absolute h-[49px] left-[836.75px] top-0 w-[164.75px]" data-name="TableCell">
      <Badge5 />
    </div>
  );
}

function Icon28() {
  return (
    <div className="absolute left-[10px] size-[16px] top-[8px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p36e45a00} id="Vector" stroke="var(--stroke-0, #1A1A1A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p150f5b00} id="Vector_2" stroke="var(--stroke-0, #1A1A1A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2d6e5280} id="Vector_3" stroke="var(--stroke-0, #1A1A1A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute h-[32px] left-[8px] rounded-[6px] top-[8.5px] w-[36px]" data-name="Button">
      <Icon28 />
    </div>
  );
}

function TableCell4() {
  return (
    <div className="absolute h-[49px] left-[1001.5px] top-0 w-[52px]" data-name="TableCell">
      <Button3 />
    </div>
  );
}

function TableRow1() {
  return (
    <div className="absolute border-[#e2e8f0] border-b border-solid h-[49px] left-0 top-0 w-[1053.5px]" data-name="TableRow">
      <TableCell />
      <TableCell1 />
      <TableCell2 />
      <TableCell3 />
      <TableCell4 />
    </div>
  );
}

function TableCell5() {
  return (
    <div className="absolute h-[49px] left-0 top-0 w-[385.828px]" data-name="TableCell">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[20px] left-[8px] not-italic text-[#1a1a1a] text-[14px] top-[14.5px] whitespace-nowrap">Customer Experience</p>
    </div>
  );
}

function TableCell6() {
  return (
    <div className="absolute h-[49px] left-[385.83px] top-0 w-[132.281px]" data-name="TableCell">
      <p className="absolute font-['Dubai:Regular',sans-serif] leading-[20px] left-[8px] not-italic text-[#1a1a1a] text-[14px] top-[14.5px] whitespace-nowrap">12</p>
    </div>
  );
}

function Text24() {
  return (
    <div className="absolute h-[20px] left-[108px] top-0 w-[28.578px]" data-name="Text">
      <p className="absolute font-['Dubai:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#64748b] text-[14px] top-0 whitespace-nowrap">82%</p>
    </div>
  );
}

function Container70() {
  return <div className="bg-[#008755] h-[8px] shrink-0 w-full" data-name="Container" />;
}

function PrimitiveDiv6() {
  return (
    <div className="absolute bg-[rgba(82,132,180,0.2)] content-stretch flex flex-col h-[8px] items-start left-0 overflow-clip pl-[-18px] pr-[18px] rounded-[33554400px] top-[6px] w-[100px]" data-name="Primitive.div">
      <Container70 />
    </div>
  );
}

function PortfolioDashboardPage29() {
  return (
    <div className="absolute h-[20px] left-[8px] top-[14.5px] w-[302.641px]" data-name="PortfolioDashboardPage">
      <Text24 />
      <PrimitiveDiv6 />
    </div>
  );
}

function TableCell7() {
  return (
    <div className="absolute h-[49px] left-[518.11px] top-0 w-[318.641px]" data-name="TableCell">
      <PortfolioDashboardPage29 />
    </div>
  );
}

function Badge6() {
  return (
    <div className="absolute bg-[rgba(53,119,67,0.13)] border border-[rgba(0,0,0,0)] border-solid h-[22px] left-[8px] overflow-clip rounded-[6px] top-[13.5px] w-[62.875px]" data-name="Badge">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[16px] left-[8px] not-italic text-[#357743] text-[12px] top-px whitespace-nowrap">Excellent</p>
    </div>
  );
}

function TableCell8() {
  return (
    <div className="absolute h-[49px] left-[836.75px] top-0 w-[164.75px]" data-name="TableCell">
      <Badge6 />
    </div>
  );
}

function Icon29() {
  return (
    <div className="absolute left-[10px] size-[16px] top-[8px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p36e45a00} id="Vector" stroke="var(--stroke-0, #1A1A1A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p150f5b00} id="Vector_2" stroke="var(--stroke-0, #1A1A1A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2d6e5280} id="Vector_3" stroke="var(--stroke-0, #1A1A1A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute h-[32px] left-[8px] rounded-[6px] top-[8.5px] w-[36px]" data-name="Button">
      <Icon29 />
    </div>
  );
}

function TableCell9() {
  return (
    <div className="absolute h-[49px] left-[1001.5px] top-0 w-[52px]" data-name="TableCell">
      <Button4 />
    </div>
  );
}

function TableRow2() {
  return (
    <div className="absolute border-[#e2e8f0] border-b border-solid h-[49px] left-0 top-[49px] w-[1053.5px]" data-name="TableRow">
      <TableCell5 />
      <TableCell6 />
      <TableCell7 />
      <TableCell8 />
      <TableCell9 />
    </div>
  );
}

function TableCell10() {
  return (
    <div className="absolute h-[49px] left-0 top-0 w-[385.828px]" data-name="TableCell">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[20px] left-[8px] not-italic text-[#1a1a1a] text-[14px] top-[14.5px] whitespace-nowrap">Infrastructure Modernization</p>
    </div>
  );
}

function TableCell11() {
  return (
    <div className="absolute h-[49px] left-[385.83px] top-0 w-[132.281px]" data-name="TableCell">
      <p className="absolute font-['Dubai:Regular',sans-serif] leading-[20px] left-[8px] not-italic text-[#1a1a1a] text-[14px] top-[14.5px] whitespace-nowrap">18</p>
    </div>
  );
}

function Text25() {
  return (
    <div className="absolute h-[20px] left-[108px] top-0 w-[28.578px]" data-name="Text">
      <p className="absolute font-['Dubai:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#64748b] text-[14px] top-0 whitespace-nowrap">55%</p>
    </div>
  );
}

function Container71() {
  return <div className="bg-[#008755] h-[8px] shrink-0 w-full" data-name="Container" />;
}

function PrimitiveDiv7() {
  return (
    <div className="absolute bg-[rgba(82,132,180,0.2)] content-stretch flex flex-col h-[8px] items-start left-0 overflow-clip pl-[-45px] pr-[45px] rounded-[33554400px] top-[6px] w-[100px]" data-name="Primitive.div">
      <Container71 />
    </div>
  );
}

function PortfolioDashboardPage30() {
  return (
    <div className="absolute h-[20px] left-[8px] top-[14.5px] w-[302.641px]" data-name="PortfolioDashboardPage">
      <Text25 />
      <PrimitiveDiv7 />
    </div>
  );
}

function TableCell12() {
  return (
    <div className="absolute h-[49px] left-[518.11px] top-0 w-[318.641px]" data-name="TableCell">
      <PortfolioDashboardPage30 />
    </div>
  );
}

function Badge7() {
  return (
    <div className="absolute bg-[rgba(242,162,0,0.13)] border border-[rgba(0,0,0,0)] border-solid h-[22px] left-[8px] overflow-clip rounded-[6px] top-[13.5px] w-[53.578px]" data-name="Badge">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[16px] left-[8px] not-italic text-[#f2a200] text-[12px] top-px whitespace-nowrap">At Risk</p>
    </div>
  );
}

function TableCell13() {
  return (
    <div className="absolute h-[49px] left-[836.75px] top-0 w-[164.75px]" data-name="TableCell">
      <Badge7 />
    </div>
  );
}

function Icon30() {
  return (
    <div className="absolute left-[10px] size-[16px] top-[8px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p36e45a00} id="Vector" stroke="var(--stroke-0, #1A1A1A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p150f5b00} id="Vector_2" stroke="var(--stroke-0, #1A1A1A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2d6e5280} id="Vector_3" stroke="var(--stroke-0, #1A1A1A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute h-[32px] left-[8px] rounded-[6px] top-[8.5px] w-[36px]" data-name="Button">
      <Icon30 />
    </div>
  );
}

function TableCell14() {
  return (
    <div className="absolute h-[49px] left-[1001.5px] top-0 w-[52px]" data-name="TableCell">
      <Button5 />
    </div>
  );
}

function TableRow3() {
  return (
    <div className="absolute border-[#e2e8f0] border-b border-solid h-[49px] left-0 top-[98px] w-[1053.5px]" data-name="TableRow">
      <TableCell10 />
      <TableCell11 />
      <TableCell12 />
      <TableCell13 />
      <TableCell14 />
    </div>
  );
}

function TableCell15() {
  return (
    <div className="absolute h-[49px] left-0 top-0 w-[385.828px]" data-name="TableCell">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[20px] left-[8px] not-italic text-[#1a1a1a] text-[14px] top-[14.5px] whitespace-nowrap">{`Security & Compliance`}</p>
    </div>
  );
}

function TableCell16() {
  return (
    <div className="absolute h-[49px] left-[385.83px] top-0 w-[132.281px]" data-name="TableCell">
      <p className="absolute font-['Dubai:Regular',sans-serif] leading-[20px] left-[8px] not-italic text-[#1a1a1a] text-[14px] top-[14.5px] whitespace-nowrap">8</p>
    </div>
  );
}

function Text26() {
  return (
    <div className="absolute h-[20px] left-[108px] top-0 w-[28.578px]" data-name="Text">
      <p className="absolute font-['Dubai:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#64748b] text-[14px] top-0 whitespace-nowrap">91%</p>
    </div>
  );
}

function Container72() {
  return <div className="bg-[#008755] h-[8px] shrink-0 w-full" data-name="Container" />;
}

function PrimitiveDiv8() {
  return (
    <div className="absolute bg-[rgba(82,132,180,0.2)] content-stretch flex flex-col h-[8px] items-start left-0 overflow-clip pl-[-9px] pr-[9px] rounded-[33554400px] top-[6px] w-[100px]" data-name="Primitive.div">
      <Container72 />
    </div>
  );
}

function PortfolioDashboardPage31() {
  return (
    <div className="absolute h-[20px] left-[8px] top-[14.5px] w-[302.641px]" data-name="PortfolioDashboardPage">
      <Text26 />
      <PrimitiveDiv8 />
    </div>
  );
}

function TableCell17() {
  return (
    <div className="absolute h-[49px] left-[518.11px] top-0 w-[318.641px]" data-name="TableCell">
      <PortfolioDashboardPage31 />
    </div>
  );
}

function Badge8() {
  return (
    <div className="absolute bg-[rgba(53,119,67,0.13)] border border-[rgba(0,0,0,0)] border-solid h-[22px] left-[8px] overflow-clip rounded-[6px] top-[13.5px] w-[62.875px]" data-name="Badge">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[16px] left-[8px] not-italic text-[#357743] text-[12px] top-px whitespace-nowrap">Excellent</p>
    </div>
  );
}

function TableCell18() {
  return (
    <div className="absolute h-[49px] left-[836.75px] top-0 w-[164.75px]" data-name="TableCell">
      <Badge8 />
    </div>
  );
}

function Icon31() {
  return (
    <div className="absolute left-[10px] size-[16px] top-[8px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p36e45a00} id="Vector" stroke="var(--stroke-0, #1A1A1A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p150f5b00} id="Vector_2" stroke="var(--stroke-0, #1A1A1A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2d6e5280} id="Vector_3" stroke="var(--stroke-0, #1A1A1A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute h-[32px] left-[8px] rounded-[6px] top-[8.5px] w-[36px]" data-name="Button">
      <Icon31 />
    </div>
  );
}

function TableCell19() {
  return (
    <div className="absolute h-[49px] left-[1001.5px] top-0 w-[52px]" data-name="TableCell">
      <Button6 />
    </div>
  );
}

function TableRow4() {
  return (
    <div className="absolute border-[#e2e8f0] border-b border-solid h-[49px] left-0 top-[147px] w-[1053.5px]" data-name="TableRow">
      <TableCell15 />
      <TableCell16 />
      <TableCell17 />
      <TableCell18 />
      <TableCell19 />
    </div>
  );
}

function TableCell20() {
  return (
    <div className="absolute h-[48.5px] left-0 top-0 w-[385.828px]" data-name="TableCell">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[20px] left-[8px] not-italic text-[#1a1a1a] text-[14px] top-[14.5px] whitespace-nowrap">Innovation Lab</p>
    </div>
  );
}

function TableCell21() {
  return (
    <div className="absolute h-[48.5px] left-[385.83px] top-0 w-[132.281px]" data-name="TableCell">
      <p className="absolute font-['Dubai:Regular',sans-serif] leading-[20px] left-[8px] not-italic text-[#1a1a1a] text-[14px] top-[14.5px] whitespace-nowrap">4</p>
    </div>
  );
}

function Text27() {
  return (
    <div className="absolute h-[20px] left-[108px] top-0 w-[28.578px]" data-name="Text">
      <p className="absolute font-['Dubai:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#64748b] text-[14px] top-0 whitespace-nowrap">45%</p>
    </div>
  );
}

function Container73() {
  return <div className="bg-[#008755] h-[8px] shrink-0 w-full" data-name="Container" />;
}

function PrimitiveDiv9() {
  return (
    <div className="absolute bg-[rgba(82,132,180,0.2)] content-stretch flex flex-col h-[8px] items-start left-0 overflow-clip pl-[-55px] pr-[55px] rounded-[33554400px] top-[6px] w-[100px]" data-name="Primitive.div">
      <Container73 />
    </div>
  );
}

function PortfolioDashboardPage32() {
  return (
    <div className="absolute h-[20px] left-[8px] top-[14.5px] w-[302.641px]" data-name="PortfolioDashboardPage">
      <Text27 />
      <PrimitiveDiv9 />
    </div>
  );
}

function TableCell22() {
  return (
    <div className="absolute h-[48.5px] left-[518.11px] top-0 w-[318.641px]" data-name="TableCell">
      <PortfolioDashboardPage32 />
    </div>
  );
}

function Badge9() {
  return (
    <div className="absolute bg-[rgba(82,132,180,0.13)] border border-[rgba(0,0,0,0)] border-solid h-[22px] left-[8px] overflow-clip rounded-[6px] top-[13.5px] w-[44.578px]" data-name="Badge">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[16px] left-[8px] not-italic text-[#008755] text-[12px] top-px whitespace-nowrap">Good</p>
    </div>
  );
}

function TableCell23() {
  return (
    <div className="absolute h-[48.5px] left-[836.75px] top-0 w-[164.75px]" data-name="TableCell">
      <Badge9 />
    </div>
  );
}

function Icon32() {
  return (
    <div className="absolute left-[10px] size-[16px] top-[8px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p36e45a00} id="Vector" stroke="var(--stroke-0, #1A1A1A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p150f5b00} id="Vector_2" stroke="var(--stroke-0, #1A1A1A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2d6e5280} id="Vector_3" stroke="var(--stroke-0, #1A1A1A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="absolute h-[32px] left-[8px] rounded-[6px] top-[8.5px] w-[36px]" data-name="Button">
      <Icon32 />
    </div>
  );
}

function TableCell24() {
  return (
    <div className="absolute h-[48.5px] left-[1001.5px] top-0 w-[52px]" data-name="TableCell">
      <Button7 />
    </div>
  );
}

function TableRow5() {
  return (
    <div className="absolute h-[48.5px] left-0 top-[196px] w-[1053.5px]" data-name="TableRow">
      <TableCell20 />
      <TableCell21 />
      <TableCell22 />
      <TableCell23 />
      <TableCell24 />
    </div>
  );
}

function TableBody() {
  return (
    <div className="absolute h-[244.5px] left-0 top-[40px] w-[1053.5px]" data-name="TableBody">
      <TableRow1 />
      <TableRow2 />
      <TableRow3 />
      <TableRow4 />
      <TableRow5 />
    </div>
  );
}

function Table() {
  return (
    <div className="h-[284.5px] overflow-clip relative shrink-0 w-full" data-name="Table">
      <TableHeader />
      <TableBody />
    </div>
  );
}

function PortfolioDashboardPage27() {
  return (
    <div className="absolute content-stretch flex flex-col h-[286.5px] items-start left-[25px] p-px rounded-[6px] top-[95px] w-[1055.5px]" data-name="PortfolioDashboardPage">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Table />
    </div>
  );
}

function CardTitle4() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="CardTitle">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#1a1a1a] text-[16px] top-[-1px] whitespace-nowrap">Active Programs</p>
    </div>
  );
}

function CardDescription4() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="CardDescription">
      <p className="absolute font-['Dubai:Regular',sans-serif] leading-[24px] left-0 not-italic text-[#64748b] text-[16px] top-[-1px] whitespace-nowrap">Overview of all portfolio programs</p>
    </div>
  );
}

function Container74() {
  return (
    <div className="h-[40px] relative shrink-0 w-[221.234px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <CardTitle4 />
        <CardDescription4 />
      </div>
    </div>
  );
}

function Icon33() {
  return (
    <div className="absolute left-[10px] size-[16px] top-[7px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p36bb6c80} id="Vector" stroke="var(--stroke-0, #1A1A1A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button8() {
  return (
    <div className="absolute bg-[#f8f9fb] border border-[#e2e8f0] border-solid h-[32px] left-[208px] rounded-[6px] top-[2px] w-[78.844px]" data-name="Button">
      <Icon33 />
      <p className="-translate-x-1/2 absolute font-['Dubai:Medium',sans-serif] leading-[20px] left-[51.5px] not-italic text-[#1a1a1a] text-[14px] text-center top-[5px] whitespace-nowrap">Filter</p>
    </div>
  );
}

function Input() {
  return (
    <div className="absolute bg-white h-[36px] left-0 rounded-[6px] top-0 w-[200px]" data-name="Input">
      <div className="content-stretch flex items-center overflow-clip pl-[32px] pr-[12px] py-[4px] relative rounded-[inherit] size-full">
        <p className="font-['Dubai:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#64748b] text-[14px] whitespace-nowrap">Search programs...</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Icon34() {
  return (
    <div className="absolute left-[8px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p107a080} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M14 14L11.1333 11.1333" id="Vector_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container76() {
  return (
    <div className="absolute h-[36px] left-0 top-0 w-[200px]" data-name="Container">
      <Input />
      <Icon34 />
    </div>
  );
}

function Container75() {
  return (
    <div className="h-[36px] relative shrink-0 w-[286.844px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Button8 />
        <Container76 />
      </div>
    </div>
  );
}

function PortfolioDashboardPage33() {
  return (
    <div className="col-1 content-stretch flex items-center justify-between justify-self-stretch relative row-1 self-stretch shrink-0" data-name="PortfolioDashboardPage">
      <Container74 />
      <Container75 />
    </div>
  );
}

function CardHeader4() {
  return (
    <div className="absolute gap-x-[6px] gap-y-[6px] grid grid-cols-[repeat(1,minmax(0,1fr))] grid-rows-[__40px_minmax(0,1fr)] h-[70px] left-px pb-[6px] pt-[24px] px-[24px] top-px w-[1103.5px]" data-name="CardHeader">
      <PortfolioDashboardPage33 />
    </div>
  );
}

function Card14() {
  return (
    <div className="bg-white h-[406.5px] relative rounded-[12px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <PortfolioDashboardPage27 />
      <CardHeader4 />
    </div>
  );
}

function Container68() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[6px] h-[440.5px] items-start left-0 top-0 w-[1105.5px]" data-name="Container">
      <Heading7 />
      <Card14 />
    </div>
  );
}

function Heading8() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[28px] left-0 not-italic text-[#1f2937] text-[18px] top-0 whitespace-nowrap">Milestones</p>
    </div>
  );
}

function Icon35() {
  return (
    <div className="absolute left-0 size-[16px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_12010_1560)" id="Icon">
          <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, #D83731)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 4V8L10.6667 9.33333" id="Vector_2" stroke="var(--stroke-0, #D83731)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_12010_1560">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Heading9() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Heading 3">
      <Icon35 />
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[20px] left-[24px] not-italic text-[#1a1a1a] text-[14px] top-0 whitespace-nowrap">Overdue Milestones</p>
    </div>
  );
}

function Paragraph21() {
  return (
    <div className="absolute h-[16px] left-[9px] top-[9px] w-[267.5px]" data-name="Paragraph">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#1f2937] text-[12px] top-[-1px] whitespace-nowrap">Smart Trade 2030</p>
    </div>
  );
}

function Paragraph22() {
  return (
    <div className="absolute h-[16px] left-[9px] top-[29px] w-[267.5px]" data-name="Paragraph">
      <p className="absolute font-['Dubai:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#64748b] text-[12px] top-[-1px] whitespace-nowrap">Phase 2 Kickoff</p>
    </div>
  );
}

function Badge10() {
  return (
    <div className="absolute bg-[#ef4444] border border-[rgba(0,0,0,0)] border-solid h-[20px] left-[9px] overflow-clip rounded-[6px] top-[49px] w-[79.891px]" data-name="Badge">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[13.333px] left-[8px] not-italic text-[10px] text-white top-[1.33px] whitespace-nowrap">5 days overdue</p>
    </div>
  );
}

function Container80() {
  return (
    <div className="bg-[#f8f9fb] h-[78px] relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Paragraph21 />
      <Paragraph22 />
      <Badge10 />
    </div>
  );
}

function Paragraph23() {
  return (
    <div className="absolute h-[16px] left-[9px] top-[9px] w-[267.5px]" data-name="Paragraph">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#1f2937] text-[12px] top-[-1px] whitespace-nowrap">Digital Customs Platform</p>
    </div>
  );
}

function Paragraph24() {
  return (
    <div className="absolute h-[16px] left-[9px] top-[29px] w-[267.5px]" data-name="Paragraph">
      <p className="absolute font-['Dubai:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#64748b] text-[12px] top-[-1px] whitespace-nowrap">UAT Completion</p>
    </div>
  );
}

function Badge11() {
  return (
    <div className="absolute bg-[#ef4444] border border-[rgba(0,0,0,0)] border-solid h-[20px] left-[9px] overflow-clip rounded-[6px] top-[49px] w-[79.891px]" data-name="Badge">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[13.333px] left-[8px] not-italic text-[10px] text-white top-[1.33px] whitespace-nowrap">3 days overdue</p>
    </div>
  );
}

function Container81() {
  return (
    <div className="bg-[#f8f9fb] h-[78px] relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Paragraph23 />
      <Paragraph24 />
      <Badge11 />
    </div>
  );
}

function Paragraph25() {
  return (
    <div className="absolute h-[16px] left-[9px] top-[9px] w-[267.5px]" data-name="Paragraph">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#1f2937] text-[12px] top-[-1px] whitespace-nowrap">AI Risk Assessment</p>
    </div>
  );
}

function Paragraph26() {
  return (
    <div className="absolute h-[16px] left-[9px] top-[29px] w-[267.5px]" data-name="Paragraph">
      <p className="absolute font-['Dubai:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#64748b] text-[12px] top-[-1px] whitespace-nowrap">Data Migration</p>
    </div>
  );
}

function Badge12() {
  return (
    <div className="absolute bg-[#ef4444] border border-[rgba(0,0,0,0)] border-solid h-[20px] left-[9px] overflow-clip rounded-[6px] top-[49px] w-[79.891px]" data-name="Badge">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[13.333px] left-[8px] not-italic text-[10px] text-white top-[1.33px] whitespace-nowrap">2 days overdue</p>
    </div>
  );
}

function Container82() {
  return (
    <div className="bg-[#f8f9fb] h-[78px] relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Paragraph25 />
      <Paragraph26 />
      <Badge12 />
    </div>
  );
}

function Paragraph27() {
  return (
    <div className="absolute h-[16px] left-[9px] top-[9px] w-[267.5px]" data-name="Paragraph">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#1f2937] text-[12px] top-[-1px] whitespace-nowrap">Blockchain Integration</p>
    </div>
  );
}

function Paragraph28() {
  return (
    <div className="absolute h-[16px] left-[9px] top-[29px] w-[267.5px]" data-name="Paragraph">
      <p className="absolute font-['Dubai:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#64748b] text-[12px] top-[-1px] whitespace-nowrap">Security Audit</p>
    </div>
  );
}

function Badge13() {
  return (
    <div className="absolute bg-[#ef4444] border border-[rgba(0,0,0,0)] border-solid h-[20px] left-[9px] overflow-clip rounded-[6px] top-[49px] w-[75.625px]" data-name="Badge">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[13.333px] left-[8px] not-italic text-[10px] text-white top-[1.33px] whitespace-nowrap">1 day overdue</p>
    </div>
  );
}

function Container83() {
  return (
    <div className="bg-[#f8f9fb] h-[78px] relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Paragraph27 />
      <Paragraph28 />
      <Badge13 />
    </div>
  );
}

function Paragraph29() {
  return (
    <div className="absolute h-[16px] left-[9px] top-[9px] w-[267.5px]" data-name="Paragraph">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#1f2937] text-[12px] top-[-1px] whitespace-nowrap">Mobile App Redesign</p>
    </div>
  );
}

function Paragraph30() {
  return (
    <div className="absolute h-[16px] left-[9px] top-[29px] w-[267.5px]" data-name="Paragraph">
      <p className="absolute font-['Dubai:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#64748b] text-[12px] top-[-1px] whitespace-nowrap">Beta Release</p>
    </div>
  );
}

function Badge14() {
  return (
    <div className="absolute bg-[#ef4444] border border-[rgba(0,0,0,0)] border-solid h-[20px] left-[9px] overflow-clip rounded-[6px] top-[49px] w-[75.625px]" data-name="Badge">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[13.333px] left-[8px] not-italic text-[10px] text-white top-[1.33px] whitespace-nowrap">1 day overdue</p>
    </div>
  );
}

function Container84() {
  return (
    <div className="bg-[#f8f9fb] h-[78px] relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Paragraph29 />
      <Paragraph30 />
      <Badge14 />
    </div>
  );
}

function Container79() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[422px] items-start relative shrink-0 w-full" data-name="Container">
      <Container80 />
      <Container81 />
      <Container82 />
      <Container83 />
      <Container84 />
    </div>
  );
}

function Container78() {
  return (
    <div className="bg-white h-[488px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="content-stretch flex flex-col gap-[20px] items-start pb-px pt-[13px] px-[13px] relative size-full">
        <Heading9 />
        <Container79 />
      </div>
    </div>
  );
}

function Icon36() {
  return (
    <div className="absolute left-0 size-[16px] top-[2px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_12010_1556)" id="Icon">
          <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, #008755)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 4V8L10.6667 9.33333" id="Vector_2" stroke="var(--stroke-0, #008755)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_12010_1556">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Heading10() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Heading 3">
      <Icon36 />
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[20px] left-[24px] not-italic text-[#1a1a1a] text-[14px] top-0 whitespace-nowrap">Upcoming Milestones</p>
    </div>
  );
}

function Paragraph31() {
  return (
    <div className="absolute h-[16px] left-[9px] top-[9px] w-[267.5px]" data-name="Paragraph">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#1f2937] text-[12px] top-[-1px] whitespace-nowrap">Smart Trade 2030</p>
    </div>
  );
}

function Paragraph32() {
  return (
    <div className="absolute h-[16px] left-[9px] top-[29px] w-[267.5px]" data-name="Paragraph">
      <p className="absolute font-['Dubai:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#64748b] text-[12px] top-[-1px] whitespace-nowrap">Integration Testing</p>
    </div>
  );
}

function Badge15() {
  return (
    <div className="absolute bg-[rgba(242,162,0,0.13)] border border-[rgba(0,0,0,0)] border-solid h-[20px] left-[9px] overflow-clip rounded-[6px] top-[49px] w-[44.5px]" data-name="Badge">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[13.333px] left-[8px] not-italic text-[#f2a200] text-[10px] top-[1.33px] whitespace-nowrap">3 days</p>
    </div>
  );
}

function Container87() {
  return (
    <div className="bg-[#f8f9fb] h-[78px] relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Paragraph31 />
      <Paragraph32 />
      <Badge15 />
    </div>
  );
}

function Paragraph33() {
  return (
    <div className="absolute h-[16px] left-[9px] top-[9px] w-[267.5px]" data-name="Paragraph">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#1f2937] text-[12px] top-[-1px] whitespace-nowrap">Cloud Migration</p>
    </div>
  );
}

function Paragraph34() {
  return (
    <div className="absolute h-[16px] left-[9px] top-[29px] w-[267.5px]" data-name="Paragraph">
      <p className="absolute font-['Dubai:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#64748b] text-[12px] top-[-1px] whitespace-nowrap">Infrastructure Setup</p>
    </div>
  );
}

function Badge16() {
  return (
    <div className="absolute bg-[rgba(242,162,0,0.13)] border border-[rgba(0,0,0,0)] border-solid h-[20px] left-[9px] overflow-clip rounded-[6px] top-[49px] w-[44.5px]" data-name="Badge">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[13.333px] left-[8px] not-italic text-[#f2a200] text-[10px] top-[1.33px] whitespace-nowrap">5 days</p>
    </div>
  );
}

function Container88() {
  return (
    <div className="bg-[#f8f9fb] h-[78px] relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Paragraph33 />
      <Paragraph34 />
      <Badge16 />
    </div>
  );
}

function Paragraph35() {
  return (
    <div className="absolute h-[16px] left-[9px] top-[9px] w-[267.5px]" data-name="Paragraph">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#1f2937] text-[12px] top-[-1px] whitespace-nowrap">Digital Customs Platform</p>
    </div>
  );
}

function Paragraph36() {
  return (
    <div className="absolute h-[16px] left-[9px] top-[29px] w-[267.5px]" data-name="Paragraph">
      <p className="absolute font-['Dubai:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#64748b] text-[12px] top-[-1px] whitespace-nowrap">Production Deployment</p>
    </div>
  );
}

function Badge17() {
  return (
    <div className="absolute bg-[rgba(82,132,180,0.13)] border border-[rgba(0,0,0,0)] border-solid h-[20px] left-[9px] overflow-clip rounded-[6px] top-[49px] w-[46.719px]" data-name="Badge">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[13.333px] left-[8px] not-italic text-[#008755] text-[10px] top-[1.33px] whitespace-nowrap">1 week</p>
    </div>
  );
}

function Container89() {
  return (
    <div className="bg-[#f8f9fb] h-[78px] relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Paragraph35 />
      <Paragraph36 />
      <Badge17 />
    </div>
  );
}

function Paragraph37() {
  return (
    <div className="absolute h-[16px] left-[9px] top-[9px] w-[267.5px]" data-name="Paragraph">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#1f2937] text-[12px] top-[-1px] whitespace-nowrap">Blockchain Integration</p>
    </div>
  );
}

function Paragraph38() {
  return (
    <div className="absolute h-[16px] left-[9px] top-[29px] w-[267.5px]" data-name="Paragraph">
      <p className="absolute font-['Dubai:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#64748b] text-[12px] top-[-1px] whitespace-nowrap">Stakeholder Review</p>
    </div>
  );
}

function Badge18() {
  return (
    <div className="absolute bg-[rgba(82,132,180,0.13)] border border-[rgba(0,0,0,0)] border-solid h-[20px] left-[9px] overflow-clip rounded-[6px] top-[49px] w-[46.719px]" data-name="Badge">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[13.333px] left-[8px] not-italic text-[#008755] text-[10px] top-[1.33px] whitespace-nowrap">1 week</p>
    </div>
  );
}

function Container90() {
  return (
    <div className="bg-[#f8f9fb] h-[78px] relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Paragraph37 />
      <Paragraph38 />
      <Badge18 />
    </div>
  );
}

function Paragraph39() {
  return (
    <div className="absolute h-[16px] left-[9px] top-[9px] w-[267.5px]" data-name="Paragraph">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#1f2937] text-[12px] top-[-1px] whitespace-nowrap">Customer Portal v2</p>
    </div>
  );
}

function Paragraph40() {
  return (
    <div className="absolute h-[16px] left-[9px] top-[29px] w-[267.5px]" data-name="Paragraph">
      <p className="absolute font-['Dubai:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#64748b] text-[12px] top-[-1px] whitespace-nowrap">Design Approval</p>
    </div>
  );
}

function Badge19() {
  return (
    <div className="absolute bg-[rgba(242,162,0,0.13)] border border-[rgba(0,0,0,0)] border-solid h-[20px] left-[9px] overflow-clip rounded-[6px] top-[49px] w-[49.906px]" data-name="Badge">
      <p className="absolute font-['Dubai:Medium',sans-serif] leading-[13.333px] left-[8px] not-italic text-[#f2a200] text-[10px] top-[1.33px] whitespace-nowrap">10 days</p>
    </div>
  );
}

function Container91() {
  return (
    <div className="bg-[#f8f9fb] h-[78px] relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Paragraph39 />
      <Paragraph40 />
      <Badge19 />
    </div>
  );
}

function Container86() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[422px] items-start relative shrink-0 w-full" data-name="Container">
      <Container87 />
      <Container88 />
      <Container89 />
      <Container90 />
      <Container91 />
    </div>
  );
}

function Container85() {
  return (
    <div className="bg-white h-[488px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="content-stretch flex flex-col gap-[20px] items-start pb-px pt-[13px] px-[13px] relative size-full">
        <Heading10 />
        <Container86 />
      </div>
    </div>
  );
}

function PortfolioDashboardPage34() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[988px] items-start relative shrink-0 w-full" data-name="PortfolioDashboardPage">
      <Container78 />
      <Container85 />
    </div>
  );
}

function CardContent11() {
  return (
    <div className="flex-[418_0_0] min-h-px min-w-px relative w-[358.5px]" data-name="CardContent">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pl-[16px] pr-[31px] pt-[16px] relative size-full">
          <PortfolioDashboardPage34 />
        </div>
      </div>
    </div>
  );
}

function Card15() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[420px] items-start p-px relative rounded-[12px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <CardContent11 />
    </div>
  );
}

function Container77() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[6px] h-[454px] items-start left-[1117.5px] top-0 w-[360.5px]" data-name="Container">
      <Heading8 />
      <Card15 />
    </div>
  );
}

function Container67() {
  return (
    <div className="h-[454px] relative shrink-0 w-full" data-name="Container">
      <Container68 />
      <Container77 />
    </div>
  );
}

function Container() {
  return (
    <div className="h-[1506px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[12px] items-start pt-[12px] px-[12px] relative size-full">
        <Card />
        <Container5 />
        <Container17 />
        <Container67 />
      </div>
    </div>
  );
}

function PortfolioDashboardPage() {
  return (
    <div className="h-[1579px] relative shrink-0 w-full" data-name="PortfolioDashboardPage">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pr-[15px] relative size-full">
          <Container />
        </div>
      </div>
    </div>
  );
}

export default function MainContent() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="Main Content">
      <PortfolioDashboardPage />
    </div>
  );
}