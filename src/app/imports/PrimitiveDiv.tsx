import svgPaths from "./svg-2x45kt31ck";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { useState } from "react";

function PrimitiveH2() {
  return (
    <div className="h-[24px] relative shrink-0 w-[272px]" data-name="Primitive.h2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[272px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#1a1a1a] text-[16px] text-nowrap top-[-0.6px] whitespace-pre">KPI Settings</p>
      </div>
    </div>
  );
}

function PrimitiveP() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[272px]" data-name="Primitive.p">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full relative w-[272px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-slate-500 top-[0.6px] w-[542.76px]">Create a new Key Performance Indicator to track service performance metrics.</p>
      </div>
    </div>
  );
}

function SheetHeader() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[6px] h-[102px] items-start left-[10.46px] pl-[16px] pr-0 py-[16px] top-[16px] w-[497px]" data-name="SheetHeader">
      <PrimitiveH2 />
      <PrimitiveP />
    </div>
  );
}

function PrimitiveLabel() {
  return (
    <div className="content-stretch flex gap-[8px] h-[14px] items-center relative shrink-0 w-full" data-name="Primitive.label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[14px] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] text-nowrap whitespace-pre">Corporate Level KPI *</p>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white h-[36px] relative rounded-[6px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex h-[36px] items-center px-[12px] py-[4px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] text-nowrap whitespace-pre">Budget Performance</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[58px] items-start left-[26.46px] top-0 w-[526px]" data-name="Container">
      <PrimitiveLabel />
      <Input />
    </div>
  );
}

function PrimitiveLabel1() {
  return (
    <div className="content-stretch flex gap-[8px] h-[28px] items-center relative shrink-0 w-full" data-name="Primitive.label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[14px] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] text-nowrap whitespace-pre">Department Level KPI</p>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-white h-[36px] relative rounded-[6px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex h-[36px] items-center px-[12px] py-[4px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] text-nowrap whitespace-pre">Efficiency and effectiveness of financial resource management</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[72px] items-start left-[25.46px] top-[151px] w-[254px]" data-name="Container">
      <PrimitiveLabel1 />
      <Input1 />
    </div>
  );
}

function PrimitiveLabel2() {
  return (
    <div className="content-stretch flex gap-[8px] h-[14px] items-center relative shrink-0 w-full" data-name="Primitive.label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[14px] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] text-nowrap whitespace-pre">Formula</p>
    </div>
  );
}

function Input2() {
  return (
    <div className="bg-white h-[36px] relative rounded-[6px] shrink-0 w-[527px]" data-name="Input">
      <div className="box-border content-stretch flex h-[36px] items-center overflow-clip px-[12px] py-[4px] relative rounded-[inherit] w-[527px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] text-nowrap whitespace-pre">(Actual Expenditure / Approved Budget) * 100</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[58px] items-start left-[23.46px] top-[536.2px] w-[304px]" data-name="Container">
      <PrimitiveLabel2 />
      <Input2 />
    </div>
  );
}

function PrimitiveLabel3() {
  return (
    <div className="content-stretch flex gap-[8px] h-[14px] items-center relative shrink-0 w-full" data-name="Primitive.label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[14px] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] text-nowrap whitespace-pre">Polarity</p>
    </div>
  );
}

function PrimitiveSpan() {
  return (
    <div className="h-[20px] relative shrink-0 w-[41.063px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[20px] items-center overflow-clip relative rounded-[inherit] w-[41.063px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] text-nowrap whitespace-pre">Increasing</p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon" opacity="0.5">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function PrimitiveButton() {
  return (
    <div className="bg-white h-[36px] relative rounded-[6px] shrink-0 w-full" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[36px] items-center justify-between px-[12.8px] py-[0.8px] relative w-full">
          <PrimitiveSpan />
          <Icon />
        </div>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[58px] items-start left-0 top-0 w-[90.662px]" data-name="Container">
      <PrimitiveLabel3 />
      <PrimitiveButton />
    </div>
  );
}

function PrimitiveLabel4() {
  return (
    <div className="content-stretch flex gap-[8px] h-[14px] items-center relative shrink-0 w-full" data-name="Primitive.label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[14px] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] text-nowrap whitespace-pre">Frequency</p>
    </div>
  );
}

function PrimitiveSpan1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[41.063px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[20px] items-center overflow-clip relative rounded-[inherit] w-[41.063px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] text-nowrap whitespace-pre">Quarterly</p>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon" opacity="0.5">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function PrimitiveButton1() {
  return (
    <div className="bg-white h-[36px] relative rounded-[6px] shrink-0 w-full" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[36px] items-center justify-between px-[12.8px] py-[0.8px] relative w-full">
          <PrimitiveSpan1 />
          <Icon1 />
        </div>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[58px] items-start left-[106.66px] top-0 w-[90.662px]" data-name="Container">
      <PrimitiveLabel4 />
      <PrimitiveButton1 />
    </div>
  );
}

function PrimitiveLabel5() {
  return (
    <div className="content-stretch flex gap-[8px] h-[14px] items-center relative shrink-0 w-full" data-name="Primitive.label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[14px] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] text-nowrap whitespace-pre">Unit</p>
    </div>
  );
}

function Input3() {
  return (
    <div className="bg-white h-[36px] relative rounded-[6px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex h-[36px] items-center px-[12px] py-[4px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] text-nowrap whitespace-pre">%</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[58px] items-start left-[213.32px] top-0 w-[90.675px]" data-name="Container">
      <PrimitiveLabel5 />
      <Input3 />
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute h-[58px] left-[26.46px] top-[610.4px] w-[304px]" data-name="Container">
      <Container3 />
      <Container4 />
      <Container5 />
    </div>
  );
}

function PrimitiveLabel6() {
  return (
    <div className="content-stretch flex gap-[8px] h-[24px] items-center relative shrink-0 w-full" data-name="Primitive.label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[#1a1a1a] text-[16px] text-nowrap whitespace-pre">Baseline</p>
    </div>
  );
}

function PrimitiveLabel7() {
  return (
    <div className="absolute h-[15.988px] left-0 top-0 w-[53.75px]" data-name="Primitive.label">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[12px] text-nowrap text-slate-500 top-[-0.01px] whitespace-pre">Year</p>
    </div>
  );
}

function Group40536() {
  return (
    <div className="absolute h-[7.774px] left-[49.14px] top-[13.75px] w-[5.669px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 8">
        <g id="Group 40536">
          <path d={svgPaths.p272af200} fill="var(--fill-0, #D9D9D9)" id="Rectangle 4531" />
          <path d={svgPaths.p18925c00} fill="var(--fill-0, #D9D9D9)" id="Rectangle 4532" />
        </g>
      </svg>
    </div>
  );
}

function Input4() {
  return (
    <div className="absolute bg-white h-[36px] left-0 rounded-[6px] top-[23.99px] w-[62px]" data-name="Input">
      <div className="h-[36px] overflow-clip relative rounded-[inherit] w-[62px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[9.46px] not-italic text-[14px] text-nowrap text-slate-500 top-[9.5px] whitespace-pre">Year</p>
        <Group40536 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute h-[59.987px] left-0 top-0 w-[53.75px]" data-name="Container">
      <PrimitiveLabel7 />
      <Input4 />
    </div>
  );
}

function PrimitiveLabel8() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[15.988px] items-center left-0 top-0 w-[53.75px]" data-name="Primitive.label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-nowrap text-slate-500 whitespace-pre">Value</p>
    </div>
  );
}

function Group40537() {
  return (
    <div className="absolute h-[7.774px] left-[53.93px] top-[14.11px] w-[5.669px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 8">
        <g id="Group 40536">
          <path d={svgPaths.p272af200} fill="var(--fill-0, #D9D9D9)" id="Rectangle 4531" />
          <path d={svgPaths.p18925c00} fill="var(--fill-0, #D9D9D9)" id="Rectangle 4532" />
        </g>
      </svg>
    </div>
  );
}

function Input5() {
  return (
    <div className="absolute bg-white h-[36px] left-0 rounded-[6px] top-[24px] w-[67px]" data-name="Input">
      <div className="h-[36px] overflow-clip relative rounded-[inherit] w-[67px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[12px] not-italic text-[14px] text-nowrap text-slate-500 top-[9.5px] whitespace-pre">Value</p>
        <Group40537 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute h-[60px] left-[69.54px] top-0 w-[65px]" data-name="Container">
      <PrimitiveLabel8 />
      <Input5 />
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[59.987px] relative shrink-0 w-full" data-name="Container">
      <Container7 />
      <Container8 />
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[96px] items-start left-[27.46px] top-[684.49px] w-[263px]" data-name="Container">
      <PrimitiveLabel6 />
      <Container9 />
    </div>
  );
}

function PrimitiveLabel9() {
  return (
    <div className="content-stretch flex gap-[8px] h-[28px] items-center relative shrink-0 w-full" data-name="Primitive.label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[14px] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] text-nowrap whitespace-pre">KPI Owner (Department)</p>
    </div>
  );
}

function Input6() {
  return (
    <div className="bg-white h-[36px] relative rounded-[6px] shrink-0 w-[253px]" data-name="Input">
      <div className="box-border content-stretch flex h-[36px] items-center overflow-clip px-[12px] py-[4px] relative rounded-[inherit] w-[253px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] text-nowrap whitespace-pre">Finance</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[72px] items-start left-[26.46px] top-[67px] w-[144px]" data-name="Container">
      <PrimitiveLabel9 />
      <Input6 />
    </div>
  );
}

function PrimitiveLabel10() {
  return (
    <div className="content-stretch flex gap-[8px] h-[14px] items-center relative shrink-0 w-full" data-name="Primitive.label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[14px] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] text-nowrap whitespace-pre">KPI Code</p>
    </div>
  );
}

function Input7() {
  return (
    <div className="bg-white h-[36px] relative rounded-[6px] shrink-0 w-[134px]" data-name="Input">
      <div className="box-border content-stretch flex h-[36px] items-center overflow-clip px-[12px] py-[4px] relative rounded-[inherit] w-[134px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[14px] text-nowrap text-slate-500 whitespace-pre">Enter KPI code</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[72px] items-start left-[29.46px] top-[249px] w-[134px]" data-name="Container">
      <PrimitiveLabel10 />
      <Input7 />
    </div>
  );
}

function PrimitiveLabel11() {
  return (
    <div className="content-stretch flex gap-[8px] h-[14px] items-center relative shrink-0 w-full" data-name="Primitive.label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[14px] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] text-nowrap whitespace-pre">KPI Description</p>
    </div>
  );
}

function Textarea() {
  return (
    <div className="bg-white h-[90px] relative rounded-[6px] shrink-0 w-full" data-name="Textarea">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex h-[90px] items-start px-[12.8px] py-[8.8px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] text-nowrap whitespace-pre">Measures the extent to which Dubai Customs utilizes its allocated budget within a specific period. This KPI reflects the efficiency and effectiveness of financial resource management, ensuring that allocated funds are spent appropriately to support operational and strategic objectives. Monitoring budget utilization helps identify underspending or overspending and supports better financial planning and accountability.</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[112px] items-start left-[25.46px] top-[408px] w-[521px]" data-name="Container">
      <PrimitiveLabel11 />
      <Textarea />
    </div>
  );
}

function PrimitiveLabel12() {
  return (
    <div className="content-stretch flex gap-[8px] h-[28px] items-center relative shrink-0 w-full" data-name="Primitive.label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[14px] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] text-nowrap whitespace-pre">KPI Sources</p>
    </div>
  );
}

function Input8() {
  return (
    <div className="bg-white h-[36px] relative rounded-[6px] shrink-0 w-[521px]" data-name="Input">
      <div className="box-border content-stretch flex h-[36px] items-center overflow-clip px-[12px] py-[4px] relative rounded-[inherit] w-[521px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] text-nowrap whitespace-pre">{`The Executive Council & Local Government`}</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[72px] items-start left-[25.62px] top-[319.8px] w-[129px]" data-name="Container">
      <PrimitiveLabel12 />
      <Input8 />
    </div>
  );
}

function PrimitiveLabel13() {
  return (
    <div className="content-stretch flex gap-[8px] h-[28px] items-center relative shrink-0 w-full" data-name="Primitive.label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[14px] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] text-nowrap whitespace-pre">Cascading Type</p>
    </div>
  );
}

function PrimitiveSpan2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[82px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[20px] items-center overflow-clip relative rounded-[inherit] w-[82px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] text-nowrap whitespace-pre">As Is</p>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon" opacity="0.5">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function PrimitiveButton2() {
  return (
    <div className="bg-white h-[36px] relative rounded-[6px] shrink-0 w-full" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[36px] items-center justify-between px-[12.8px] py-[0.8px] relative w-full">
          <PrimitiveSpan2 />
          <Icon2 />
        </div>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[72px] items-start left-[175.46px] top-[235px] w-[128px]" data-name="Container">
      <PrimitiveLabel13 />
      <PrimitiveButton2 />
    </div>
  );
}

function PrimitiveLabel14() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[24px] items-center left-0 top-[19.99px] w-[304px]" data-name="Primitive.label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[#1a1a1a] text-[16px] text-nowrap whitespace-pre">Targets</p>
    </div>
  );
}

function PrimitiveLabel15() {
  return (
    <div className="absolute h-[31.975px] left-[-0.02px] top-[-4.59px] w-[48px]" data-name="Primitive.label">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[12px] text-nowrap text-slate-500 top-[7.99px] whitespace-pre">Year</p>
    </div>
  );
}

function Group40538() {
  return (
    <div className="absolute h-[7.774px] left-[53.65px] top-[15.73px] w-[5.669px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 8">
        <g id="Group 40536">
          <path d={svgPaths.p272af200} fill="var(--fill-0, #D9D9D9)" id="Rectangle 4531" />
          <path d={svgPaths.p18925c00} fill="var(--fill-0, #D9D9D9)" id="Rectangle 4532" />
        </g>
      </svg>
    </div>
  );
}

function Input9() {
  return (
    <div className="absolute bg-white h-[36px] left-[-0.02px] rounded-[6px] top-[29.38px] w-[68px]" data-name="Input">
      <div className="h-[36px] overflow-clip relative rounded-[inherit] w-[68px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[12px] not-italic text-[14px] text-nowrap text-slate-500 top-[9.5px] whitespace-pre">Value</p>
        <Group40538 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute h-[65px] left-[0.02px] top-[10.6px] w-[68px]" data-name="Container">
      <PrimitiveLabel15 />
      <Input9 />
    </div>
  );
}

function PrimitiveLabel16() {
  return (
    <div className="absolute h-[31.975px] left-[0.46px] top-[-13.6px] w-[48px]" data-name="Primitive.label">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-0 not-italic text-[12px] text-nowrap text-slate-500 top-[13.98px] whitespace-pre">Value</p>
    </div>
  );
}

function Group40539() {
  return (
    <div className="absolute h-[7.774px] left-[55.84px] top-[14.11px] w-[5.669px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 8">
        <g id="Group 40536">
          <path d={svgPaths.p272af200} fill="var(--fill-0, #D9D9D9)" id="Rectangle 4531" />
          <path d={svgPaths.p18925c00} fill="var(--fill-0, #D9D9D9)" id="Rectangle 4532" />
        </g>
      </svg>
    </div>
  );
}

function Input10() {
  return (
    <div className="absolute bg-white h-[36px] left-[0.46px] rounded-[6px] top-[26.38px] w-[73px]" data-name="Input">
      <div className="h-[36px] overflow-clip relative rounded-[inherit] w-[73px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[12px] not-italic text-[14px] text-nowrap text-slate-500 top-[9.5px] whitespace-pre">Value</p>
        <Group40539 />
      </div>
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute h-[62px] left-[81.02px] top-[13.6px] w-[73px]" data-name="Container">
      <PrimitiveLabel16 />
      <Input10 />
    </div>
  );
}

function Container18() {
  return <div className="absolute h-[52.8px] left-[68px] top-[75.97px] w-[304px]" data-name="Container" />;
}

function Container19() {
  return (
    <div className="absolute h-[75.975px] left-0 top-[36px] w-[304px]" data-name="Container">
      <Container16 />
      <Container17 />
      <Container18 />
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute h-[111.975px] left-[198.98px] top-[668.4px] w-[304px]" data-name="Container">
      <PrimitiveLabel14 />
      <Container19 />
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-[#f8f9fb] box-border content-stretch flex gap-[8px] h-[36px] items-center justify-center left-[255.47px] px-[16.8px] py-[8.8px] rounded-[6px] top-[806.77px] w-[146px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[0.8px] border-slate-200 border-solid inset-0 pointer-events-none rounded-[6px]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] text-nowrap whitespace-pre">Cancel</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-[#008755] box-border content-stretch flex gap-[8px] h-[36px] items-center justify-center left-[413.47px] px-[16px] py-[8px] rounded-[6px] top-[806.77px] w-[146px]" data-name="Button">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre">Update KPI</p>
    </div>
  );
}

function ServicePerformanceDashboard() {
  return (
    <div className="absolute h-[871px] left-0 top-[102px] w-[589px]" data-name="ServicePerformanceDashboard">
      {/* Fields removed - ready to add new fields based on selected tab */}
    </div>
  );
}

function PrimitiveLabel17() {
  return (
    <div className="content-stretch flex gap-[8px] h-[28px] items-center relative shrink-0 w-full" data-name="Primitive.label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[14px] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] text-nowrap whitespace-pre" dir="auto">
        Division Level KPI
      </p>
    </div>
  );
}

function Input11() {
  return (
    <div className="bg-white h-[36px] relative rounded-[6px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex h-[36px] items-center px-[12px] py-[4px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] text-nowrap whitespace-pre">Efficiency and effectiveness of financial resource management</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[72px] items-start left-[298.46px] top-[253px] w-[254px]" data-name="Container">
      <PrimitiveLabel17 />
      <Input11 />
    </div>
  );
}

function PrimitiveSpan3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[82px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[20px] items-center overflow-clip relative rounded-[inherit] w-[82px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] text-nowrap whitespace-pre">As Is</p>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon" opacity="0.5">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function PrimitiveButton3() {
  return (
    <div className="absolute bg-white box-border content-stretch flex h-[36px] items-center justify-between left-[322.46px] px-[12.8px] py-[0.8px] rounded-[6px] top-[373px] w-[224px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <PrimitiveSpan3 />
      <Icon3 />
    </div>
  );
}

function PrimitiveLabel18() {
  return (
    <div className="content-stretch flex gap-[8px] h-[28px] items-center relative shrink-0 w-full" data-name="Primitive.label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[14px] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] text-nowrap whitespace-pre">KPI Owner (Division) *</p>
    </div>
  );
}

function Input12() {
  return (
    <div className="bg-white h-[36px] relative rounded-[6px] shrink-0 w-[253px]" data-name="Input">
      <div className="box-border content-stretch flex h-[36px] items-center overflow-clip px-[12px] py-[4px] relative rounded-[inherit] w-[253px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] text-nowrap whitespace-pre">{`Finance Affairs & Admin`}</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Container22() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-name="Container">
      <PrimitiveLabel18 />
      <Input12 />
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute gap-[16px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[72px] left-[298.46px] top-[169px] w-[223px]" data-name="Container">
      <Container22 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="absolute left-0 size-[16px] top-0" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M12 4L4 12" id="Vector" stroke="var(--stroke-0, #1A1A1A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M4 4L12 12" id="Vector_2" stroke="var(--stroke-0, #1A1A1A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function SheetContent() {
  return (
    <div className="absolute left-0 overflow-clip size-px top-[15px]" data-name="SheetContent">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#1a1a1a] text-[16px] text-nowrap top-[-0.6px] whitespace-pre">Close</p>
    </div>
  );
}

function PrimitiveButton4() {
  return (
    <div className="absolute left-[540.46px] opacity-70 rounded-[2px] size-[16px] top-[16px]" data-name="Primitive.button">
      <Icon4 />
      <SheetContent />
    </div>
  );
}

export default function PrimitiveDiv() {
  const [activeTab, setActiveTab] = useState("information");
  const [targetRows, setTargetRows] = useState([
    { id: 1, labelYear: "", targetedValue: "", createInfo: "", dueDate: "" }
  ]);

  const addTargetRow = () => {
    const newRow = {
      id: Date.now(),
      labelYear: "",
      targetedValue: "",
      createInfo: "",
      dueDate: ""
    };
    setTargetRows([...targetRows, newRow]);
  };

  const deleteTargetRow = (id: number) => {
    setTargetRows(targetRows.filter(row => row.id !== id));
  };

  const updateTargetRow = (id: number, field: string, value: string) => {
    setTargetRows(targetRows.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  const [globalIndexRows, setGlobalIndexRows] = useState([
    { id: 1, indexName: "", description: "" }
  ]);

  const addGlobalIndexRow = () => {
    const newRow = {
      id: Date.now(),
      indexName: "",
      description: ""
    };
    setGlobalIndexRows([...globalIndexRows, newRow]);
  };

  const deleteGlobalIndexRow = (id: number) => {
    setGlobalIndexRows(globalIndexRows.filter(row => row.id !== id));
  };

  const updateGlobalIndexRow = (id: number, field: string, value: string) => {
    setGlobalIndexRows(globalIndexRows.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  return (
    <div className="bg-[#f8f9fb] relative size-full" data-name="Primitive.div">
      <div className="relative size-full bg-transparent">
        <SheetHeader />
        <div className="absolute left-[26.46px] top-[130px] right-[26.46px] z-20">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <style dangerouslySetInnerHTML={{__html: `
              .tabs-scroll-container::-webkit-scrollbar {
                height: 4px;
              }
              .tabs-scroll-container::-webkit-scrollbar-track {
                background: transparent;
              }
              .tabs-scroll-container::-webkit-scrollbar-thumb {
                background-color: #cbd5e1;
                border-radius: 4px;
              }
              .tabs-scroll-container::-webkit-scrollbar-thumb:hover {
                background-color: #94a3b8;
              }
            `}} />
            <div
              className="tabs-scroll-container overflow-x-auto overflow-y-hidden pb-2 relative z-10"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#cbd5e1 transparent'
              }}
            >
              <TabsList className="inline-flex w-max h-9 p-0.5 gap-0.5 bg-slate-100/50 rounded-md min-w-0">
                <TabsTrigger value="information" className="px-3 py-1.5 text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm cursor-pointer">Information</TabsTrigger>
                <TabsTrigger value="hierarchy" className="px-3 py-1.5 text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm cursor-pointer">Hierarchy</TabsTrigger>
                <TabsTrigger value="target" className="px-3 py-1.5 text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm cursor-pointer">Target</TabsTrigger>
                <TabsTrigger value="organization" className="px-3 py-1.5 text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm whitespace-nowrap cursor-pointer">Org. Structure</TabsTrigger>
                <TabsTrigger value="globalindex" className="px-3 py-1.5 text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm whitespace-nowrap cursor-pointer">Global Index</TabsTrigger>
                <TabsTrigger value="dimensions" className="px-3 py-1.5 text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm cursor-pointer">Dimensions</TabsTrigger>
                <TabsTrigger value="benchmarking" className="px-3 py-1.5 text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm cursor-pointer">Benchmarking</TabsTrigger>
                <TabsTrigger value="segmentation" className="px-3 py-1.5 text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm cursor-pointer">Segmentation</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="information" className="mt-6 relative z-10">
              <div className="grid grid-cols-2 gap-x-6 gap-y-4 max-h-[600px] overflow-y-auto pr-2">
                {/* Title */}
                <div className="flex flex-col gap-2">
                  <label className="font-['Inter:Medium',sans-serif] font-medium leading-[14px] text-[#1a1a1a] text-[14px]">
                    Title
                  </label>
                  <div className="bg-white h-[36px] rounded-[6px] relative">
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <div className="box-border flex h-[36px] items-center px-[12px] py-[4px] w-full">
                        <input 
                          type="text" 
                          placeholder="Enter title"
                          className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1a1a1a] text-[14px] w-full bg-transparent border-none outline-none placeholder:text-slate-400"
                        />
                      </div>
                    </div>
                    <div aria-hidden="true" className="absolute border-[0.8px] border-slate-200 border-solid inset-0 pointer-events-none rounded-[6px]" />
                  </div>
                </div>

                {/* Title Ar */}
                <div className="flex flex-col gap-2">
                  <label className="font-['Inter:Medium',sans-serif] font-medium leading-[14px] text-[#1a1a1a] text-[14px]">
                    Title Ar
                  </label>
                  <div className="bg-white h-[36px] rounded-[6px] relative">
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <div className="box-border flex h-[36px] items-center px-[12px] py-[4px] w-full">
                        <input 
                          type="text" 
                          placeholder="أدخل العنوان"
                          className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1a1a1a] text-[14px] w-full bg-transparent border-none outline-none placeholder:text-slate-400"
                        />
                      </div>
                    </div>
                    <div aria-hidden="true" className="absolute border-[0.8px] border-slate-200 border-solid inset-0 pointer-events-none rounded-[6px]" />
                  </div>
                </div>

                {/* Code */}
                <div className="flex flex-col gap-2">
                  <label className="font-['Inter:Medium',sans-serif] font-medium leading-[14px] text-[#1a1a1a] text-[14px]">
                    Code
                  </label>
                  <div className="bg-white h-[36px] rounded-[6px] relative">
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <div className="box-border flex h-[36px] items-center px-[12px] py-[4px] w-full">
                        <input 
                          type="text" 
                          placeholder="Enter code"
                          className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1a1a1a] text-[14px] w-full bg-transparent border-none outline-none placeholder:text-slate-400"
                        />
                      </div>
                    </div>
                    <div aria-hidden="true" className="absolute border-[0.8px] border-slate-200 border-solid inset-0 pointer-events-none rounded-[6px]" />
                  </div>
                </div>

                {/* Trend */}
                <div className="flex flex-col gap-2">
                  <label className="font-['Inter:Medium',sans-serif] font-medium leading-[14px] text-[#1a1a1a] text-[14px]">
                    Trend
                  </label>
                  <div className="bg-white h-[36px] rounded-[6px] relative cursor-pointer">
                    <div aria-hidden="true" className="absolute border-[0.8px] border-slate-200 border-solid inset-0 pointer-events-none rounded-[6px]" />
                    <div className="flex flex-row items-center size-full">
                      <div className="box-border flex h-[36px] items-center justify-between px-[12.8px] py-[0.8px] w-full">
                        <span className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-slate-400 text-[14px]">
                          Select trend
                        </span>
                        <svg className="size-[16px] shrink-0" fill="none" viewBox="0 0 16 16">
                          <path d="M4 6L8 10L12 6" stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" opacity="0.5" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Base Line */}
                <div className="flex flex-col gap-2">
                  <label className="font-['Inter:Medium',sans-serif] font-medium leading-[14px] text-[#1a1a1a] text-[14px]">
                    Base Line
                  </label>
                  <div className="bg-white h-[36px] rounded-[6px] relative">
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <div className="box-border flex h-[36px] items-center px-[12px] py-[4px] w-full">
                        <input 
                          type="text" 
                          placeholder="Enter base line"
                          className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1a1a1a] text-[14px] w-full bg-transparent border-none outline-none placeholder:text-slate-400"
                        />
                      </div>
                    </div>
                    <div aria-hidden="true" className="absolute border-[0.8px] border-slate-200 border-solid inset-0 pointer-events-none rounded-[6px]" />
                  </div>
                </div>

                {/* Annual Value Method */}
                <div className="flex flex-col gap-2">
                  <label className="font-['Inter:Medium',sans-serif] font-medium leading-[14px] text-[#1a1a1a] text-[14px]">
                    Annual Value Method
                  </label>
                  <div className="bg-white h-[36px] rounded-[6px] relative cursor-pointer">
                    <div aria-hidden="true" className="absolute border-[0.8px] border-slate-200 border-solid inset-0 pointer-events-none rounded-[6px]" />
                    <div className="flex flex-row items-center size-full">
                      <div className="box-border flex h-[36px] items-center justify-between px-[12.8px] py-[0.8px] w-full">
                        <span className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-slate-400 text-[14px]">
                          Select method
                        </span>
                        <svg className="size-[16px] shrink-0" fill="none" viewBox="0 0 16 16">
                          <path d="M4 6L8 10L12 6" stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" opacity="0.5" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Benchmark Description */}
                <div className="flex flex-col gap-2">
                  <label className="font-['Inter:Medium',sans-serif] font-medium leading-[14px] text-[#1a1a1a] text-[14px]">
                    Benchmark Description
                  </label>
                  <div className="bg-white h-[36px] rounded-[6px] relative">
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <div className="box-border flex h-[36px] items-center px-[12px] py-[4px] w-full">
                        <input 
                          type="text" 
                          placeholder="Enter benchmark description"
                          className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1a1a1a] text-[14px] w-full bg-transparent border-none outline-none placeholder:text-slate-400"
                        />
                      </div>
                    </div>
                    <div aria-hidden="true" className="absolute border-[0.8px] border-slate-200 border-solid inset-0 pointer-events-none rounded-[6px]" />
                  </div>
                </div>

                {/* Benchmark Attachment */}
                <div className="flex flex-col gap-2">
                  <label className="font-['Inter:Medium',sans-serif] font-medium leading-[14px] text-[#1a1a1a] text-[14px]">
                    Benchmark Attachment
                  </label>
                  <div className="bg-white h-[36px] rounded-[6px] relative cursor-pointer">
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <div className="box-border flex h-[36px] items-center px-[12px] py-[4px] w-full">
                        <input 
                          type="file" 
                          className="hidden"
                          id="benchmark-file"
                        />
                        <label 
                          htmlFor="benchmark-file"
                          className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-slate-400 text-[14px] cursor-pointer flex items-center gap-2 w-full"
                        >
                          <svg className="size-4 shrink-0" fill="none" viewBox="0 0 16 16">
                            <path d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10" stroke="#64748B" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M11.3333 5.33333L8 2L4.66667 5.33333" stroke="#64748B" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8 2V10" stroke="#64748B" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Choose file
                        </label>
                      </div>
                    </div>
                    <div aria-hidden="true" className="absolute border-[0.8px] border-slate-200 border-solid inset-0 pointer-events-none rounded-[6px]" />
                  </div>
                </div>

                {/* KPI Graph Type */}
                <div className="flex flex-col gap-2">
                  <label className="font-['Inter:Medium',sans-serif] font-medium leading-[14px] text-[#1a1a1a] text-[14px]">
                    KPI Graph Type
                  </label>
                  <div className="bg-white h-[36px] rounded-[6px] relative cursor-pointer">
                    <div aria-hidden="true" className="absolute border-[0.8px] border-slate-200 border-solid inset-0 pointer-events-none rounded-[6px]" />
                    <div className="flex flex-row items-center size-full">
                      <div className="box-border flex h-[36px] items-center justify-between px-[12.8px] py-[0.8px] w-full">
                        <span className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-slate-400 text-[14px]">
                          Select graph type
                        </span>
                        <svg className="size-[16px] shrink-0" fill="none" viewBox="0 0 16 16">
                          <path d="M4 6L8 10L12 6" stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" opacity="0.5" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* KPI Group */}
                <div className="flex flex-col gap-2">
                  <label className="font-['Inter:Medium',sans-serif] font-medium leading-[14px] text-[#1a1a1a] text-[14px]">
                    KPI Group
                  </label>
                  <div className="bg-white h-[36px] rounded-[6px] relative cursor-pointer">
                    <div aria-hidden="true" className="absolute border-[0.8px] border-slate-200 border-solid inset-0 pointer-events-none rounded-[6px]" />
                    <div className="flex flex-row items-center size-full">
                      <div className="box-border flex h-[36px] items-center justify-between px-[12.8px] py-[0.8px] w-full">
                        <span className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-slate-400 text-[14px]">
                          Select KPI group
                        </span>
                        <svg className="size-[16px] shrink-0" fill="none" viewBox="0 0 16 16">
                          <path d="M4 6L8 10L12 6" stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" opacity="0.5" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Weight */}
                <div className="flex flex-col gap-2">
                  <label className="font-['Inter:Medium',sans-serif] font-medium leading-[14px] text-[#1a1a1a] text-[14px]">
                    Weight
                  </label>
                  <div className="bg-white h-[36px] rounded-[6px] relative">
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <div className="box-border flex h-[36px] items-center px-[12px] py-[4px] w-full">
                        <input 
                          type="text" 
                          placeholder="Enter weight"
                          className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1a1a1a] text-[14px] w-full bg-transparent border-none outline-none placeholder:text-slate-400"
                        />
                      </div>
                    </div>
                    <div aria-hidden="true" className="absolute border-[0.8px] border-slate-200 border-solid inset-0 pointer-events-none rounded-[6px]" />
                  </div>
                </div>

                {/* Calculation Formula */}
                <div className="flex flex-col gap-2">
                  <label className="font-['Inter:Medium',sans-serif] font-medium leading-[14px] text-[#1a1a1a] text-[14px]">
                    Calculation Formula
                  </label>
                  <div className="bg-white h-[36px] rounded-[6px] relative cursor-pointer">
                    <div aria-hidden="true" className="absolute border-[0.8px] border-slate-200 border-solid inset-0 pointer-events-none rounded-[6px]" />
                    <div className="flex flex-row items-center size-full">
                      <div className="box-border flex h-[36px] items-center justify-between px-[12.8px] py-[0.8px] w-full">
                        <span className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-slate-400 text-[14px]">
                          Select formula
                        </span>
                        <svg className="size-[16px] shrink-0" fill="none" viewBox="0 0 16 16">
                          <path d="M4 6L8 10L12 6" stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" opacity="0.5" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Calculation Description - Full Width */}
                <div className="flex flex-col gap-2 col-span-2">
                  <label className="font-['Inter:Medium',sans-serif] font-medium leading-[14px] text-[#1a1a1a] text-[14px]">
                    Calculation Description
                  </label>
                  <div className="bg-white h-[36px] rounded-[6px] relative">
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <div className="box-border flex h-[36px] items-center px-[12px] py-[4px] w-full">
                        <input 
                          type="text" 
                          placeholder="Enter calculation description"
                          className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1a1a1a] text-[14px] w-full bg-transparent border-none outline-none placeholder:text-slate-400"
                        />
                      </div>
                    </div>
                    <div aria-hidden="true" className="absolute border-[0.8px] border-slate-200 border-solid inset-0 pointer-events-none rounded-[6px]" />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="hierarchy" className="mt-6 relative z-10">
              <div className="flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-2">
                {/* Parent Dropdown with Has Children Checkbox */}
                <div className="flex items-end gap-4">
                  {/* Parent Dropdown */}
                  <div className="flex flex-col gap-2 flex-1">
                    <label className="font-['Inter:Medium',sans-serif] font-medium leading-[14px] text-[#1a1a1a] text-[14px]">
                      Parent
                    </label>
                    <div className="bg-white h-[36px] rounded-[6px] relative cursor-pointer">
                      <div aria-hidden="true" className="absolute border-[0.8px] border-slate-200 border-solid inset-0 pointer-events-none rounded-[6px]" />
                      <div className="flex flex-row items-center size-full">
                        <div className="box-border flex h-[36px] items-center justify-between px-[12.8px] py-[0.8px] w-full">
                          <span className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-slate-400 text-[14px]">
                            Select parent
                          </span>
                          <svg className="size-[16px] shrink-0" fill="none" viewBox="0 0 16 16">
                            <path d="M4 6L8 10L12 6" stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" opacity="0.5" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Has Children Checkbox */}
                  <div className="flex items-center gap-2 mb-2">
                    <input 
                      type="checkbox" 
                      id="has-children"
                      className="w-4 h-4 rounded border-slate-300 text-[#008755] focus:ring-[#008755] focus:ring-2 cursor-pointer"
                    />
                    <label 
                      htmlFor="has-children"
                      className="font-['Inter:Medium',sans-serif] font-medium leading-[14px] text-[#1a1a1a] text-[14px] cursor-pointer"
                    >
                      Has children
                    </label>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="target" className="mt-6 relative z-10">
              <div className="flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-2">
                {/* Add New Button */}
                <div className="flex justify-end">
                  <button
                    onClick={addTargetRow}
                    className="flex items-center gap-2 px-4 py-2 bg-[#008755] text-white rounded-md hover:bg-[#4273a3] transition-colors cursor-pointer"
                  >
                    <svg className="size-4" fill="none" viewBox="0 0 16 16">
                      <path d="M8 3.33334V12.6667" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M3.33337 8H12.6667" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Add New
                  </button>
                </div>

                {/* Table Header */}
                <div className="grid grid-cols-[1fr_1fr_1fr_1fr_40px] gap-4 pb-2 border-b border-slate-200">
                  <div className="font-['Inter:Medium',sans-serif] font-medium leading-[14px] text-[#1a1a1a] text-[14px]">
                    Label Year
                  </div>
                  <div className="font-['Inter:Medium',sans-serif] font-medium leading-[14px] text-[#1a1a1a] text-[14px]">
                    Targeted Value
                  </div>
                  <div className="font-['Inter:Medium',sans-serif] font-medium leading-[14px] text-[#1a1a1a] text-[14px]">
                    Create Info
                  </div>
                  <div className="font-['Inter:Medium',sans-serif] font-medium leading-[14px] text-[#1a1a1a] text-[14px]">
                    Due Date
                  </div>
                  <div></div>
                </div>

                {/* Table Rows */}
                {targetRows.map((row) => (
                  <div key={row.id} className="grid grid-cols-[1fr_1fr_1fr_1fr_40px] gap-4 items-center">
                    {/* Label Year */}
                    <div className="bg-white h-[36px] rounded-[6px] relative">
                      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                        <div className="box-border flex h-[36px] items-center px-[12px] py-[4px] w-full">
                          <input 
                            type="text" 
                            placeholder="Enter year"
                            value={row.labelYear}
                            onChange={(e) => updateTargetRow(row.id, 'labelYear', e.target.value)}
                            className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1a1a1a] text-[14px] w-full bg-transparent border-none outline-none placeholder:text-slate-400"
                          />
                        </div>
                      </div>
                      <div aria-hidden="true" className="absolute border-[0.8px] border-slate-200 border-solid inset-0 pointer-events-none rounded-[6px]" />
                    </div>

                    {/* Targeted Value */}
                    <div className="bg-white h-[36px] rounded-[6px] relative">
                      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                        <div className="box-border flex h-[36px] items-center px-[12px] py-[4px] w-full">
                          <input 
                            type="text" 
                            placeholder="Enter value"
                            value={row.targetedValue}
                            onChange={(e) => updateTargetRow(row.id, 'targetedValue', e.target.value)}
                            className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1a1a1a] text-[14px] w-full bg-transparent border-none outline-none placeholder:text-slate-400"
                          />
                        </div>
                      </div>
                      <div aria-hidden="true" className="absolute border-[0.8px] border-slate-200 border-solid inset-0 pointer-events-none rounded-[6px]" />
                    </div>

                    {/* Create Info */}
                    <div className="bg-white h-[36px] rounded-[6px] relative">
                      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                        <div className="box-border flex h-[36px] items-center px-[12px] py-[4px] w-full">
                          <input 
                            type="text" 
                            placeholder="Enter info"
                            value={row.createInfo}
                            onChange={(e) => updateTargetRow(row.id, 'createInfo', e.target.value)}
                            className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1a1a1a] text-[14px] w-full bg-transparent border-none outline-none placeholder:text-slate-400"
                          />
                        </div>
                      </div>
                      <div aria-hidden="true" className="absolute border-[0.8px] border-slate-200 border-solid inset-0 pointer-events-none rounded-[6px]" />
                    </div>

                    {/* Due Date */}
                    <div className="bg-white h-[36px] rounded-[6px] relative">
                      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                        <div className="box-border flex h-[36px] items-center px-[12px] py-[4px] w-full">
                          <input 
                            type="date" 
                            value={row.dueDate}
                            onChange={(e) => updateTargetRow(row.id, 'dueDate', e.target.value)}
                            className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[#1a1a1a] text-[14px] w-full bg-transparent border-none outline-none placeholder:text-slate-400 cursor-pointer"
                          />
                        </div>
                      </div>
                      <div aria-hidden="true" className="absolute border-[0.8px] border-slate-200 border-solid inset-0 pointer-events-none rounded-[6px]" />
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => deleteTargetRow(row.id)}
                      className="flex items-center justify-center w-9 h-9 rounded-md hover:bg-red-50 transition-colors cursor-pointer group"
                      title="Delete row"
                    >
                      <svg className="size-4 text-slate-400 group-hover:text-red-600 transition-colors" fill="none" viewBox="0 0 16 16">
                        <path d="M2 4H14" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12.6667 4V13.3333C12.6667 14 12 14.6667 11.3333 14.6667H4.66667C4 14.6667 3.33333 14 3.33333 13.3333V4" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M5.33337 4V2.66667C5.33337 2 6.00004 1.33333 6.66671 1.33333H9.33337C10 1.33333 10.6667 2 10.6667 2.66667V4" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="organization" className="mt-6 relative z-10">
              <div className="flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-2">
                {/* Organization Unit Dropdown */}
                <div className="flex flex-col gap-2">
                  <label className="font-['Inter:Medium',sans-serif] font-medium leading-[14px] text-[#1a1a1a] text-[14px]">
                    Organization Unit
                  </label>
                  <div className="bg-white h-[36px] rounded-[6px] relative cursor-pointer">
                    <div aria-hidden="true" className="absolute border-[0.8px] border-slate-200 border-solid inset-0 pointer-events-none rounded-[6px]" />
                    <div className="flex flex-row items-center size-full">
                      <div className="box-border flex h-[36px] items-center justify-between px-[12.8px] py-[0.8px] w-full">
                        <span className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-slate-400 text-[14px]">
                          Select organization unit
                        </span>
                        <svg className="size-[16px] shrink-0" fill="none" viewBox="0 0 16 16">
                          <path d="M4 6L8 10L12 6" stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" opacity="0.5" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Assigned To Dropdown */}
                <div className="flex flex-col gap-2">
                  <label className="font-['Inter:Medium',sans-serif] font-medium leading-[14px] text-[#1a1a1a] text-[14px]">
                    Assigned To
                  </label>
                  <div className="bg-white h-[36px] rounded-[6px] relative cursor-pointer">
                    <div aria-hidden="true" className="absolute border-[0.8px] border-slate-200 border-solid inset-0 pointer-events-none rounded-[6px]" />
                    <div className="flex flex-row items-center size-full">
                      <div className="box-border flex h-[36px] items-center justify-between px-[12.8px] py-[0.8px] w-full">
                        <span className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-slate-400 text-[14px]">
                          Select assignee
                        </span>
                        <svg className="size-[16px] shrink-0" fill="none" viewBox="0 0 16 16">
                          <path d="M4 6L8 10L12 6" stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" opacity="0.5" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Add Contributors Button */}
                <div className="flex justify-start">
                  <button
                    className="flex items-center gap-2 px-4 py-2 bg-[#008755] text-white rounded-md hover:bg-[#4273a3] transition-colors cursor-pointer"
                  >
                    <svg className="size-4" fill="none" viewBox="0 0 16 16">
                      <path d="M10.6667 14V12.6667C10.6667 11.9594 10.3857 11.2811 9.88562 10.781C9.38552 10.281 8.70724 10 8 10H3.33333C2.62609 10 1.94781 10.281 1.44772 10.781C0.947619 11.2811 0.666666 11.9594 0.666666 12.6667V14" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M5.66667 7.33333C7.13943 7.33333 8.33333 6.13943 8.33333 4.66667C8.33333 3.19391 7.13943 2 5.66667 2C4.19391 2 3 3.19391 3 4.66667C3 6.13943 4.19391 7.33333 5.66667 7.33333Z" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M13.3333 4.66667V8.66667" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15.3333 6.66667H11.3333" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Add Contributors
                  </button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="globalindex" className="mt-6 relative z-10">
              <div className="flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-2">
                {/* Add New Button */}
                <div className="flex justify-end">
                  <button
                    onClick={addGlobalIndexRow}
                    className="flex items-center gap-2 px-4 py-2 bg-[#008755] text-white rounded-md hover:bg-[#4273a3] transition-colors cursor-pointer"
                  >
                    <svg className="size-4" fill="none" viewBox="0 0 16 16">
                      <path d="M8 3.33334V12.6667" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M3.33337 8H12.6667" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Add New
                  </button>
                </div>

                {/* List Items */}
                <div className="flex flex-col gap-3">
                  {globalIndexRows.map((row) => (
                    <div key={row.id} className="flex items-start gap-3">
                      {/* Index Name and Description Container */}
                      <div className="flex-1 flex flex-col gap-2">
                        {/* Index Name */}
                        <div className="bg-white h-[36px] rounded-[6px] relative">
                          <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                            <div className="box-border flex h-[36px] items-center px-[12px] py-[4px] w-full">
                              <input 
                                type="text" 
                                placeholder="Enter global index name"
                                value={row.indexName}
                                onChange={(e) => updateGlobalIndexRow(row.id, 'indexName', e.target.value)}
                                className="leading-[20px] text-[#1a1a1a] text-[14px] w-full bg-transparent border-none outline-none placeholder:text-slate-400"
                              />
                            </div>
                          </div>
                          <div aria-hidden="true" className="absolute border-[0.8px] border-slate-200 border-solid inset-0 pointer-events-none rounded-[6px]" />
                        </div>

                        {/* Description */}
                        <div className="bg-white min-h-[72px] rounded-[6px] relative">
                          <div className="flex flex-row items-start overflow-clip rounded-[inherit] size-full">
                            <div className="box-border flex items-start px-[12px] py-[8px] w-full">
                              <textarea 
                                placeholder="Enter description"
                                value={row.description}
                                onChange={(e) => updateGlobalIndexRow(row.id, 'description', e.target.value)}
                                rows={2}
                                className="leading-[20px] text-[#1a1a1a] text-[14px] w-full bg-transparent border-none outline-none placeholder:text-slate-400 resize-none"
                              />
                            </div>
                          </div>
                          <div aria-hidden="true" className="absolute border-[0.8px] border-slate-200 border-solid inset-0 pointer-events-none rounded-[6px]" />
                        </div>
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={() => deleteGlobalIndexRow(row.id)}
                        className="flex items-center justify-center w-9 h-9 rounded-md hover:bg-red-50 transition-colors cursor-pointer group mt-0.5"
                        title="Delete item"
                      >
                        <svg className="size-4 text-slate-400 group-hover:text-red-600 transition-colors" fill="none" viewBox="0 0 16 16">
                          <path d="M2 4H14" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12.6667 4V13.3333C12.6667 14 12 14.6667 11.3333 14.6667H4.66667C4 14.6667 3.33333 14 3.33333 13.3333V4" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M5.33337 4V2.66667C5.33337 2 6.00004 1.33333 6.66671 1.33333H9.33337C10 1.33333 10.6667 2 10.6667 2.66667V4" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="dimensions" className="mt-6 relative z-10">
              <div className="text-sm text-slate-600">Dimensions tab content</div>
            </TabsContent>
            
            <TabsContent value="benchmarking" className="mt-6 relative z-10">
              <div className="text-sm text-slate-600">Benchmarking tab content</div>
            </TabsContent>
            
            <TabsContent value="segmentation" className="mt-6 relative z-10">
              <div className="text-sm text-slate-600">Segmentation tab content</div>
            </TabsContent>
          </Tabs>
        </div>
        <ServicePerformanceDashboard />
        
        {/* Action Buttons at Bottom */}
        <div className="absolute bottom-[24px] right-[26.46px] flex gap-3 z-30">
          <button className="bg-white box-border flex gap-[8px] h-[36px] items-center justify-center px-[16.8px] py-[8.8px] rounded-[6px] border-[0.8px] border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-[#1a1a1a] text-[14px] whitespace-nowrap">
              Delete Changes
            </p>
          </button>
          <button className="bg-[#008755] box-border flex gap-[8px] h-[36px] items-center justify-center px-[16px] py-[8px] rounded-[6px] cursor-pointer hover:bg-[#4a7199] transition-colors">
            <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] text-white text-[14px] whitespace-nowrap">
              Save
            </p>
          </button>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[0px_0px_0px_0.8px] border-slate-200 border-solid inset-0 pointer-events-none shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
    </div>
  );
}