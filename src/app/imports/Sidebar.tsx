import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import svgPaths from "./svg-qhxg1yw4lu";

function InfoSquare() {
  return (
    <div className="w-4 h-4" data-name="Info Square">
      <svg className="block w-full h-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 17 18">
        <g id="Info Square">
          <path clipRule="evenodd" d={svgPaths.p1c725f80} fill="var(--fill-0, #4485B7)" fillRule="evenodd" id="Info Square_2" />
        </g>
      </svg>
    </div>
  );
}

function Profile() {
  return (
    <div className="w-4 h-4" data-name="Profile">
      <svg className="block w-full h-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 14 18">
        <g id="Profile">
          <path d={svgPaths.p175ca280} fill="var(--fill-0, #4485B7)" id="Profile_2" />
        </g>
      </svg>
    </div>
  );
}

function Wallet() {
  return (
    <div className="w-4 h-4" data-name="Wallet">
      <svg className="block w-full h-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 17 16">
        <g id="Wallet">
          <path clipRule="evenodd" d={svgPaths.pe13f000} fill="var(--fill-0, #4485B7)" fillRule="evenodd" id="Wallet_2" />
        </g>
      </svg>
    </div>
  );
}

function Setting() {
  return (
    <div className="w-4 h-4" data-name="Setting">
      <svg className="block w-full h-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 18">
        <g id="Setting">
          <path d={svgPaths.p1cb56171} fill="var(--fill-0, #4485B7)" id="Setting_2" />
        </g>
      </svg>
    </div>
  );
}

function Chat() {
  return (
    <div className="w-4 h-4" data-name="Chat">
      <svg className="block w-full h-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 17 18">
        <g id="Chat">
          <path clipRule="evenodd" d={svgPaths.p2907d600} fill="var(--fill-0, #4485B7)" fillRule="evenodd" id="Chat_2" />
        </g>
      </svg>
    </div>
  );
}

function Document() {
  return (
    <div className="w-4 h-4" data-name="Document">
      <svg className="block w-full h-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 15 18">
        <g id="Document">
          <path clipRule="evenodd" d={svgPaths.p1047b2c0} fill="var(--fill-0, #4485B7)" fillRule="evenodd" id="Document_2" />
        </g>
      </svg>
    </div>
  );
}

function Buy() {
  return (
    <div className="w-4 h-4" data-name="Buy">
      <svg className="block w-full h-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 17 18">
        <g id="Buy">
          <path d={svgPaths.p211ef700} fill="var(--fill-0, #4485B7)" id="Buy_2" />
        </g>
      </svg>
    </div>
  );
}

function Chart() {
  return (
    <div className="w-4 h-4" data-name="Chart">
      <svg className="block w-full h-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 17 18">
        <g id="Chart">
          <path clipRule="evenodd" d={svgPaths.p26822c00} fill="var(--fill-0, #4485B7)" fillRule="evenodd" id="Chart_2" />
        </g>
      </svg>
    </div>
  );
}

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  const menuItems = [
    { icon: <Chart />, label: "Dashboard", title: "Dashboard" },
    { icon: <Profile />, label: "Accounts", title: "Accounts" },
    { icon: <Setting />, label: "Settings", title: "Settings" },
    { icon: <InfoSquare />, label: "Help", title: "Help" }
  ];

  return (
    null
  );
}
