function Group() {
  return (
    <div className="absolute contents left-[6.89px] top-0">
      <div className="absolute left-[6.89px] size-[33.226px] top-0">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
          <circle cx="16.6128" cy="16.6128" fill="var(--fill-0, white)" id="Ellipse 82" r="16.6128" />
        </svg>
      </div>
      <div className="absolute left-[6.89px] size-[33.226px] top-0">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
          <circle cx="16.6128" cy="16.6128" fill="var(--fill-0, #005844)" id="Ellipse 84" r="16.1128" stroke="var(--stroke-0, white)" />
        </svg>
      </div>
      <Keyboard />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[6.89px] top-0">
      <Group />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-[6.89px] top-0">
      <Group1 />
    </div>
  );
}

export default function Group3() {
  return (
    <div className="relative size-full">
      <p className="absolute font-['Dubai:Light',sans-serif] leading-[1.6] left-0 not-italic text-[14px] text-nowrap text-white top-[35.48px] whitespace-pre">Strategy</p>
      <Group2 />
    </div>
  );
}