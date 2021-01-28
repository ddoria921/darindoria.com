import { useEffect } from "react";
import Header from "../components/Header";

export default function videos() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://fast.wistia.com/assets/external/channel.js";
    const channlDiv = document.getElementsByClassName("wistia_channel")[0];
    channlDiv.parentNode.insertBefore(script, channlDiv);
  }, []);

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 right-0 z-10">
        <Header forceLightMode={true} />
      </div>
      <MyWistiaChannel />
    </div>
  );
}
``;

function MyWistiaChannel() {
  return (
    <div id="wistia_channel_component">
      <link
        rel="stylesheet"
        href="https://fast.wistia.com/embed/channel/project/n0qow1iuad/font.css"
      />
      <div
        className="wistia_channel wistia_async_n0qow1iuad mode=inline bg-gray-900"
        style={{ position: "relative", width: "100%", minHeight: "100vh" }}
      ></div>
    </div>
  );
}
